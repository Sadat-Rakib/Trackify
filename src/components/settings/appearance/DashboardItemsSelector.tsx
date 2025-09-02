
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from '@/components/ui/checkbox';

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

interface DashboardItemsSelectorProps {
  dashboardItems: DashboardItems;
  onDashboardItemChange: (key: keyof DashboardItems, checked: boolean) => void;
}

const DashboardItemsSelector: React.FC<DashboardItemsSelectorProps> = ({
  dashboardItems,
  onDashboardItemChange
}) => {
  return (
    <Tabs defaultValue="trackers" className="w-full">
      <TabsList className="w-full grid grid-cols-2 mb-4">
        <TabsTrigger value="trackers">Trackers</TabsTrigger>
        <TabsTrigger value="insights">Actionable Insights</TabsTrigger>
      </TabsList>
      
      <ScrollArea className="h-[300px] pr-4">
        <TabsContent value="trackers" className="mt-0">
          <div className="space-y-3">
            <CheckboxItem 
              id="water" 
              label="Show Water Tracker"
              checked={dashboardItems.water}
              onChange={(checked) => onDashboardItemChange('water', checked)}
            />
            
            <CheckboxItem 
              id="nutrition" 
              label="Show Nutrition Tracker"
              checked={dashboardItems.nutrition}
              onChange={(checked) => onDashboardItemChange('nutrition', checked)}
            />
            
            <CheckboxItem 
              id="exercise" 
              label="Show Exercise Tracker"
              checked={dashboardItems.exercise}
              onChange={(checked) => onDashboardItemChange('exercise', checked)}
            />
            
            <CheckboxItem 
              id="mood" 
              label="Show Mood Tracker"
              checked={dashboardItems.mood}
              onChange={(checked) => onDashboardItemChange('mood', checked)}
            />
            
            <CheckboxItem 
              id="goals" 
              label="Show Goals Tracker"
              checked={dashboardItems.goals}
              onChange={(checked) => onDashboardItemChange('goals', checked)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-0">
          <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
          <div className="space-y-3 mb-5">
            <CheckboxItem 
              id="quick-water" 
              label="Water Quick Action"
              checked={dashboardItems.quickWater}
              onChange={(checked) => onDashboardItemChange('quickWater', checked)}
            />
            
            <CheckboxItem 
              id="quick-exercise" 
              label="Exercise Quick Action"
              checked={dashboardItems.quickExercise}
              onChange={(checked) => onDashboardItemChange('quickExercise', checked)}
            />
            
            <CheckboxItem 
              id="quick-nutrition" 
              label="Nutrition Quick Action"
              checked={dashboardItems.quickNutrition}
              onChange={(checked) => onDashboardItemChange('quickNutrition', checked)}
            />
            
            <CheckboxItem 
              id="quick-goals" 
              label="Goals Quick Action"
              checked={dashboardItems.quickGoals}
              onChange={(checked) => onDashboardItemChange('quickGoals', checked)}
            />
            
            <CheckboxItem 
              id="quick-sleep" 
              label="Sleep Quick Action"
              checked={dashboardItems.quickSleep}
              onChange={(checked) => onDashboardItemChange('quickSleep', checked)}
            />
            
            <CheckboxItem 
              id="quick-budget" 
              label="Budget Quick Action"
              checked={dashboardItems.quickBudget}
              onChange={(checked) => onDashboardItemChange('quickBudget', checked)}
            />
            
            <CheckboxItem 
              id="quick-mood" 
              label="Mood Quick Action"
              checked={dashboardItems.quickMood}
              onChange={(checked) => onDashboardItemChange('quickMood', checked)}
            />
            
            <CheckboxItem 
              id="quick-cycle" 
              label="Cycle Tracker Quick Action"
              checked={dashboardItems.quickCycle}
              onChange={(checked) => onDashboardItemChange('quickCycle', checked)}
            />
          </div>
          
          <h4 className="text-sm font-medium mb-3">Insight Cards</h4>
          <div className="space-y-3">
            <CheckboxItem 
              id="health-score" 
              label="Health Score Card"
              checked={dashboardItems.healthScore}
              onChange={(checked) => onDashboardItemChange('healthScore', checked)}
            />
            
            <CheckboxItem 
              id="sleep-quality" 
              label="Sleep Quality Card"
              checked={dashboardItems.sleepQuality}
              onChange={(checked) => onDashboardItemChange('sleepQuality', checked)}
            />
            
            <CheckboxItem 
              id="workout" 
              label="Workout Card"
              checked={dashboardItems.workout}
              onChange={(checked) => onDashboardItemChange('workout', checked)}
            />
            
            <CheckboxItem 
              id="calories" 
              label="Calories Card"
              checked={dashboardItems.calories}
              onChange={(checked) => onDashboardItemChange('calories', checked)}
            />
            
            <CheckboxItem 
              id="mood-tracker" 
              label="Mood Tracker Card"
              checked={dashboardItems.moodTracker}
              onChange={(checked) => onDashboardItemChange('moodTracker', checked)}
            />
            
            <CheckboxItem 
              id="active-goals" 
              label="Active Goals Card"
              checked={dashboardItems.activeGoals}
              onChange={(checked) => onDashboardItemChange('activeGoals', checked)}
            />
            
            <CheckboxItem 
              id="journal-entry" 
              label="Journal Entry Card"
              checked={dashboardItems.journalEntry}
              onChange={(checked) => onDashboardItemChange('journalEntry', checked)}
            />
            
            <CheckboxItem 
              id="habits-tracker" 
              label="Habits Tracker Card"
              checked={dashboardItems.habitsTracker}
              onChange={(checked) => onDashboardItemChange('habitsTracker', checked)}
            />
          </div>
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
};

// Helper component for consistent checkbox items
const CheckboxItem = ({ 
  id, 
  label, 
  checked, 
  onChange 
}: { 
  id: string; 
  label: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={(checked) => onChange(!!checked)} 
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export default DashboardItemsSelector;
