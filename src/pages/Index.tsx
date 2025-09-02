import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import WaterTracker from '@/components/ui/water-tracker';
import CalorieTracker from '@/components/ui/calorie-tracker';
import ExerciseTracker from '@/components/ui/exercise-tracker';
import MoodTracker from '@/components/ui/mood-tracker';
import DailyGoal from '@/components/ui/daily-goal';
import DashboardActionableCards from '@/components/dashboard/DashboardActionableCards';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { X } from 'lucide-react';

// Updated interface to include all required properties
interface DashboardItems {
  water: boolean;
  nutrition: boolean;
  exercise: boolean;
  mood: boolean;
  goals: boolean;
  quickWater: boolean;
  quickExercise: boolean;
  quickNutrition: boolean;
  quickGoals: boolean;
  quickSleep: boolean;
  quickBudget: boolean;
  quickMood: boolean;
  quickCycle: boolean;
  healthScore: boolean;
  sleepQuality: boolean;
  workout: boolean;
  calories: boolean;
  moodTracker: boolean;
  activeGoals: boolean;
  journalEntry: boolean;
  habitsTracker: boolean;
}
const defaultDashboardItems: DashboardItems = {
  water: true,
  nutrition: true,
  exercise: true,
  mood: true,
  goals: true,
  quickWater: true,
  quickExercise: true,
  quickNutrition: true,
  quickGoals: true,
  quickSleep: false,
  quickBudget: false,
  quickMood: false,
  quickCycle: false,
  healthScore: true,
  sleepQuality: true,
  workout: true,
  calories: false,
  moodTracker: false,
  activeGoals: true,
  journalEntry: false,
  habitsTracker: false
};
const Index = () => {
  const [dashboardItems, setDashboardItems] = useState<DashboardItems>(defaultDashboardItems);
  const [waterIntake, setWaterIntake] = useState({
    currentValue: 0,
    goal: 8
  });
  const addWater = () => {
    setWaterIntake(prev => ({
      ...prev,
      currentValue: Math.min(prev.currentValue + 1, prev.goal)
    }));
  };
  const removeWater = () => {
    setWaterIntake(prev => ({
      ...prev,
      currentValue: Math.max(0, prev.currentValue - 1)
    }));
  };
  const [calorieIntake, setCalorieIntake] = useState({
    currentValue: 0,
    goal: 2000
  });
  const addCalorie = (amount: number) => {
    setCalorieIntake(prev => ({
      ...prev,
      currentValue: prev.currentValue + amount
    }));
  };
  const removeCalorie = (amount: number) => {
    setCalorieIntake(prev => ({
      ...prev,
      currentValue: Math.max(0, prev.currentValue - amount)
    }));
  };
  const [exerciseMinutes, setExerciseMinutes] = useState({
    currentValue: 0,
    goal: 30
  });
  const addExercise = (minutes: number) => {
    setExerciseMinutes(prev => ({
      ...prev,
      currentValue: prev.currentValue + minutes
    }));
  };
  const removeExercise = (minutes: number) => {
    setExerciseMinutes(prev => ({
      ...prev,
      currentValue: Math.max(0, prev.currentValue - minutes)
    }));
  };
  useEffect(() => {
    const savedDashboardItems = localStorage.getItem('dashboardItems');
    if (savedDashboardItems) {
      try {
        const parsedItems = JSON.parse(savedDashboardItems);
        setDashboardItems(prev => ({
          ...prev,
          ...parsedItems
        }));
      } catch (error) {
        console.error('Failed to parse dashboard items from localStorage', error);
        setDashboardItems(defaultDashboardItems);
      }
    } else {
      setDashboardItems(defaultDashboardItems);
    }
    if (!localStorage.getItem('waterIntake')) {
      localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
    }
    if (!localStorage.getItem('calorieIntake')) {
      localStorage.setItem('calorieIntake', JSON.stringify(calorieIntake));
    }
    if (!localStorage.getItem('exerciseMinutes')) {
      localStorage.setItem('exerciseMinutes', JSON.stringify(exerciseMinutes));
    }
  }, []);
  useEffect(() => {
    const sections = document.querySelectorAll('.animate-on-mount');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('animate-enter');
      }, 100 * index);
    });
  }, []);
  return <MainLayout>
      <div className="mb-6 animate-on-mount opacity-0">
        <h1 className="text-2xl font-bold mb-1 text-left"> Dashboard</h1>
        <p className="text-muted-foreground text-left text-xs pl-2 text-gray-500 font-medium">Track your life, simplify your journey</p>
      </div>

      <DashboardActionableCards visibleCards={dashboardItems} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.water && <WaterTracker waterData={waterIntake} addWater={addWater} removeWater={removeWater} className="animate-on-mount opacity-0" />}
        {dashboardItems.nutrition && <CalorieTracker className="animate-on-mount opacity-0" />}
        {dashboardItems.exercise && <ExerciseTracker className="animate-on-mount opacity-0" />}
        {dashboardItems.mood && <MoodTracker className="animate-on-mount opacity-0" />}
        {dashboardItems.goals && <DailyGoal className="animate-on-mount opacity-0" />}
      </div>
    </MainLayout>;
};
export default Index;