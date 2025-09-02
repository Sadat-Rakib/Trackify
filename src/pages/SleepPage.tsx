
import React, { useState } from 'react';
import { Moon, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';

const SleepPage = () => {
  const [sleepHours, setSleepHours] = useState(7.5);
  const [sleepQuality, setSleepQuality] = useState(4);
  const [bedtime, setBedtime] = useState('23:00');
  const [wakeTime, setWakeTime] = useState('06:30');

  const handleSaveSleepData = () => {
    toast.success('Sleep data saved successfully!');
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Moon className="h-6 w-6 text-indigo-500" />
          Sleep Tracker
        </h2>
        <p className="text-muted-foreground">Monitor your sleep patterns for better rest and recovery.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-500" />
            <span>Last Night's Sleep</span>
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Hours Slept</span>
                <span className="text-sm font-medium">{sleepHours} hrs</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                  className="w-full h-2 bg-indigo-200 rounded-full appearance-none cursor-pointer"
                />
                <div className="absolute -top-1 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                  <span>0h</span>
                  <span>6h</span>
                  <span>12h</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Sleep Quality</span>
                <span className="text-sm font-medium">{sleepQuality}/5</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSleepQuality(rating)}
                    className={`flex-1 p-2 rounded-md transition-colors ${
                      rating <= sleepQuality
                        ? 'bg-indigo-500 text-white'
                        : 'bg-indigo-100 text-indigo-900'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Bedtime</label>
                <input
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="w-full p-2 border border-input rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Wake Time</label>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full p-2 border border-input rounded-md bg-background"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleSaveSleepData}
              className="w-full bg-indigo-500 hover:bg-indigo-600"
            >
              Save Sleep Data
            </Button>
          </div>
        </div>
        
        <div className="glass-card p-5">
          <h3 className="text-lg font-medium mb-4">Weekly Sleep Overview</h3>
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, i) => {
                const hours = 5 + Math.random() * 4;
                const height = (hours / 12) * 100;
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="flex-1 w-full flex items-end justify-center h-32">
                      <div 
                        className="w-6 bg-indigo-400 rounded-t-md" 
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="text-xs mt-2">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                    <span className="text-xs text-muted-foreground">{hours.toFixed(1)}h</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="glass-card p-5 md:col-span-2">
          <h3 className="text-lg font-medium mb-4">Sleep Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Maintain a Consistent Schedule</h4>
              <p className="text-sm text-muted-foreground">Go to bed and wake up at the same time every day, even on weekends.</p>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Create a Relaxing Bedtime Routine</h4>
              <p className="text-sm text-muted-foreground">Reading, meditation, or a warm bath can signal your body it's time to wind down.</p>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Optimize Your Sleep Environment</h4>
              <p className="text-sm text-muted-foreground">Keep your bedroom cool, dark, and quiet for optimal sleep conditions.</p>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Limit Screen Time Before Bed</h4>
              <p className="text-sm text-muted-foreground">Avoid phones, tablets, and computers at least 1 hour before bedtime.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SleepPage;
