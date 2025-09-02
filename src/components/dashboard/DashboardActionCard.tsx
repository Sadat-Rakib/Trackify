
import React from "react";
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import StreakTracker from "../StreakTracker";

interface DashboardActionCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
  className?: string;
}


const DashboardActionCard: React.FC<DashboardActionCardProps> = ({
  title,
  icon: Icon,
  color,
  onClick,
  className
}) => {
  // Map of color strings to Tailwind classes for better type safety
  const colorClasses: Record<string, { bg: string, text: string }> = {
    primary: { bg: 'bg-transparent', text: 'text-primary' },
    water: { bg: 'bg-transparent', text: 'text-blue-500' },
    goal: { bg: 'bg-transparent', text: 'text-green-500' },
    calories: { bg: 'bg-transparent', text: 'text-orange-500' },
    purple: { bg: 'bg-transparent', text: 'text-purple-500' },
    green: { bg: 'bg-transparent', text: 'text-green-500' },
    pink: { bg: 'bg-transparent', text: 'text-pink-500' },
    rose: { bg: 'bg-transparent', text: 'text-rose-500' }
  };

  // Get color classes or use default
  const colorClass = colorClasses[color] || { bg: 'bg-transparent', text: 'text-primary' };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "p-4 rounded-xl flex flex-col items-center justify-center w-full transition-colors",
              className
            )}
            onClick={onClick}
          >
            <Icon className={cn('h-6 w-6 mb-2', colorClass.text)} />
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium">{title}</span>
              <StreakTracker trackerName={title} currentStreak={5} />
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          Track your {title.toLowerCase()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DashboardActionCard;
