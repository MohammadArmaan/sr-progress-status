import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  updateProgress: (progress: number) => void;
}

const milestones: Milestone[] = [
  {
    id: 'planning',
    name: 'Project Planning',
    description: 'Defining objectives, scope, and strategy for project execution',
    percentage: 0
  },
  {
    id: 'preparation',
    name: 'Preparation',
    description: 'Organizing resources, infrastructure, and necessary tools',
    percentage: 10
  },
  {
    id: 'designing',
    name: 'Designing',
    description: 'Creating and finalizing design layouts for application portals',
    percentage: 20
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Implementing core features and functionalities of web portals',
    percentage: 85
  },
  {
    id: 'testing',
    name: 'Testing',
    description: 'Conducting quality assurance and performance validation',
    percentage: 90
  },
  {
    id: 'delivery',
    name: 'Final Delivery',
    description: 'Deploying and handing over production-ready applications',
    percentage: 100
  }
];


const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [currentProgress, setCurrentProgress] = useState(35);

  const getCurrentMilestone = (progress: number): Milestone => {
    // Find the current milestone based on progress
    for (let i = milestones.length - 1; i >= 0; i--) {
      if (progress >= milestones[i].percentage) {
        return milestones[i];
      }
    }
    return milestones[0];
  };

  const updateProgress = (progress: number) => {
    setCurrentProgress(Math.max(0, Math.min(100, progress)));
  };

  const currentMilestone = getCurrentMilestone(currentProgress);

  const value = {
    currentProgress,
    currentMilestone,
    milestones,
    updateProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};