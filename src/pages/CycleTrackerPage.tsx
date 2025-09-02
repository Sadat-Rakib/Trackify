import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CycleTrackerHeader from '@/components/cycle-tracker/CycleTrackerHeader';
import CycleTrackerMainView from '@/components/cycle-tracker/CycleTrackerMainView';
import CycleNotAvailableView from '@/components/cycle-tracker/CycleNotAvailableView';
import { addDays, subMonths, isWithinInterval, format, parseISO } from 'date-fns';
import { toast } from 'sonner';
import { SymptomDetails } from '@/components/cycle-tracker/SymptomDetailsTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, FileText, Heart, LineChart, PieChart } from 'lucide-react';
import CycleInsights from '@/components/cycle-tracker/CycleInsights';

interface Period {
  startDate: Date;
  endDate: Date;
}

interface Symptom {
  date: Date;
  type: string;
  severity: number;
}

const CycleTrackerPage = () => {
  const [gender, setGender] = useState<string>('female');
  const [date, setDate] = useState<Date>(new Date());
  const [showPermissionAlert, setShowPermissionAlert] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  
  const [periods, setPeriods] = useState<Period[]>([]);
  const [periodStart, setPeriodStart] = useState<Date | undefined>(new Date());
  const [periodLength, setPeriodLength] = useState(5);
  const [cycleLength, setCycleLength] = useState(28);
  
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [symptomType, setSymptomType] = useState('cramps');
  const [symptomSeverity, setSymptomSeverity] = useState(3);
  const [symptomDetails, setSymptomDetails] = useState<SymptomDetails>({
    type: 'cramps',
    severity: 3
  });
  
  const [nextPeriod, setNextPeriod] = useState<Period | null>(null);
  const [activeTab, setActiveTab] = useState('calendar');
  
  useEffect(() => {
    const savedGender = localStorage.getItem('userGender');
    if (savedGender) {
      setGender(savedGender);
    }
    
    const savedPeriods = localStorage.getItem('periods');
    if (savedPeriods) {
      try {
        const parsedPeriods = JSON.parse(savedPeriods, (key, value) => {
          if (key === 'startDate' || key === 'endDate') {
            return parseISO(value);
          }
          return value;
        });
        setPeriods(parsedPeriods);
      } catch (error) {
        console.error('Failed to parse saved periods:', error);
      }
    }
    
    const savedSymptoms = localStorage.getItem('symptoms');
    if (savedSymptoms) {
      try {
        const parsedSymptoms = JSON.parse(savedSymptoms, (key, value) => {
          if (key === 'date') {
            return parseISO(value);
          }
          return value;
        });
        setSymptoms(parsedSymptoms);
      } catch (error) {
        console.error('Failed to parse saved symptoms:', error);
      }
    }
    
    const savedCycleLength = localStorage.getItem('cycleLength');
    if (savedCycleLength) {
      setCycleLength(Number(savedCycleLength));
    }
  }, []);
  
  useEffect(() => {
    calculateNextPeriod();
    if (periods.length > 0) {
      localStorage.setItem('periods', JSON.stringify(periods, (key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }));
    }
    
    localStorage.setItem('cycleLength', String(cycleLength));
  }, [periods, cycleLength]);
  
  useEffect(() => {
    if (symptoms.length > 0) {
      localStorage.setItem('symptoms', JSON.stringify(symptoms, (key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }));
    }
  }, [symptoms]);
  
  const calculateNextPeriod = () => {
    if (periods.length === 0) {
      setNextPeriod(null);
      return;
    }
    
    const sortedPeriods = [...periods].sort((a, b) => 
      b.startDate.getTime() - a.startDate.getTime()
    );
    
    const lastPeriod = sortedPeriods[0];
    const nextStartDate = addDays(lastPeriod.startDate, cycleLength);
    const nextEndDate = addDays(nextStartDate, periodLength - 1);
    
    setNextPeriod({
      startDate: nextStartDate,
      endDate: nextEndDate
    });
  };
  
  const handleAddPeriod = () => {
    if (!periodStart) {
      toast.error('Please select a period start date');
      return;
    }
    
    const endDate = addDays(periodStart, periodLength - 1);
    
    const newPeriod = {
      startDate: periodStart,
      endDate: endDate
    };
    
    const hasOverlap = periods.some(period => 
      (periodStart >= period.startDate && periodStart <= period.endDate) ||
      (endDate >= period.startDate && endDate <= period.endDate)
    );
    
    if (hasOverlap) {
      toast.error('This period overlaps with an existing one');
      return;
    }
    
    const updatedPeriods = [...periods, newPeriod];
    setPeriods(updatedPeriods);
    calculateNextPeriod();
    
    setStreak(prev => prev + 1);
    
    toast.success('Period recorded successfully');
  };
  
  const handleAddSymptom = () => {
    const newSymptom: Symptom = {
      date: date,
      type: symptomDetails.type,
      severity: symptomDetails.severity
    };
    
    const duplicateSymptom = symptoms.find(
      s => format(s.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && 
          s.type === symptomType
    );
    
    if (duplicateSymptom) {
      const updatedSymptoms = symptoms.map(s => 
        format(s.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && s.type === symptomType
          ? newSymptom
          : s
      );
      setSymptoms(updatedSymptoms);
      toast.success('Symptom updated successfully');
    } else {
      setSymptoms([...symptoms, newSymptom]);
      toast.success('Symptom recorded successfully');
    }
  };
  
  if (gender.toLowerCase() !== 'female') {
    return (
      <MainLayout>
        <CycleNotAvailableView />
      </MainLayout>
    );
  }
  
  const lastPeriod = periods.length > 0 ? periods[periods.length - 1] : null;
  
  return (
    <MainLayout>
      <CycleTrackerHeader
        lastPeriod={lastPeriod}
        nextPeriod={nextPeriod}
        cycleLength={cycleLength}
        streak={streak}
        showPermissionAlert={showPermissionAlert}
        setShowPermissionAlert={setShowPermissionAlert}
      />
      
      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Calendar
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" /> Insights
            </TabsTrigger>
            <TabsTrigger value="log" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Log
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <CycleTrackerMainView
              periods={periods}
              nextPeriod={nextPeriod}
              symptoms={symptoms}
              date={date}
              setDate={setDate}
              periodStart={periodStart}
              setPeriodStart={setPeriodStart}
              periodLength={periodLength}
              setPeriodLength={setPeriodLength}
              cycleLength={cycleLength}
              setCycleLength={setCycleLength}
              symptomType={symptomType}
              setSymptomType={setSymptomType}
              symptomSeverity={symptomSeverity}
              setSymptomSeverity={setSymptomSeverity}
              symptomDetails={symptomDetails}
              setSymptomDetails={setSymptomDetails}
              handleAddPeriod={handleAddPeriod}
              handleAddSymptom={handleAddSymptom}
            />
          </TabsContent>
          
          <TabsContent value="insights">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-500" />
                    Cycle Analysis
                  </CardTitle>
                  <CardDescription>
                    Insights based on your historical cycle data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {nextPeriod && (
                    <CycleInsights 
                      nextPeriod={nextPeriod} 
                      cycleLength={cycleLength} 
                      periodLength={periodLength}
                      periods={periods} 
                    />
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Symptom Patterns
                  </CardTitle>
                  <CardDescription>
                    Trends in your recorded symptoms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {symptoms.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold">Most Common Symptoms</h3>
                      <div className="space-y-2">
                        {['cramps', 'headache', 'bloating', 'fatigue', 'mood_swings']
                          .map(type => ({
                            type,
                            count: symptoms.filter(s => s.type === type).length,
                            avgSeverity: symptoms.filter(s => s.type === type).reduce((sum, s) => sum + s.severity, 0) / 
                                         symptoms.filter(s => s.type === type).length || 0
                          }))
                          .filter(s => s.count > 0)
                          .sort((a, b) => b.count - a.count)
                          .slice(0, 3)
                          .map(symptom => (
                            <div key={symptom.type} className="flex justify-between items-center">
                              <div>
                                <span className="font-medium capitalize">{symptom.type.replace('_', ' ')}</span>
                                <div className="text-xs text-muted-foreground">
                                  Avg. severity: {symptom.avgSeverity.toFixed(1)}/5
                                </div>
                              </div>
                              <div className="text-sm">{symptom.count} occurrences</div>
                            </div>
                          ))
                        }
                      </div>
                      
                      <h3 className="text-sm font-semibold pt-2">Symptom Timing</h3>
                      <p className="text-sm text-muted-foreground">
                        Your symptoms typically begin {lastPeriod ? '2 days before' : 'around'} your period and last for about {lastPeriod ? '4' : '3-5'} days.
                      </p>
                      
                      <div className="pt-2">
                        <h3 className="text-sm font-semibold">Recommendations</h3>
                        <ul className="text-sm list-disc pl-5 space-y-1 mt-1">
                          <li>Consider taking pain relievers 1-2 days before your period starts</li>
                          <li>Stay hydrated and avoid caffeine during your period</li>
                          <li>Light exercise may help reduce cramps and bloating</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-10 w-10 mx-auto text-muted-foreground/50" />
                      <h3 className="mt-4 font-medium">No symptom data yet</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Record symptoms to see patterns and insights
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="log">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-rose-500" />
                    Period History
                  </CardTitle>
                  <CardDescription>
                    Your recorded menstrual periods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {periods.length > 0 ? (
                    <div className="space-y-3">
                      {[...periods]
                        .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
                        .map((period, index) => (
                          <div key={index} className="flex justify-between items-center border-b pb-2">
                            <div>
                              <div className="font-medium">
                                {format(period.startDate, 'MMM d')} - {format(period.endDate, 'MMM d, yyyy')}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Duration: {Math.round((period.endDate.getTime() - period.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {index === 0 ? 'Latest' : `${index + 1} periods ago`}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-10 w-10 mx-auto text-muted-foreground/50" />
                      <h3 className="mt-4 font-medium">No periods recorded yet</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Add your period dates to track your cycle
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-violet-500" />
                    Symptom Log
                  </CardTitle>
                  <CardDescription>
                    Your recorded symptoms over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {symptoms.length > 0 ? (
                    <div className="space-y-3">
                      {[...symptoms]
                        .sort((a, b) => b.date.getTime() - a.date.getTime())
                        .slice(0, 8)
                        .map((symptom, index) => (
                          <div key={index} className="flex justify-between items-center border-b pb-2">
                            <div>
                              <div className="font-medium capitalize">
                                {symptom.type.replace('_', ' ')}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {format(symptom.date, 'MMM d, yyyy')}
                              </div>
                            </div>
                            <div className="px-2 py-1 rounded bg-purple-100 text-purple-800 text-xs font-medium">
                              Severity: {symptom.severity}/5
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-10 w-10 mx-auto text-muted-foreground/50" />
                      <h3 className="mt-4 font-medium">No symptoms logged yet</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Log symptoms to track patterns throughout your cycle
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CycleTrackerPage;
