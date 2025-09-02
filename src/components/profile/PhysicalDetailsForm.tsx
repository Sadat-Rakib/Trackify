
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserData {
  name: string;
  email: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
}

interface PhysicalDetailsFormProps {
  userData: UserData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: keyof UserData, value: string) => void;
}

const PhysicalDetailsForm = ({ userData, handleInputChange, handleSelectChange }: PhysicalDetailsFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="height">Height (cm)</Label>
        <Input
          id="height"
          name="height"
          type="number"
          value={userData.height}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          name="weight"
          type="number"
          value={userData.weight}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="activityLevel">Activity Level</Label>
        <Select
          value={userData.activityLevel}
          onValueChange={(value) => handleSelectChange('activityLevel', value)}
        >
          <SelectTrigger id="activityLevel">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentary">Sedentary</SelectItem>
            <SelectItem value="light">Lightly Active</SelectItem>
            <SelectItem value="moderate">Moderately Active</SelectItem>
            <SelectItem value="active">Very Active</SelectItem>
            <SelectItem value="extreme">Extremely Active</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PhysicalDetailsForm;
