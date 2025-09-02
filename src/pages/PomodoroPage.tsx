
import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Play, Pause, RotateCcw, Plus, X, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_WORK_TIME = 25 * 60; // 25 minutes in seconds
const DEFAULT_BREAK_TIME = 5 * 60;  // 5 minutes in seconds

const PomodoroPage = () => {
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timerTitle, setTimerTitle] = useState('Work');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [savedTimers, setSavedTimers] = useState([
    { id: 1, title: 'Coding', workTime: 25 * 60, breakTime: 5 * 60 },
    { id: 2, title: 'Reading', workTime: 20 * 60, breakTime: 5 * 60 },
    { id: 3, title: 'Exercise', workTime: 45 * 60, breakTime: 15 * 60 },
  ]);
  const [newTimerTitle, setNewTimerTitle] = useState('');
  
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          handleTimerComplete();
          return isBreak ? workTime : breakTime;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handlePause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setTimeLeft(isBreak ? breakTime : workTime);
  };

  const handleTimerComplete = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (!isBreak) {
      setCompletedPomodoros((prev) => prev + 1);
      toast.success('Work session completed!');
      setIsBreak(true);
      setTimeLeft(breakTime);
    } else {
      toast.success('Break completed!');
      setIsBreak(false);
      setTimeLeft(workTime);
    }
    
    setIsRunning(false);
  };

  const handleSaveTimer = () => {
    if (!newTimerTitle.trim()) {
      toast.error('Please enter a timer title');
      return;
    }
    
    const newTimer = {
      id: Date.now(),
      title: newTimerTitle,
      workTime,
      breakTime,
    };
    
    setSavedTimers([...savedTimers, newTimer]);
    setNewTimerTitle('');
    toast.success('Timer saved successfully');
  };

  const handleLoadTimer = (timer: { title: string; workTime: number; breakTime: number }) => {
    if (isRunning) {
      handlePause();
    }
    
    setTimerTitle(timer.title);
    setWorkTime(timer.workTime);
    setBreakTime(timer.breakTime);
    setTimeLeft(timer.workTime);
    setIsBreak(false);
    
    toast.success(`Loaded "${timer.title}" timer`);
  };

  const handleDeleteTimer = (id: number) => {
    setSavedTimers(savedTimers.filter(timer => timer.id !== id));
    toast.success('Timer deleted');
  };

  const percentage = Math.floor((timeLeft / (isBreak ? breakTime : workTime)) * 100);

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>{isBreak ? 'Break Time' : timerTitle}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {completedPomodoros} sessions completed
                </span>
              </CardTitle>
              <CardDescription>
                {isBreak ? 'Take a break and relax' : 'Focus on your task'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="relative mx-auto w-48 h-48 mb-6">
                <svg 
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    className="text-muted-foreground/20"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-primary"
                    strokeWidth="5"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * percentage) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{formatTime(timeLeft)}</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                {isRunning ? (
                  <Button variant="outline" size="lg" onClick={handlePause}>
                    <Pause className="mr-2 h-4 w-4" /> Pause
                  </Button>
                ) : (
                  <Button size="lg" onClick={handleStart}>
                    <Play className="mr-2 h-4 w-4" /> {timeLeft < (isBreak ? breakTime : workTime) ? 'Resume' : 'Start'}
                  </Button>
                )}
                <Button variant="secondary" size="lg" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-6 flex flex-col gap-4">
              <div className="w-full">
                <div className="flex justify-between mb-2">
                  <Label>Work Time: {Math.floor(workTime / 60)} minutes</Label>
                </div>
                <Slider
                  value={[workTime / 60]}
                  min={5}
                  max={60}
                  step={1}
                  onValueChange={(value) => {
                    const newTime = value[0] * 60;
                    setWorkTime(newTime);
                    if (!isBreak) setTimeLeft(newTime);
                  }}
                  disabled={isRunning}
                />
              </div>
              
              <div className="w-full">
                <div className="flex justify-between mb-2">
                  <Label>Break Time: {Math.floor(breakTime / 60)} minutes</Label>
                </div>
                <Slider
                  value={[breakTime / 60]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(value) => {
                    const newTime = value[0] * 60;
                    setBreakTime(newTime);
                    if (isBreak) setTimeLeft(newTime);
                  }}
                  disabled={isRunning}
                />
              </div>
            </CardFooter>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Save This Timer</CardTitle>
                <CardDescription>Create a preset for future use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Timer Title (e.g., Work, Study)"
                    value={newTimerTitle}
                    onChange={(e) => setNewTimerTitle(e.target.value)}
                  />
                  <Button onClick={handleSaveTimer}>
                    <Plus className="h-4 w-4 mr-2" /> Save
                  </Button>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Will save with {Math.floor(workTime / 60)}m work / {Math.floor(breakTime / 60)}m break settings
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Saved Timers</CardTitle>
                <CardDescription>Your preset timers</CardDescription>
              </CardHeader>
              <CardContent>
                {savedTimers.length > 0 ? (
                  <div className="space-y-2">
                    {savedTimers.map((timer) => (
                      <div key={timer.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                        <div>
                          <p className="font-medium">{timer.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.floor(timer.workTime / 60)}m work / {Math.floor(timer.breakTime / 60)}m break
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleLoadTimer(timer)}
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDeleteTimer(timer.id)}
                          >
                            <X className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No saved timers yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PomodoroPage;
