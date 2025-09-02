
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WaterPage from "./pages/WaterPage";
import NutritionPage from "./pages/NutritionPage";
import ExercisePage from "./pages/ExercisePage";
import MoodPage from "./pages/MoodPage";
import GoalsPage from "./pages/GoalsPage";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/SettingsPage";
import SleepPage from "./pages/SleepPage";
import BudgetPage from "./pages/BudgetPage";
import PomodoroPage from "./pages/PomodoroPage";
import HabitsPage from "./pages/HabitsPage";
import JournalPage from "./pages/JournalPage";
import CycleTrackerPage from "./pages/CycleTrackerPage";
import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  // Create a QueryClient instance with useState to ensure stability across renders
  const [queryClient] = useState(() => new QueryClient());

  // Set up theme preferences from localStorage on app load
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'system';
    document.documentElement.setAttribute('data-theme', theme);

    // Initialize user data if not present
    if (!localStorage.getItem('userData')) {
      const defaultUserData = {
        name: 'Guest',
        email: 'email@example.com',
        age: '20',
        gender: 'male',
        height: '171',
        weight: '68',
        activityLevel: 'moderate'
      };
      localStorage.setItem('userData', JSON.stringify(defaultUserData));
      localStorage.setItem('userGender', 'male');
    }

    // Initialize dashboard items if not present
    if (!localStorage.getItem('dashboardItems')) {
      const defaultDashboardItems = {
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
        habitsTracker: false,
        weeklyProgress: true
      };
      localStorage.setItem('dashboardItems', JSON.stringify(defaultDashboardItems));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton duration={3000} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/water" element={<WaterPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/exercise" element={<ExercisePage />} />
            <Route path="/mood" element={<MoodPage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/sleep" element={<SleepPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/pomodoro" element={<PomodoroPage />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/cycle-tracker" element={<CycleTrackerPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
