
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays, differenceInDays, isSameDay, isWithinInterval } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
interface CycleCalendarProps {
  periods: { startDate: Date; endDate: Date }[];
  nextPeriod: { startDate: Date; endDate: Date } | null;
  symptoms: { date: Date; type: string; severity: number }[];
  date: Date;
  setDate: (date: Date) => void;
}

const CycleCalendar = ({ periods, nextPeriod, symptoms, date, setDate }: CycleCalendarProps) => {
  const [notes, setNotes] = useState<string>('');

  // For calendar date highlight
  const isDayInPeriod = (day: Date) => {
    return periods.some(period => 
      isWithinInterval(day, { start: period.startDate, end: period.endDate })
    );
  };
  
  const isDayPredictedPeriod = (day: Date) => {
    if (!nextPeriod) return false;
    return isWithinInterval(day, { start: nextPeriod.startDate, end: nextPeriod.endDate });
  };
  
  const hasSymptomsOnDay = (day: Date) => {
    return symptoms.some(symptom => isSameDay(symptom.date, day));
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleSaveNotes = () => {
    // Here you would typically save the notes to your data store
    console.log(`Saving notes for ${format(date, 'yyyy-MM-dd')}: ${notes}`);
    // For now, we'll just clear the notes after "saving"
    setNotes('');
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        modifiers={{
          period: (day) => isDayInPeriod(day),
          nextPeriod: (day) => isDayPredictedPeriod(day),
          withSymptoms: (day) => hasSymptomsOnDay(day)
        }}
        modifiersStyles={{
          period: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
          nextPeriod: { backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px dashed rgb(239, 68, 68)' },
          withSymptoms: { border: '2px solid rgba(124, 58, 237, 0.6)' }
        }}
      />
      <div>
        <h3 className="text-lg font-semibold">Notes for {format(date, 'MMMM d, yyyy')}</h3>
        <Textarea value={notes} onChange={handleNotesChange} placeholder="Add your notes here..." className="mt-2" />
        <Button onClick={handleSaveNotes} className="mt-2">
          Save Notes
        </Button>
      </div>
    </div>
  );
};

export default CycleCalendar;
