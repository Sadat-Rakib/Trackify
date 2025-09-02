import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import JournalEntryForm from '@/components/journal/JournalEntryForm';
import JournalEntryList from '@/components/journal/JournalEntryList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon, // lucide-react icon
  CheckCircle2, 
  FileText, 
  PenLine, 
  Search, 
  Tag, 
  Filter, 
  X, 
  PlusCircle 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar'; // Fixed named import
import { cn } from '@/lib/utils';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood?: string;
  tags?: string[];
}

const JournalPage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [allTags, setAllTags] = useState<string[]>(['personal', 'work', 'ideas', 'health', 'fitness', 'food', 'travel']);
  const [allMoods, setAllMoods] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('write');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [calendarEntries, setCalendarEntries] = useState<Record<string, number>>({});
  const isMobile = useIsMobile();

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries, (key, value) => key === 'date' ? new Date(value) : value);
        setEntries(parsedEntries);

        // Extract tags
        const tagsFromEntries = parsedEntries.reduce((acc: string[], entry: JournalEntry) => {
          entry.tags?.forEach(tag => { if (!acc.includes(tag)) acc.push(tag); });
          return acc;
        }, []);
        if (tagsFromEntries.length > 0) setAllTags([...new Set([...allTags, ...tagsFromEntries])]);

        // Extract moods
        const moodsFromEntries = parsedEntries.reduce((acc: string[], entry: JournalEntry) => {
          if (entry.mood && !acc.includes(entry.mood)) acc.push(entry.mood);
          return acc;
        }, []);
        if (moodsFromEntries.length > 0) setAllMoods([...new Set(moodsFromEntries)]);

        // Calendar entries
        const calendarData: Record<string, number> = {};
        parsedEntries.forEach(entry => {
          const dateStr = format(new Date(entry.date), 'yyyy-MM-dd');
          calendarData[dateStr] = (calendarData[dateStr] || 0) + 1;
        });
        setCalendarEntries(calendarData);

        calculateDailyStreak(parsedEntries);
      } catch (error) {
        console.error('Failed to parse saved journal entries:', error);
      }
    }

    const lastPromptDate = localStorage.getItem('lastJournalPromptDate');
    if (!lastPromptDate || (new Date().getTime() - new Date(lastPromptDate).getTime()) > 3 * 24 * 60 * 60 * 1000 || entries.length === 0) {
      setShowPrompt(true);
      localStorage.setItem('lastJournalPromptDate', new Date().toISOString());
    }
  }, []);

  const calculateDailyStreak = (journalEntries: JournalEntry[]) => {
    if (!journalEntries.length) return setDailyStreak(0);

    const sortedEntries = [...journalEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const mostRecentDate = new Date(sortedEntries[0].date);
    const today = new Date();

    if (Math.floor((today.getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24)) > 1) return setDailyStreak(0);

    let streak = 1;
    let currentDate = mostRecentDate;
    const datesWithEntries = sortedEntries.reduce((acc: Record<string, boolean>, entry: JournalEntry) => {
      acc[new Date(entry.date).toDateString()] = true;
      return acc;
    }, {});

    for (let i = 1; i < 100; i++) {
      const prevDate = new Date(currentDate);
      prevDate.setDate(prevDate.getDate() - 1);
      if (datesWithEntries[prevDate.toDateString()]) { streak++; currentDate = prevDate; } 
      else break;
    }
    setDailyStreak(streak);
  };

  const handleAddEntry = (newEntry: JournalEntry) => {
    const entryWithMetadata = { id: Date.now().toString(), date: new Date(), ...newEntry };
    const updatedEntries = [entryWithMetadata, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

    if (newEntry.tags?.length) {
      const updatedTags = [...allTags];
      newEntry.tags.forEach(tag => { if (!updatedTags.includes(tag)) updatedTags.push(tag); });
      setAllTags(updatedTags);
    }

    if (newEntry.mood && !allMoods.includes(newEntry.mood)) setAllMoods([...allMoods, newEntry.mood]);

    const dateStr = format(new Date(), 'yyyy-MM-dd');
    setCalendarEntries(prev => ({ ...prev, [dateStr]: (prev[dateStr] || 0) + 1 }));

    calculateDailyStreak(updatedEntries);
    toast.success('Journal entry saved successfully!');
    setActiveTab('entries');
  };

  const getFilteredEntries = () => {
    let filtered = entries;
    if (searchQuery) filtered = filtered.filter(entry => entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || entry.content.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedTags.length) filtered = filtered.filter(entry => entry.tags?.some(tag => selectedTags.includes(tag)));
    if (selectedMoods.length) filtered = filtered.filter(entry => entry.mood && selectedMoods.includes(entry.mood));
    if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      filtered = filtered.filter(entry => format(new Date(entry.date), 'yyyy-MM-dd') === dateStr);
    }
    return filtered;
  };

  const filteredEntries = getFilteredEntries();
  const toggleMoodFilter = (mood: string) => setSelectedMoods(prev => prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]);
  const clearFilters = () => { setSelectedTags([]); setSelectedMoods([]); setSearchQuery(''); setSelectedDate(undefined); };
  const handleViewCalendar = () => setActiveTab('calendar');

  const writingPrompts = [
    "What are three things you're grateful for today?",
    "Describe a challenge you're facing and how you plan to overcome it.",
    "What was the best moment of your day and why?",
    "Write about a person who influenced you recently.",
    "What's something new you learned today?",
    "How did you take care of your physical health today?",
    "Describe your current emotional state and what led to it.",
    "What's one small thing you can do tomorrow to make it better than today?",
    "Write about a goal you're working towards and your progress?",
    "Reflect on a mistake you made recently and what you learned from it."
  ];
  const currentPrompt = writingPrompts[Math.floor(Math.random() * writingPrompts.length)];

  const moodEmojis: Record<string, string> = {
    'Happy':'😃','Good':'🙂','Calm':'😌','Neutral':'😐','Tired':'😴','Anxious':'😟','Sad':'😢','Angry':'😡','Grateful':'🙏','Excited':'🤩'
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header & Daily Streak */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Journal</h1>
            <p className="text-muted-foreground">Record your thoughts, reflections, and memorable moments</p>
          </div>
          {dailyStreak > 0 && (
            <div className="flex items-center px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{dailyStreak} day{dailyStreak !== 1 ? 's' : ''} streak!</span>
            </div>
          )}
        </div>

        {/* Writing Prompt */}
        {showPrompt && (
          <Alert className="bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-300">
            <PenLine className="h-4 w-4" />
            <AlertTitle>Writing Prompt</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
              <span>{currentPrompt}</span>
              <Button variant="outline" size="sm" onClick={() => setShowPrompt(false)}>Dismiss</Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="write" className="flex items-center gap-2"><PenLine className="h-4 w-4" /> Write</TabsTrigger>
            <TabsTrigger value="entries" className="flex items-center gap-2"><FileText className="h-4 w-4" /> Entries ({entries.length})</TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2"><CalendarIcon className="h-4 w-4" /> Calendar</TabsTrigger>
          </TabsList>

          {/* Write Tab */}
          <TabsContent value="write" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>New Entry</CardTitle>
                <CardDescription>Write down your thoughts, feelings, and experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <JournalEntryForm onSubmit={handleAddEntry} availableTags={allTags} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Entries Tab */}
          <TabsContent value="entries" className="space-y-4">
            {/* ... keep your original filter/search and JournalEntryList JSX ... */}
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Journal Calendar</CardTitle>
                <CardDescription>View your journal entries by date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mx-auto max-w-sm">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => { setSelectedDate(date); setActiveTab('entries'); }}
                    className="rounded-md border"
                    modifiers={{ hasEntry: (date) => !!calendarEntries[format(date, 'yyyy-MM-dd')] }}
                    modifiersStyles={{ hasEntry: { backgroundColor: 'var(--primary)', color: 'white', fontWeight: 'bold' } }}
                    components={{
                      DayContent: ({ date }) => {
                        const entryCount = calendarEntries[format(date, 'yyyy-MM-dd')] || 0;
                        return (
                          <div className="relative h-full w-full p-2">
                            <span>{date.getDate()}</span>
                            {entryCount > 0 && <span className="absolute bottom-1 right-1 flex h-2 w-2 rounded-full bg-primary"></span>}
                          </div>
                        );
                      }
                    }}
                  />
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <p>Click on a date to view entries from that day</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Days with journal entries</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default JournalPage;
