// ProgressContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase"; // ✅ your Supabase client

// ---------------- Types ----------------
export interface Milestone {
  id: string;
  name: string;
  description: string;
  percentage: number;
}

interface ProgressContextType {
  currentProgress: number;
  currentMilestone: Milestone;
  milestones: Milestone[];
  updateProgress: (progress: number) => Promise<void>;
}

// ✅ replace with the actual UUID from your DB row
const PROGRESS_ROW_ID = "a45e94bf-2558-485f-91da-80376e4087f6";

// ---------------- Static milestones ----------------
const milestones: Milestone[] = [
  {
    id: "planning",
    name: "Project Planning",
    description:
      "Defining objectives, scope, and strategy for project execution",
    percentage: 0,
  },
  {
    id: "preparation",
    name: "Preparation",
    description: "Organizing resources, infrastructure, and necessary tools",
    percentage: 10,
  },
  {
    id: "designing",
    name: "Designing",
    description: "Creating and finalizing design layouts for application portals",
    percentage: 20,
  },
  {
    id: "development",
    name: "Development",
    description:
      "Implementing core features and functionalities of web portals",
    percentage: 85,
  },
  {
    id: "testing",
    name: "Testing",
    description: "Conducting quality assurance and performance validation",
    percentage: 90,
  },
  {
    id: "delivery",
    name: "Final Delivery",
    description: "Deploying and handing over production-ready applications",
    percentage: 100,
  },
];

// ---------------- Context ----------------
const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};

// ---------------- Provider ----------------
interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({
  children,
}) => {
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  // ✅ Fetch current progress from Supabase
  useEffect(() => {
    const fetchProgress = async () => {
      const { data, error } = await supabase
        .from("progress")
        .select("current_progress")
        .eq("id", PROGRESS_ROW_ID)
        .single();

      if (error) {
        console.error("Error fetching progress:", error);
      } else if (data) {
        setCurrentProgress(data.current_progress);
      }
    };

    fetchProgress();

    // ✅ Realtime updates
    const channel = supabase
      .channel("progress-updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "progress",
          filter: `id=eq.${PROGRESS_ROW_ID}`, // only listen for this row
        },
        (payload) => {
          const next = (payload.new as { current_progress: number })
            ?.current_progress;
          if (typeof next === "number") {
            setCurrentProgress(next);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✅ Find current milestone
  const getCurrentMilestone = (progress: number): Milestone => {
    for (let i = milestones.length - 1; i >= 0; i--) {
      if (progress >= milestones[i].percentage) {
        return milestones[i];
      }
    }
    return milestones[0];
  };

  // ✅ Update progress in Supabase
  const updateProgress = async (progress: number): Promise<void> => {
    const clamped = Math.max(0, Math.min(100, progress));
    setCurrentProgress(clamped); // optimistic UI

    const { error } = await supabase
      .from("progress")
      .update({ current_progress: clamped })
      .eq("id", PROGRESS_ROW_ID);

    if (error) {
      console.error("Error updating progress:", error);
    }
  };

  const value: ProgressContextType = useMemo(
    () => ({
      currentProgress,
      currentMilestone: getCurrentMilestone(currentProgress),
      milestones,
      updateProgress,
    }),
    [currentProgress]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
