
import React from 'react';
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

interface PreferencesFormProps {
  userData: UserData;
}

const PreferencesForm = ({ userData }: PreferencesFormProps) => {
  return (
    <div className="pt-4">
      <p className="text-muted-foreground mb-4">
        Customize which trackers are shown in your dashboard based on your needs.
      </p>
      
      {(userData.gender === 'female' || userData.gender === 'non-binary') && (
        <div className="flex items-center space-x-4 rounded-lg border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Menstrual Cycle Tracking
            </p>
            <p className="text-sm text-muted-foreground">
              Enable menstrual cycle tracking features
            </p>
          </div>
          <div>
            <Select
              defaultValue="enabled"
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enabled">Enabled</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesForm;
