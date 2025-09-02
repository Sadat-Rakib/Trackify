
import React, { useState } from 'react';
import { CheckCircle, Target, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DailyGoalProps {
  className?: string;
}

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

const DailyGoal: React.FC<DailyGoalProps> = ({ className }) => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', text: 'Walk 10,000 steps', completed: false },
    { id: '2', text: 'Drink 8 glasses of water', completed: true }
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  
  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;
  const progress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const addGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals(prev => [
        ...prev, 
        { 
          id: Date.now().toString(), 
          text: newGoal, 
          completed: false 
        }
      ]);
      setNewGoal('');
      setShowAdd(false);
    }
  };

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const removeGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  return (
    <div className={cn("glass-card p-5", className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Target className="h-5 w-5 text-goal" />
          <span>Daily Goals</span>
        </h3>
        <span className="category-pill bg-goal-light text-goal-dark">
          <CheckCircle className="h-3.5 w-3.5" />
          Progress
        </span>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-xl font-bold text-goal-dark">{completedGoals}/{totalGoals}</span>
            <span className="text-muted-foreground text-sm ml-1">goals completed</span>
          </div>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="p-2 rounded-full bg-goal-light text-goal-dark hover:bg-goal hover:text-white transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        <div className="w-full bg-goal-light/30 rounded-full h-2 mb-4">
          <div 
            className="bg-goal h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="space-y-2 max-h-[200px] overflow-auto pr-1">
          {goals.map(goal => (
            <div 
              key={goal.id} 
              className={cn(
                "flex items-center justify-between p-2 rounded-lg transition-colors",
                goal.completed ? "bg-goal-light/70" : "bg-goal-light/30"
              )}
            >
              <div className="flex items-center">
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className="mr-2 flex-shrink-0"
                >
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    goal.completed ? "border-goal bg-goal text-white" : "border-goal-dark bg-transparent"
                  )}>
                    {goal.completed && <CheckCircle className="h-4 w-4" />}
                  </div>
                </button>
                <p className={cn(
                  "font-medium",
                  goal.completed ? "text-muted-foreground line-through" : "text-goal-dark"
                )}>
                  {goal.text}
                </p>
              </div>
              <button 
                onClick={() => removeGoal(goal.id)}
                className="p-1 rounded-full hover:bg-goal-light transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
        
        {showAdd && (
          <div className="mt-4 animate-fade-in">
            <div className="flex gap-2">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add a new goal"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button 
                onClick={addGoal}
                className="rounded-md px-3 bg-goal text-white hover:bg-goal-dark transition-colors"
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

export default DailyGoal;
