
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight, AlertCircle } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface Period {
  startDate: Date;
  endDate: Date;
}

interface CyclePredictionsProps {
  periods: Period[];
  cycleLength: number;
}

const CyclePredictions: React.FC<CyclePredictionsProps> = ({ periods, cycleLength }) => {
  // Calculate prediction based on previous periods
  const calculateNextPeriod = () => {
    if (periods.length === 0) {
      return {
        startDate: addDays(new Date(), 14), // Default future date if no periods
        endDate: addDays(new Date(), 19) // Default 5-day period
      };
    }

    // Sort periods by start date in descending order
    const sortedPeriods = [...periods].sort((a, b) => 
      b.startDate.getTime() - a.startDate.getTime()
    );
    
    const lastPeriod = sortedPeriods[0];
    const nextStartDate = addDays(lastPeriod.startDate, cycleLength);
    
    // Calculate average period duration
    const avgPeriodDuration = periods.reduce((sum, period) => {
      const duration = Math.ceil((period.endDate.getTime() - period.startDate.getTime()) / (1000 * 60 * 60 * 24));
      return sum + duration;
    }, 0) / periods.length;
    
    const periodDuration = isNaN(avgPeriodDuration) ? 5 : Math.round(avgPeriodDuration);
    const nextEndDate = addDays(nextStartDate, periodDuration - 1);
    
    return { startDate: nextStartDate, endDate: nextEndDate };
  };

  const nextPeriod = calculateNextPeriod();
  const startDate = format(nextPeriod.startDate, 'MMM d, yyyy');
  const endDate = format(nextPeriod.endDate, 'MMM d, yyyy');
  
  // Calculate fertility window (typically 12-16 days before next period)
  const fertileStart = addDays(nextPeriod.startDate, -16);
  const fertileEnd = addDays(nextPeriod.startDate, -12);
  const fertilityWindow = `${format(fertileStart, 'MMM d')} - ${format(fertileEnd, 'MMM d')}`;
  
  // Calculate ovulation day (typically 14 days before next period)
  const ovulationDay = addDays(nextPeriod.startDate, -14);
  const ovulationDate = format(ovulationDay, 'MMM d, yyyy');

  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-pink-500" />
          Cycle Predictions
        </CardTitle>
        <CardDescription>
          Based on your previous cycle data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="font-semibold text-pink-800 mb-2">Next Period</h3>
            <div className="flex items-center justify-between">
              <span className="text-pink-700">{startDate}</span>
              <ArrowRight className="h-4 w-4 text-pink-400" />
              <span className="text-pink-700">{endDate}</span>
            </div>
            {periods.length < 3 && (
              <div className="mt-2 text-xs flex items-center text-amber-600">
                <AlertCircle className="h-3 w-3 mr-1" />
                More accurate after 3+ tracked cycles
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Fertility Window</h3>
              <p className="text-purple-700">{fertilityWindow}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Estimated Ovulation</h3>
              <p className="text-blue-700">{ovulationDate}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CyclePredictions;
