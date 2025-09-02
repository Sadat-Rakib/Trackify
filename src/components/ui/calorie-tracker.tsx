
import React, { useState } from 'react';
import { Flame, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface CalorieTrackerProps {
  className?: string;
  // Remove the expected properties that are not being used
}

const CalorieTracker: React.FC<CalorieTrackerProps> = ({ className }) => {
  const [calories, setCalories] = useState(1200);
  const [showAdd, setShowAdd] = useState(false);
  const [newCalories, setNewCalories] = useState('');
  
  const goal = 2000; // Daily calorie goal
  const progress = Math.min((calories / goal) * 100, 100);

  const addCalories = () => {
    if (newCalories.trim() !== '') {
      const value = parseInt(newCalories);
      if (!isNaN(value) && value > 0) {
        setCalories(prev => prev + value);
        setNewCalories('');
        setShowAdd(false);
      }
    }
  };

  return (
    <div className={cn("glass-card p-5", className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Flame className="h-5 w-5 text-calories" />
          <span>Calorie Intake</span>
        </h3>
        <span className="category-pill bg-calories-light text-calories-dark">
          <Flame className="h-3.5 w-3.5" />
          Nutrition
        </span>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-3xl font-bold text-calories-dark">{calories}</span>
            <span className="text-muted-foreground text-sm ml-1">/ {goal}</span>
          </div>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="p-2 rounded-full bg-calories-light text-calories-dark hover:bg-calories hover:text-white transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        <Progress 
          value={progress} 
          className="h-3 bg-calories-light" 
          indicatorClassName="bg-calories"
        />
        
        {showAdd && (
          <div className="mt-4 animate-fade-in">
            <div className="flex gap-2">
              <input
                type="number"
                value={newCalories}
                onChange={(e) => setNewCalories(e.target.value)}
                placeholder="Add calories"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button 
                onClick={addCalories}
                className="rounded-md px-3 bg-calories text-white hover:bg-calories-dark transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalorieTracker;
