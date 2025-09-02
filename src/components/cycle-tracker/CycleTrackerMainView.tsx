
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import CycleCalendar from '@/components/cycle-tracker/CycleCalendar';
import { useIsMobile } from '@/hooks/use-mobile';
import PeriodForm from '@/components/cycle-tracker/PeriodForm';
import SymptomForm from '@/components/cycle-tracker/SymptomForm';
import { Droplet, AlertCircle } from 'lucide-react';
import CyclePredictions from '@/components/cycle-tracker/CyclePredictions';
import { SymptomDetails } from './SymptomDetailsTypes';

interface Period {
  startDate: Date;
  endDate: Date;
}

interface Symptom {
  date: Date;
  type: string;
  severity: number;
}

interface CycleTrackerMainViewProps {
  periods: Period[];
  nextPeriod: Period | null;
  symptoms: Symptom[];
  date: Date;
  setDate: (date: Date) => void;
  periodStart: Date | undefined;
  setPeriodStart: (date: Date | undefined) => void;
  periodLength: number;
  setPeriodLength: (length: number) => void;
  cycleLength: number;
  setCycleLength: (length: number) => void;
  symptomType: string;
  setSymptomType: (type: string) => void;
  symptomSeverity: number;
  setSymptomSeverity: (severity: number) => void;
  symptomDetails: SymptomDetails;
  setSymptomDetails: (details: SymptomDetails) => void;
  handleAddPeriod: () => void;
  handleAddSymptom: () => void;
}

const CycleTrackerMainView: React.FC<CycleTrackerMainViewProps> = ({
  periods,
  nextPeriod,
  symptoms,
  date,
  setDate,
  periodStart,
  setPeriodStart,
  periodLength,
  setPeriodLength,
  cycleLength,
  setCycleLength,
  symptomType,
  setSymptomType,
  symptomSeverity,
  setSymptomSeverity,
  symptomDetails,
  setSymptomDetails,
  handleAddPeriod,
  handleAddSymptom
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-pink-500" />
            Cycle Calendar
          </CardTitle>
          <CardDescription>
            Track your menstrual cycle and predict upcoming periods
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-0">
          <CycleCalendar 
            periods={periods}
            nextPeriod={nextPeriod}
            symptoms={symptoms}
            date={date}
            setDate={setDate}
          />
        </CardContent>
        <CardFooter className="border-t pt-6 flex flex-col items-start gap-1">
          <div className="flex gap-2 items-center text-sm">
            <div className="w-4 h-4 bg-red-500/20 rounded"></div>
            <span>Period days</span>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <div className="w-4 h-4 border border-dashed border-red-500 rounded"></div>
            <span>Predicted period</span>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <div className="w-4 h-4 border-2 border-purple-500/60 rounded"></div>
            <span>Days with recorded symptoms</span>
          </div>
        </CardFooter>
      </Card>
      
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
        <CyclePredictions
          periods={periods}
          cycleLength={cycleLength}
        />
      </div>

      <div className={`space-y-6 ${isMobile ? "order-last" : ""}`}>
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-red-500" />
              Record New Period
            </CardTitle>
            <CardDescription>
              Track your menstrual cycle for better predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PeriodForm 
              periodStart={periodStart}
              setPeriodStart={setPeriodStart}
              periodLength={periodLength}
              setPeriodLength={setPeriodLength}
              cycleLength={cycleLength}
              setCycleLength={setCycleLength}
              handleAddPeriod={handleAddPeriod}
            />
          </CardContent>
        </Card>
        
        {!isMobile && (
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-purple-500" />
                Record Symptoms
              </CardTitle>
              <CardDescription>
                Track symptoms throughout your cycle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SymptomForm 
                symptomType={symptomType}
                setSymptomType={setSymptomType}
                symptomSeverity={symptomSeverity}
                setSymptomSeverity={setSymptomSeverity}
                symptomDetails={symptomDetails}
                setSymptomDetails={setSymptomDetails}
                handleAddSymptom={handleAddSymptom}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CycleTrackerMainView;
