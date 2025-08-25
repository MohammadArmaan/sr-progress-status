import React from "react";
import { useProgress } from "@/contexts/ProgressContext";
import { CheckCircle, Circle, Clock } from "lucide-react";

const ProgressTracker: React.FC = () => {
  const { currentProgress, currentMilestone, milestones } = useProgress();

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Progress Display */}
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-3xl font-bold text-foreground mb-4">Project Progress</h2>
        <div className="relative">
          <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            {currentProgress}%
          </div>
          <p className="text-lg text-muted-foreground">Complete</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-12 animate-slide-up">
        <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${currentProgress}%`, boxShadow: "0 0 20px hsl(270 91% 35% / 0.5)" }}
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Current Milestone */}
      <div className="bg-card rounded-xl p-6 mb-8 shadow-elegant animate-slide-up">
        <div className="flex items-center space-x-3 mb-3">
          <Clock className="text-accent" size={24} />
          <h3 className="text-xl font-semibold text-foreground">Current Phase</h3>
        </div>
        <h4 className="text-2xl font-bold text-primary mb-2">{currentMilestone.name}</h4>
        <p className="text-muted-foreground">{currentMilestone.description}</p>
      </div>

      {/* Milestone Timeline */}
      <div className="space-y-4 animate-slide-up">
        <h3 className="text-xl font-semibold text-foreground mb-6">Project Timeline</h3>
        {milestones.map((milestone) => {
          const isCompleted = currentProgress >= milestone.percentage;
          const isCurrent = currentMilestone.id === milestone.id;

          return (
            <div
              key={milestone.id}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                isCurrent
                  ? "bg-primary/10 border border-primary/20"
                  : isCompleted
                  ? "bg-accent/10 border border-accent/20"
                  : "bg-muted/50"
              }`}
            >
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle className="text-accent" size={24} />
                ) : (
                  <Circle className="text-muted-foreground" size={24} />
                )}
              </div>
              <div className="flex-1">
                <h4
                  className={`font-semibold ${
                    isCurrent ? "text-primary" : isCompleted ? "text-accent-foreground" : "text-muted-foreground"
                  }`}
                >
                  {milestone.name}
                </h4>
                <p className="text-sm text-muted-foreground">{milestone.description}</p>
              </div>
              <div
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  isCompleted ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {milestone.percentage}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
