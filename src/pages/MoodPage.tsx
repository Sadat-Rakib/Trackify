
import React from 'react';
import { SmilePlus } from 'lucide-react';
import MoodTracker from '@/components/ui/mood-tracker';
import MainLayout from '@/components/layout/MainLayout';

const MoodPage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <SmilePlus className="h-6 w-6 text-yellow-500" />
          Mood Tracker
        </h2>
        <p className="text-muted-foreground">Monitor your emotional wellbeing and mental health.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MoodTracker className="h-auto" />
        
        <div className="glass-card p-5">
          <h3 className="text-lg font-medium mb-4">Mood Calendar</h3>
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
                <div key={day} className="font-medium">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 mt-2">
              {Array.from({ length: 28 }).map((_, i) => {
                // Generate random mood: 0-1 bad, 2-3 neutral, 4-5 good
                const mood = Math.floor(Math.random() * 6);
                let bgColor = '';
                if (mood <= 1) bgColor = 'bg-red-300';
                else if (mood <= 3) bgColor = 'bg-yellow-300';
                else bgColor = 'bg-green-300';
                
                return (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-md ${bgColor} flex items-center justify-center text-xs`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="glass-card p-5 md:col-span-2">
          <h3 className="text-lg font-medium mb-4">Mood Patterns & Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-secondary/50 rounded-xl">
              <h4 className="font-medium">Your mood is typically better in the morning</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Your tracked data shows your highest mood ratings are usually logged before noon.
              </p>
            </div>
            <div className="p-3 bg-secondary/50 rounded-xl">
              <h4 className="font-medium">Exercise correlates with improved mood</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Days with recorded exercise show higher mood ratings on average.
              </p>
            </div>
            <div className="p-3 bg-secondary/50 rounded-xl">
              <h4 className="font-medium">Your mood has been stable this week</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Your mood ratings have been consistent with minimal fluctuations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MoodPage;
