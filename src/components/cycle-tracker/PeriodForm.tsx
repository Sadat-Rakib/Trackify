
import React from 'react';
import { format, addDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Droplet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';

interface PeriodFormProps {
  periodStart: Date | undefined;
  setPeriodStart: (date: Date | undefined) => void;
  periodLength: number;
  setPeriodLength: (length: number) => void;
  cycleLength: number;
  setCycleLength: (length: number) => void;
  handleAddPeriod: () => void;
}

const PeriodForm = ({
  periodStart,
  setPeriodStart,
  periodLength,
  setPeriodLength,
  cycleLength,
  setCycleLength,
  handleAddPeriod
}: PeriodFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Start Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !periodStart && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {periodStart ? format(periodStart, 'PPP') : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={periodStart}
              onSelect={setPeriodStart}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Period Length (days)</label>
        <Select value={String(periodLength)} onValueChange={(val) => setPeriodLength(Number(val))}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
              <SelectItem key={i} value={String(i)}>{i} days</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Cycle Length (days)</label>
        <Select value={String(cycleLength)} onValueChange={(val) => setCycleLength(Number(val))}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {[21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].map((i) => (
              <SelectItem key={i} value={String(i)}>{i} days</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button className="w-full" onClick={handleAddPeriod}>
        <Droplet className="mr-2 h-4 w-4" /> Record Period
      </Button>
    </div>
  );
};

export default PeriodForm;
