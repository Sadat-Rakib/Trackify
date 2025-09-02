
import React from 'react';
import { Target } from 'lucide-react';
import DailyGoal from '@/components/ui/daily-goal';
import MainLayout from '@/components/layout/MainLayout';

const GoalsPage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Target className="h-6 w-6 text-goal" />
          Goals Tracker
        </h2>
        <p className="text-muted-foreground">Set and track your fitness and wellness goals.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <DailyGoal className="h-auto" />
        
        <div className="glass-card p-5">
          <h3 className="text-lg font-medium mb-4">Active Goals</h3>
          <div className="space-y-3">
            {[
              { name: 'Drink 2L of water daily', progress: 75, color: 'bg-water' },
              { name: 'Exercise 30 minutes 4x per week', progress: 50, color: 'bg-primary' },
              { name: 'Meditate for 10 minutes daily', progress: 90, color: 'bg-yellow-500' },
              { name: 'Maintain caloric deficit of 300 calories', progress: 60, color: 'bg-calories' }
            ].map((goal, i) => (
              <div key={i} className="p-3 bg-secondary/50 rounded-xl">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{goal.name}</span>
                  <span className="font-medium">{goal.progress}%</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div className={`h-full ${goal.color}`} style={{ width: `${goal.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-card p-5">
          <h3 className="text-lg font-medium mb-4">Goal History</h3>
          <div className="space-y-3">
            {[
              { name: 'Run 5K without stopping', completed: 'Completed May 15', days: 30 },
              { name: 'No processed sugar for 2 weeks', completed: 'Completed April 22', days: 14 },
              { name: 'Learn 5 new healthy recipes', completed: 'Completed March 10', days: 45 }
            ].map((goal, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-secondary/50 rounded-xl">
                <div>
                  <div className="font-medium">{goal.name}</div>
                  <div className="text-sm text-muted-foreground">{goal.completed}</div>
                </div>
                <div className="text-sm font-medium">{goal.days} days</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GoalsPage;
