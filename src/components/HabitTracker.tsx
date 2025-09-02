
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Trash2, 
  Calendar, 
  RotateCcw, 
  Edit, 
  Save, 
  X, 
  PlusCircle,
  CalendarCheck,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isToday, startOfWeek, addDays } from 'date-fns';

interface Habit {
  id: number;
  name: string;
  category: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  completed: Record<string, boolean>;
  streak: number;
  createdAt: Date;
  lastCompletedAt?: Date;
}

interface HabitCategoryOption {
  value: string;
  label: string;
  color: string;
}

const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const categoryOptions: HabitCategoryOption[] = [
  { value: 'health', label: 'Health & Wellness', color: 'bg-green-500/10 text-green-700 border-green-200 dark:border-green-800 dark:text-green-400' },
  { value: 'productivity', label: 'Productivity', color: 'bg-blue-500/10 text-blue-700 border-blue-200 dark:border-blue-800 dark:text-blue-400' },
  { value: 'learning', label: 'Learning', color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200 dark:border-indigo-800 dark:text-indigo-400' },
  { value: 'fitness', label: 'Fitness', color: 'bg-orange-500/10 text-orange-700 border-orange-200 dark:border-orange-800 dark:text-orange-400' },
  { value: 'mindfulness', label: 'Mindfulness', color: 'bg-purple-500/10 text-purple-700 border-purple-200 dark:border-purple-800 dark:text-purple-400' },
  { value: 'social', label: 'Social & Relationships', color: 'bg-pink-500/10 text-pink-700 border-pink-200 dark:border-pink-800 dark:text-pink-400' },
  { value: 'finance', label: 'Finance', color: 'bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:border-yellow-800 dark:text-yellow-400' },
  { value: 'other', label: 'Other', color: 'bg-gray-500/10 text-gray-700 border-gray-200 dark:border-gray-800 dark:text-gray-400' },
];

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState<string>('');
  const [newHabitCategory, setNewHabitCategory] = useState<string>('other');
  const [newHabitFrequency, setNewHabitFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [editingHabitId, setEditingHabitId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editCategory, setEditCategory] = useState<string>('');
  const [editFrequency, setEditFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  // Initialize the week dates for the weekly view
  useEffect(() => {
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });
    const weekDaysArray = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
    setWeekDates(weekDaysArray);
  }, []);

  // Load habits from localStorage
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      try {
        const parsedHabits = JSON.parse(savedHabits, (key, value) => {
          if (key === 'createdAt' || key === 'lastCompletedAt') {
            return value ? new Date(value) : undefined;
          }
          return value;
        });
        setHabits(parsedHabits);
      } catch (error) {
        console.error('Failed to parse saved habits:', error);
      }
    }
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabitName.trim() === '') {
      toast.error('Please enter a habit name');
      return;
    }

    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    
    const newHabit: Habit = {
      id: Date.now(),
      name: newHabitName,
      category: newHabitCategory,
      frequency: newHabitFrequency,
      completed: {},
      streak: 0,
      createdAt: today,
    };
    
    setHabits([...habits, newHabit]);
    setNewHabitName('');
    toast.success('New habit added!');
  };

  const toggleHabitCompletion = (habit: Habit, dateStr: string = format(new Date(), 'yyyy-MM-dd')) => {
    const updatedHabits = habits.map((h) => {
      if (h.id === habit.id) {
        const isNowCompleted = !h.completed[dateStr];
        const updatedCompleted = { ...h.completed, [dateStr]: isNowCompleted };
        
        // Update streak
        let updatedStreak = h.streak;
        if (isNowCompleted) {
          updatedStreak += 1;
        } else {
          updatedStreak = Math.max(0, updatedStreak - 1);
        }
        
        return {
          ...h,
          completed: updatedCompleted,
          streak: updatedStreak,
          lastCompletedAt: isNowCompleted ? new Date() : h.lastCompletedAt
        };
      }
      return h;
    });
    
    setHabits(updatedHabits);
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
    if (editingHabitId === id) {
      setEditingHabitId(null);
    }
    toast.success('Habit deleted');
  };

  const startEditing = (habit: Habit) => {
    setEditingHabitId(habit.id);
    setEditName(habit.name);
    setEditCategory(habit.category);
    setEditFrequency(habit.frequency);
  };

  const saveEdit = (id: number) => {
    if (editName.trim() === '') {
      toast.error('Habit name cannot be empty');
      return;
    }
    
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        return {
          ...habit,
          name: editName,
          category: editCategory,
          frequency: editFrequency
        };
      }
      return habit;
    }));
    
    setEditingHabitId(null);
    toast.success('Habit updated');
  };

  const cancelEdit = () => {
    setEditingHabitId(null);
  };

  const resetStreak = (id: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        return { ...habit, streak: 0 };
      }
      return habit;
    }));
    toast.success('Streak reset');
  };

  const getCategoryColor = (categoryValue: string) => {
    return categoryOptions.find(option => option.value === categoryValue)?.color || '';
  };

  const filteredHabits = selectedCategory 
    ? habits.filter(habit => habit.category === selectedCategory)
    : habits;

  // Calculate completion rate
  const calculateCompletionRate = (habit: Habit) => {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    
    // For daily habits, check the last 7 days
    if (habit.frequency === 'daily') {
      let completed = 0;
      let total = 7;
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = format(date, 'yyyy-MM-dd');
        
        if (habit.completed[dateStr]) {
          completed++;
        }
      }
      
      return Math.round((completed / total) * 100);
    }
    
    // For weekly habits, simpler calculation
    if (habit.frequency === 'weekly') {
      // Check if completed this week
      const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 });
      const startOfWeekStr = format(startOfWeekDate, 'yyyy-MM-dd');
      
      let completed = false;
      for (const dateStr in habit.completed) {
        const date = new Date(dateStr);
        if (date >= startOfWeekDate && habit.completed[dateStr]) {
          completed = true;
          break;
        }
      }
      
      return completed ? 100 : 0;
    }
    
    // For monthly habits
    if (habit.frequency === 'monthly') {
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      let completed = false;
      for (const dateStr in habit.completed) {
        const date = new Date(dateStr);
        if (date.getMonth() === currentMonth && 
            date.getFullYear() === currentYear && 
            habit.completed[dateStr]) {
          completed = true;
          break;
        }
      }
      
      return completed ? 100 : 0;
    }
    
    return 0;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Habit</CardTitle>
          <CardDescription>Create a new habit to track your progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Habit Name</label>
              <Input
                type="text"
                placeholder="What habit do you want to track?"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select 
                  value={newHabitCategory} 
                  onValueChange={setNewHabitCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Frequency</label>
                <Select 
                  value={newHabitFrequency} 
                  onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setNewHabitFrequency(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button onClick={addHabit} className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Habit
          </Button>
        </CardContent>
      </Card>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        
        {categoryOptions.map(option => (
          <Button
            key={option.value}
            variant={selectedCategory === option.value ? "default" : "outline"}
            size="sm"
            className={cn(
              selectedCategory !== option.value && option.color
            )}
            onClick={() => setSelectedCategory(prev => prev === option.value ? null : option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
      
      {filteredHabits.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-muted/10">
          <CalendarCheck className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-medium">No habits yet</h3>
          <p className="text-muted-foreground mt-2">
            {selectedCategory 
              ? "No habits in this category. Try selecting a different category or add a new habit." 
              : "Start by adding your first habit to track your progress."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHabits.map((habit) => (
            <Card key={habit.id} className={cn(
              "overflow-hidden border-l-4",
              getCategoryColor(habit.category).split(' ')[0].replace('bg-', 'border-')
            )}>
              {editingHabitId === habit.id ? (
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Habit name"
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Select 
                        value={editCategory} 
                        onValueChange={setEditCategory}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Select 
                        value={editFrequency} 
                        onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setEditFrequency(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {frequencyOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={() => saveEdit(habit.id)} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={cancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              ) : (
                <>
                  <div className="flex items-start justify-between p-4">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        id={`habit-${habit.id}`}
                        checked={!!habit.completed[format(new Date(), 'yyyy-MM-dd')]}
                        onCheckedChange={() => toggleHabitCompletion(habit)}
                        className="mt-1"
                      />
                      <div>
                        <label
                          htmlFor={`habit-${habit.id}`}
                          className={cn(
                            "font-medium text-base cursor-pointer",
                            habit.completed[format(new Date(), 'yyyy-MM-dd')] ? 'line-through text-muted-foreground' : ''
                          )}
                        >
                          {habit.name}
                        </label>
                        
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              getCategoryColor(habit.category)
                            )}
                          >
                            {categoryOptions.find(c => c.value === habit.category)?.label || habit.category}
                          </Badge>
                          
                          <Badge variant="outline" className="text-xs flex gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {frequencyOptions.find(f => f.value === habit.frequency)?.label}
                          </Badge>
                          
                          {habit.streak > 0 && (
                            <Badge className="text-xs bg-amber-500/80 hover:bg-amber-500">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              {habit.streak} streak
                            </Badge>
                          )}
                        </div>
                        
                        {habit.lastCompletedAt && (
                          <div className="text-xs text-muted-foreground mt-1 flex gap-1 items-center">
                            <Clock className="h-3 w-3" />
                            Last completed: {formatLastCompleted(habit.lastCompletedAt)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                          <div className="p-3">
                            <div className="font-medium mb-2">Mark for specific dates</div>
                            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} className="text-xs font-medium">{day}</div>
                              ))}
                              
                              {weekDates.map((date, index) => (
                                <div key={index} className="text-center">
                                  <Checkbox
                                    checked={!!habit.completed[format(date, 'yyyy-MM-dd')]}
                                    onCheckedChange={() => toggleHabitCompletion(habit, format(date, 'yyyy-MM-dd'))}
                                    id={`habit-${habit.id}-date-${index}`}
                                    className="mx-auto"
                                  />
                                  <label 
                                    htmlFor={`habit-${habit.id}-date-${index}`}
                                    className={cn(
                                      "text-xs block mt-1",
                                      isToday(date) && "font-bold text-primary"
                                    )}
                                  >
                                    {date.getDate()}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      
                      <Button variant="ghost" size="icon" onClick={() => startEditing(habit)} className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-4" align="end">
                          <div className="space-y-2">
                            <h4 className="font-medium">Delete Habit</h4>
                            <p className="text-sm text-muted-foreground">
                              Are you sure you want to delete this habit? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-2 mt-4">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <RotateCcw className="h-3.5 w-3.5 mr-1" />
                                    Reset
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-4" align="end">
                                  <div className="space-y-2">
                                    <h4 className="font-medium">Reset Streak</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Reset the streak counter to zero?
                                    </p>
                                    <Button 
                                      variant="destructive" 
                                      size="sm" 
                                      className="w-full"
                                      onClick={() => resetStreak(habit.id)}
                                    >
                                      Reset Streak
                                    </Button>
                                  </div>
                                </PopoverContent>
                              </Popover>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => deleteHabit(habit.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <CardFooter className="bg-muted/20 py-3 px-4 border-t">
                    <div className="w-full">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Completion Rate:</span>
                        <span>{calculateCompletionRate(habit)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${calculateCompletionRate(habit)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardFooter>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Habit Tracking Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>Start small with just 1-3 habits and build from there</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>Track daily to build momentum and maintain your streak</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>Link new habits to existing routines for better success</span>
            </li>
            <li className="flex gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span>If you miss a day, don't break the chain - just get back on track tomorrow</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to format the last completed date
const formatLastCompleted = (date: Date): string => {
  if (isToday(date)) {
    return 'Today';
  }
  
  return format(date, 'MMM d, yyyy');
};

export default HabitTracker;
