
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SettingsLayout from '@/components/settings/SettingsLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import DataSettings from '@/components/settings/DataSettings';
import UserProfileSettings from '@/components/settings/UserProfileSettings';
import AboutUsSettings from '@/components/settings/AboutUsSettings';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

// Define the dashboard items type for better type safety
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
  // New actionable card settings
  healthScore: boolean;
  sleepQuality: boolean;
  workout: boolean;
  calories: boolean;
  moodTracker: boolean;
  activeGoals: boolean;
  journalEntry: boolean;
  habitsTracker: boolean;
}

const SettingsPage = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [dashboardItems, setDashboardItems] = useState<DashboardItems>({
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
    // New actionable card defaults
    healthScore: true,
    sleepQuality: true,
    workout: true,
    calories: false,
    moodTracker: false,
    activeGoals: true,
    journalEntry: false,
    habitsTracker: false
  });
  const isMobile = useIsMobile();

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme as 'light' | 'dark' | 'system');
    
    const savedDashboardItems = localStorage.getItem('dashboardItems');
    if (savedDashboardItems) {
      try {
        const parsedItems = JSON.parse(savedDashboardItems);
        // Ensure all required properties exist in the loaded object
        setDashboardItems(prev => ({
          ...prev,
          ...parsedItems
        }));
      } catch (error) {
        console.error('Failed to parse dashboard items from localStorage', error);
      }
    }
  }, []);

  const handleThemeChange = (value: 'light' | 'dark' | 'system') => {
    setTheme(value);
    localStorage.setItem('theme', value);
    document.documentElement.setAttribute('data-theme', value);
    toast.success(`Theme changed to ${value} mode`);
  };

  const handleDashboardItemsChange = (items: Partial<DashboardItems>) => {
    // Ensure we're preserving all properties by merging with current state
    setDashboardItems(prev => {
      const updatedItems = { ...prev, ...items };
      localStorage.setItem('dashboardItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
    toast.success('Dashboard settings updated');
  };

  const handleExportData = () => {
    // Create a dummy data object to represent user data
    const userData = {
      profile: {
        name: "Umang Gupta",
        email: "umang@example.com",
        goals: ["Build muscle", "Improve fitness"]
      },
      nutrition: {
        meals: [
          { date: "2023-06-01", name: "Breakfast", calories: 450 },
          { date: "2023-06-01", name: "Lunch", calories: 700 }
        ]
      },
      workouts: [
        { date: "2023-06-01", type: "Cardio", duration: 30 },
        { date: "2023-06-02", type: "Strength", duration: 45 }
      ]
    };

    // Convert to JSON and create a download link
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = "trackify-data.json";
    
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    
    toast.success("Data exported successfully");
  };

  const handleImportData = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      
      if (!file) {
        toast.error("No file selected");
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          JSON.parse(content); // Validate JSON format
          
          // In a real app, this would process the imported data
          // and update the application state
          
          toast.success("Data imported successfully");
        } catch (error) {
          toast.error("Invalid data format");
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  return (
    <MainLayout>
      <SettingsLayout userName="Umang">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className={`grid ${isMobile ? 'grid-cols-5 overflow-x-auto pb-1' : 'grid-cols-5'} w-full`}>
            <TabsTrigger value="profile" className="text-xs md:text-sm">Profile</TabsTrigger>
            <TabsTrigger value="appearance" className="text-xs md:text-sm">Theme</TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs md:text-sm">Alerts</TabsTrigger>
            <TabsTrigger value="data" className="text-xs md:text-sm">Data</TabsTrigger>
            <TabsTrigger value="about" className="text-xs md:text-sm">About</TabsTrigger>
          </TabsList>
          
          <ScrollArea className={isMobile ? "h-[calc(100vh-15rem)]" : ""}>
            <div className="pr-4">
              <TabsContent value="profile" className="space-y-4 mt-0">
                <UserProfileSettings />
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-4 mt-0">
                <AppearanceSettings 
                  theme={theme}
                  handleThemeChange={handleThemeChange}
                  dashboardItems={dashboardItems}
                  onDashboardItemsChange={handleDashboardItemsChange}
                />
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4 mt-0">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="data" className="space-y-4 mt-0">
                <DataSettings 
                  handleExportData={handleExportData}
                  handleImportData={handleImportData}
                />
              </TabsContent>
              
              <TabsContent value="about" className="space-y-4 mt-0">
                <AboutUsSettings />
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </SettingsLayout>
    </MainLayout>
  );
};

export default SettingsPage;
