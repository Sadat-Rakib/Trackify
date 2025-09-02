
import React from 'react';
import { format, differenceInDays } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface Period {
  startDate: Date;
  endDate: Date;
}

interface CycleInsightsProps {
  nextPeriod: { startDate: Date; endDate: Date };
  cycleLength: number;
  periodLength: number;
  periods?: Period[]; // Add periods as an optional prop
}

const CycleInsights = ({ nextPeriod, cycleLength, periodLength, periods = [] }: CycleInsightsProps) => {
  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-500" />
          Cycle Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <h3 className="font-medium mb-2">Next Period Prediction</h3>
            <p>Your next period is predicted to start on <strong>{format(nextPeriod.startDate, 'MMMM d, yyyy')}</strong> and last until <strong>{format(nextPeriod.endDate, 'MMMM d, yyyy')}</strong>.</p>
            <p className="text-sm text-muted-foreground mt-1">
              That's in {differenceInDays(nextPeriod.startDate, new Date())} days.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Cycle Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md bg-pink-50">
                <span className="text-sm text-muted-foreground">Average Cycle Length</span>
                <p className="text-2xl font-bold">{cycleLength} days</p>
              </div>
              <div className="p-4 border rounded-md bg-purple-50">
                <span className="text-sm text-muted-foreground">Average Period Length</span>
                <p className="text-2xl font-bold">{periodLength} days</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-medium mb-2 text-blue-800 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Health Tip
            </h3>
            <p className="text-sm text-blue-700">
              Remember to stay hydrated during your period. Drinking plenty of water can help reduce bloating and alleviate cramps.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CycleInsights;
