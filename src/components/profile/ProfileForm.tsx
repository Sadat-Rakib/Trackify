
import React, { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface UserData {
  name: string;
  email: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
  goals?: string;
  progressManagement?: string;
}

interface ProfileFormProps {
  userData: UserData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextareaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelectChange: (name: keyof UserData, value: string) => void;
}

const ProfileForm = ({ 
  userData, 
  handleInputChange, 
  handleTextareaChange = () => {}, 
  handleSelectChange 
}: ProfileFormProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            min="1"
            value={userData.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={userData.gender}
            onValueChange={(value) => handleSelectChange('gender', value)}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="goals">Health and Wellness Goals</Label>
          <Textarea
            id="goals"
            name="goals"
            placeholder="e.g., Improve sleep, increase energy levels, manage stress"
            onChange={handleTextareaChange}
            value={userData.goals || ''}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="progress-management">How Will You Manage Your Progress?</Label>
          <Textarea
            id="progress-management"
            name="progressManagement"
            placeholder="e.g., Regular check-ins, tracking metrics, adjusting goals" 
            onChange={handleTextareaChange}
            value={userData.progressManagement || ''}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
