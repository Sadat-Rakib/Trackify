
import React from 'react';
import { Heart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CycleNotAvailableView = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            Menstrual Cycle Tracker
          </CardTitle>
          <CardDescription>
            This feature is available for female and non-binary users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-6">
            To access the Menstrual Cycle Tracker, please update your gender in the settings.
          </p>
          <Button 
            className="w-full" 
            onClick={() => window.location.href = '/settings'}
          >
            Go to Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CycleNotAvailableView;
