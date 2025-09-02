import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";
import { Tag, X, Image, Plus, Lightbulb } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z.string().min(10, { message: "Content must be at least 10 characters." }),
});

interface JournalEntry {
  title: string;
  content: string;
  tags?: string[];
  mood?: string;
}

interface JournalEntryFormProps {
  onSubmit: (data: JournalEntry) => void;
  availableTags?: string[];
}

const moodOptions = [
  { value: 'Happy', emoji: '😃', color: 'bg-green-500/20 text-green-700 dark:bg-green-500/30 dark:text-green-400' },
  { value: 'Good', emoji: '🙂', color: 'bg-blue-500/20 text-blue-700 dark:bg-blue-500/30 dark:text-blue-400' },
  { value: 'Calm', emoji: '😌', color: 'bg-indigo-500/20 text-indigo-700 dark:bg-indigo-500/30 dark:text-indigo-400' },
  { value: 'Neutral', emoji: '😐', color: 'bg-gray-500/20 text-gray-700 dark:bg-gray-500/30 dark:text-gray-400' },
  { value: 'Tired', emoji: '😴', color: 'bg-purple-500/20 text-purple-700 dark:bg-purple-500/30 dark:text-purple-400' },
  { value: 'Anxious', emoji: '😟', color: 'bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/30 dark:text-yellow-400' },
  { value: 'Sad', emoji: '😢', color: 'bg-blue-700/20 text-blue-900 dark:bg-blue-700/30 dark:text-blue-300' },
  { value: 'Angry', emoji: '😡', color: 'bg-red-500/20 text-red-700 dark:bg-red-500/30 dark:text-red-400' },
  { value: 'Grateful', emoji: '🙏', color: 'bg-amber-500/20 text-amber-700 dark:bg-amber-500/30 dark:text-amber-400' },
  { value: 'Excited', emoji: '🤩', color: 'bg-pink-500/20 text-pink-700 dark:bg-pink-500/30 dark:text-pink-400' },
];

const journalTemplates = [
  { id: 'gratitude', title: 'Gratitude Journal', content: `Today, I am grateful for:

1.
2.
3.

One small thing that made me smile today was:` },
  { id: 'reflection', title: 'Daily Reflection', content: `Three things that went well today:

1.
2.
3.

One thing I could have done better:

What I learned today:` },
  { id: 'goals', title: 'Goals & Intentions', content: `My main goal for today is:

Three small steps I can take toward my goals:

1.
2.
3.

How I want to feel at the end of the day:` },
  { id: 'challenge', title: 'Working Through a Challenge', content: `The challenge I'm facing is:

Possible solutions:

1.
2.
3.

What I've tried so far:

My next step will be:` },
  { id: 'selfcare', title: 'Self-Care Check-in', content: `My energy level today (1-10):

Physical self-care I practiced today:

Mental/emotional self-care I practiced today:

Something I did just for me:` },
];

export const JournalEntryForm: React.FC<JournalEntryFormProps> = ({
  onSubmit,
  availableTags = [],
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mood, setMood] = useState<string>('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [newTag, setNewTag] = useState('');

  const form = useForm<JournalEntry>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "" },
  });

  const handleSubmit = (values: JournalEntry) => {
    const completeEntry = {
      ...values,
      tags: selectedTags.length ? selectedTags : undefined,
      mood: mood || undefined,
    };
    onSubmit(completeEntry);
    setSelectedTags([]);
    setMood('');
    form.reset();
    toast.success("Journal entry saved!");
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const addNewTag = () => {
    if (newTag && !availableTags.includes(newTag) && !selectedTags.includes(newTag)) {
      setSelectedTags([...selectedTags, newTag]);
      setNewTag('');
    }
  };

  const applyTemplate = (template: typeof journalTemplates[0]) => {
    form.setValue('title', template.title);
    form.setValue('content', template.content);
    setShowTemplates(false);
  };

  const selectedMoodStyle = moodOptions.find(m => m.value === mood)?.color || '';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex justify-between items-center">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            <span>Templates</span>
          </Button>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Mood:</label>
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger className={`w-[140px] ${selectedMoodStyle}`}>
                <SelectValue placeholder="How are you feeling?" />
              </SelectTrigger>
              <SelectContent>
                {moodOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} className="flex items-center">
                    <span className="mr-2">{option.emoji}</span>
                    <span>{option.value}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {showTemplates && (
          <Card className="mb-4 animate-fade-in">
            <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              {journalTemplates.map(template => (
                <Button key={template.id} variant="outline" onClick={() => applyTemplate(template)} className="justify-start h-auto py-2 px-3 text-left">
                  <div>
                    <div className="font-medium">{template.title}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[250px]">{template.content.split('\n')[0]}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter title here" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}/>

        <FormField control={form.control} name="content" render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <Textarea placeholder="Write your entry here" className="min-h-[150px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}/>

        <div className="space-y-2">
          <FormLabel>Tags</FormLabel>
          <div className="flex flex-wrap gap-2 mb-2">
            {availableTags.map(tag => (
              <Badge key={tag} variant={selectedTags.includes(tag) ? "default" : "outline"} className="cursor-pointer" onClick={() => toggleTag(tag)}>
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Add new tag..." value={newTag} onChange={e => setNewTag(e.target.value)} className="flex-1" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addNewTag())}/>
            <Button type="button" variant="outline" onClick={addNewTag} size="sm"><Plus className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="submit" className="flex-1">Save Entry</Button>
          <Button type="button" variant="outline" disabled className="w-10 flex justify-center"><Image className="h-4 w-4" /></Button>
        </div>
      </form>
    </Form>
  );
};

export default JournalEntryForm;
