
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Award, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import HabitTracker from '@/components/HabitTracker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HabitsPage = () => {
  const [streak, setStreak] = useState(5);
  const [completionRate, setCompletionRate] = useState(85);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Habit Tracker</h1>
            <p className="text-muted-foreground">Build consistency with daily habits tracking</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full flex items-center">
              <Award className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{streak} day streak</span>
            </div>
            
            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{completionRate}% complete</span>
            </div>
          </div>
        </div>
        
        <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300">
          <Award className="h-4 w-4" />
          <AlertTitle>Achievement unlocked!</AlertTitle>
          <AlertDescription>
            You've completed your "Daily Exercise" habit 7 days in a row!
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Habits</CardTitle>
                <CardDescription>Track your daily progress and build consistency</CardDescription>
              </CardHeader>
              <CardContent>
                <HabitTracker />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Habit</CardTitle>
                <CardDescription>Create a new habit to track daily</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Habit Name</label>
                  <Input placeholder="e.g., Drink water" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select defaultValue="health">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Reminder Time</label>
                  <Input type="time" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="repeat-daily" />
                  <label
                    htmlFor="repeat-daily"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Repeat daily
                  </label>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Habit
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Your habit tracking insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-sm text-muted-foreground">{completionRate}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Current Streak</span>
                    <span className="text-sm text-muted-foreground">{streak} days</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${Math.min((streak / 10) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Most Consistent Habits</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center text-sm">
                      <span>Morning Meditation</span>
                      <span className="text-muted-foreground">92%</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span>Daily Exercise</span>
                      <span className="text-muted-foreground">86%</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span>Reading</span>
                      <span className="text-muted-foreground">78%</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HabitsPage;
