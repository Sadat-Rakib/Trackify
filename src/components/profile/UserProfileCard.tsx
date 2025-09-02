
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileForm from '@/components/profile/ProfileForm';
import PhysicalDetailsForm from '@/components/profile/PhysicalDetailsForm';
import PreferencesForm from '@/components/profile/PreferencesForm';

interface UserData {
  name: string;
  email: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
}

interface UserProfileCardProps {
  userData: UserData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: keyof UserData, value: string) => void;
  handleSaveProfile: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  userData,
  handleInputChange,
  handleSelectChange,
  handleSaveProfile
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal details and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProfileForm 
          userData={userData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
        
        <Tabs defaultValue="physical">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="physical">Physical Details</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="physical" className="space-y-4">
            <PhysicalDetailsForm 
              userData={userData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
            />
          </TabsContent>
          <TabsContent value="preferences" className="space-y-4">
            <PreferencesForm userData={userData} />
          </TabsContent>
        </Tabs>
        
        <Button onClick={handleSaveProfile} className="mt-4">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
