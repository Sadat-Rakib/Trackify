
import React from 'react';
import { Activity } from 'lucide-react';
import ExerciseTracker from '@/components/ui/exercise-tracker';
import MainLayout from '@/components/layout/MainLayout';

const ExercisePage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          Exercise Tracker
        </h2>
        <p className="text-muted-foreground">Monitor your workouts and physical activity.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExerciseTracker className="h-auto" />
        
        <div className="glass-card p-5">
          <h3 className="text-lg font-medium mb-4">Weekly Activity</h3>
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, i) => {
                const dayValue = Math.floor(Math.random() * 100);
                const height = 20 + dayValue;
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="flex-1 w-full flex items-end justify-center">
                      <div 
                        className="w-6 bg-primary/60 rounded-t-md" 
                        style={{ height: `${height}px` }}
                      />
                    </div>
                    <span className="text-xs mt-2">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="glass-card p-5 md:col-span-2">
          <h3 className="text-lg font-medium mb-4">Recent Workouts</h3>
          <div className="space-y-3">
            {[
              { day: 'Today', name: 'Morning Run', duration: '30 min', calories: 320 },
              { day: 'Yesterday', name: 'Weight Training', duration: '45 min', calories: 280 },
              { day: '2 days ago', name: 'Yoga Session', duration: '60 min', calories: 180 },
              { day: '3 days ago', name: 'HIIT Workout', duration: '25 min', calories: 300 }
            ].map((workout, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-secondary/50 rounded-xl">
                <div>
                  <div className="font-medium">{workout.name}</div>
                  <div className="text-sm text-muted-foreground">{workout.day} • {workout.duration}</div>
                </div>
                <div className="text-primary font-medium">{workout.calories} cal</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExercisePage;
