
import React from 'react';

interface StreakTrackerProps {
  trackerName: string;
  currentStreak: number;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ trackerName, currentStreak }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm font-medium">
        {trackerName} Streak:
      </div>
      <div className="text-lg font-bold">
        {currentStreak} 🔥
      </div>
    </div>
  );
};

export default StreakTracker;
