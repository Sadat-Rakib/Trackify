
import React from 'react';
import { Separator } from "@/components/ui/separator";
import ThemeSelector from './appearance/ThemeSelector';
import UIPreferences from './appearance/UIPreferences';
import DashboardItemsSelector from './appearance/DashboardItemsSelector';

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

interface AppearanceSettingsProps {
  theme: 'light' | 'dark' | 'system';
  handleThemeChange: (value: 'light' | 'dark' | 'system') => void;
  dashboardItems: DashboardItems;
  onDashboardItemsChange: (items: Partial<DashboardItems>) => void;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  theme,
  handleThemeChange,
  dashboardItems,
  onDashboardItemsChange
}) => {
  
  const handleDashboardItemChange = (key: keyof DashboardItems, checked: boolean) => {
    onDashboardItemsChange({
      [key]: checked
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-lg font-medium mb-4">Theme</h3>
        <div className="space-y-6">
          <ThemeSelector theme={theme} handleThemeChange={handleThemeChange} />
          
          <Separator />
          
          <UIPreferences />
        </div>
      </div>
      
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-lg font-medium mb-4">Customize Dashboard</h3>
        <p className="text-sm text-muted-foreground mb-4">Choose which components to display on your dashboard</p>
        
        <DashboardItemsSelector 
          dashboardItems={dashboardItems}
          onDashboardItemChange={handleDashboardItemChange}
        />
      </div>
    </div>
  );
};

export default AppearanceSettings;
