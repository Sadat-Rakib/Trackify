
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import UserProfileCard from '@/components/profile/UserProfileCard';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Save, Users, Shield, FileText } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
}

const UserProfileSettings = () => {
  const [userData, setUserData] = useState<UserData>({
    name: 'Guest',
    email: 'guestEmail@example.com',
    age: '20',
    gender: 'male',
    height: '175',
    weight: '68',
    activityLevel: 'moderate'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  
  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        setUserData(parsedData);
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
      }
    }
    
    const lastSavedTime = localStorage.getItem('lastProfileSave');
    if (lastSavedTime) {
      setLastSaved(lastSavedTime);
    }
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Simulate a delay for better UX
    setTimeout(() => {
      // Store user data in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('userGender', userData.gender);
      
      // Store last saved timestamp
      const now = new Date().toISOString();
      localStorage.setItem('lastProfileSave', now);
      setLastSaved(now);
      
      // Publish an event that other components can listen to
      const event = new CustomEvent('user-profile-updated', { 
        detail: { userData } 
      });
      document.dispatchEvent(event);
      
      setIsSaving(false);
      toast.success('Profile settings saved successfully', {
        description: "Your profile information has been updated."
      });
    }, 800);
  };
  
  const calculateBMI = () => {
    const heightInMeters = parseFloat(userData.height) / 100;
    const weightInKg = parseFloat(userData.weight);
    
    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters === 0) {
      return 'N/A';
    }
    
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };
  
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { label: 'Normal weight', color: 'text-green-500' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500' };
    return { label: 'Obesity', color: 'text-red-500' };
  };
  
  const bmi = calculateBMI();
  const bmiCategory = bmi !== 'N/A' ? getBMICategory(parseFloat(bmi)) : { label: 'N/A', color: 'text-gray-500' };
  
  const formatLastSaved = () => {
    if (!lastSaved) return 'Never';
    
    const date = new Date(lastSaved);
    return date.toLocaleString();
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <span>Personal Information</span>
          </CardTitle>
          <CardDescription>
            Manage your account details and personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <UserProfileCard
            userData={userData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleSaveProfile={handleSaveProfile}
            isSaving={isSaving}
          />
          
          {lastSaved && (
            <div className="text-xs text-muted-foreground text-right">
              Last saved: {formatLastSaved()}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span>Health Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">BMI (Body Mass Index)</span>
                <span className="font-medium">{bmi}</span>
              </div>
              <div className="text-sm text-right">
                <span className={bmiCategory.color}>{bmiCategory.label}</span>
              </div>
              
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${bmi !== 'N/A' ? 'bg-primary' : 'bg-gray-300'}`}
                  style={{ 
                    width: bmi !== 'N/A' ? `${Math.min(parseFloat(bmi) / 40 * 100, 100)}%` : '0%' 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground mt-4">
              <p>
                BMI is a measurement of a person's weight with respect to their height. It's a good general indicator of healthy weight, although it doesn't account for factors like muscle mass.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Account Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">Your data is stored locally on your device.</p>
            <p className="text-sm text-muted-foreground">
              All your tracking data and personal information is stored in your browser's local storage and is not transmitted to any servers.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => toast.info("Export feature coming soon")}>
              Export Your Data
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>Connected Services</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No connected services yet. Future updates will allow you to connect with fitness devices and apps.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileSettings;
