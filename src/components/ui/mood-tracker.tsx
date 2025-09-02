
import React, { useState } from 'react';
import { SmilePlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MoodTrackerProps {
  className?: string;
}

type Mood = 'great' | 'good' | 'okay' | 'bad' | 'awful';

const moods: Record<Mood, { emoji: string; color: string }> = {
  great: { emoji: '😃', color: 'bg-green-500 dark:bg-green-600' },
  good: { emoji: '🙂', color: 'bg-green-300 dark:bg-green-400' },
  okay: { emoji: '😐', color: 'bg-yellow-300 dark:bg-yellow-400' },
  bad: { emoji: '😔', color: 'bg-orange-300 dark:bg-orange-400' },
  awful: { emoji: '😢', color: 'bg-red-300 dark:bg-red-400' },
};

const MoodTracker: React.FC<MoodTrackerProps> = ({ className }) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  return (
    <div className={cn("glass-card p-5", className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <SmilePlus className="h-5 w-5 text-mood" />
          <span>Mood Tracker</span>
        </h3>
        <span className="category-pill bg-mood-light text-mood-dark dark:bg-mood/30 dark:text-mood-light">
          <SmilePlus className="h-3.5 w-3.5" />
          Mental Health
        </span>
      </div>
      
      <div className="mt-3">
        <p className="text-center text-muted-foreground mb-4">How are you feeling today?</p>
        
        <div className="flex justify-between">
          {(Object.keys(moods) as Mood[]).map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={cn(
                "relative p-2 rounded-full transition-all duration-300 hover:scale-110",
                selectedMood === mood ? "ring-2 ring-offset-2 ring-mood dark:ring-offset-background" : ""
              )}
            >
              <span className="text-2xl">{moods[mood].emoji}</span>
              {selectedMood === mood && (
                <span className={cn(
                  "absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full",
                  moods[mood].color
                )} />
              )}
            </button>
          ))}
        </div>
        
        {selectedMood && (
          <div className="mt-6 text-center animate-fade-in">
            <p className="text-sm text-muted-foreground">You're feeling:</p>
            <p className="text-xl font-semibold mt-1 capitalize text-mood-dark dark:text-mood-light">{selectedMood}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
