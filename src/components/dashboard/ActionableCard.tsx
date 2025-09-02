
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionableCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  actionLabel: string;
  onClick: () => void;
  className?: string;
}

const ActionableCard: React.FC<ActionableCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  actionLabel,
  onClick,
  className
}) => {
  // Map of color strings to Tailwind classes
  const colorClasses: Record<string, { bg: string, text: string, border: string }> = {
    primary: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' },
    water: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
    goal: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20' },
    calories: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/20' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20' },
    green: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20' },
    pink: { bg: 'bg-pink-500/10', text: 'text-pink-500', border: 'border-pink-500/20' },
    rose: { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/20' },
    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20' },
    indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-500', border: 'border-indigo-500/20' },
    red: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20' },
  };

  // Get color classes or use default
  const colorClass = colorClasses[color] || colorClasses.primary;

  return (
    <div 
      className={cn(
        "glass-card p-4 flex flex-col h-full transition-all duration-200",
        colorClass.bg,
        "border",
        colorClass.border,
        className
      )}
    >
      <div className="flex items-center mb-3">
        <div className={cn("p-2 rounded-full mr-3", colorClass.bg)}>
          <Icon className={cn("h-5 w-5", colorClass.text)} />
        </div>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      
      <div className="text-2xl font-bold mb-4">{value}</div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className={cn(
          "mt-auto w-full justify-center",
          colorClass.text,
          "hover:bg-background/50 border",
          colorClass.border
        )}
        onClick={onClick}
      >
        {actionLabel}
      </Button>
    </div>
  );
};

export default ActionableCard;
