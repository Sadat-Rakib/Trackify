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

interface JournalEntryListProps {
  entries: JournalEntry[];
  availableTags?: string[];
  onDelete?: (index: number) => void;
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

export const JournalEntryList: React.FC<JournalEntryListProps> = ({
  entries,
  availableTags = [],
  onDelete,
}) => {
  const [filterTag, setFilterTag] = useState<string>('');

  const selectedMoodStyle = (mood?: string) => {
    return moodOptions.find(m => m.value === mood)?.color || '';
  };

  const filteredEntries = filterTag ? entries.filter(e => e.tags?.includes(filterTag)) : entries;

  return (
    <div className="space-y-4">
      {availableTags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {availableTags.map(tag => (
            <Badge
              key={tag}
              variant={filterTag === tag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilterTag(filterTag === tag ? '' : tag)}
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {filteredEntries.map((entry, index) => (
        <Card key={index} className="p-4">
          <div className={`p-2 rounded ${selectedMoodStyle(entry.mood)}`}>
            <h3 className="font-semibold text-lg">{entry.title}</h3>
            <p className="whitespace-pre-wrap mt-1">{entry.content}</p>
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {entry.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex justify-end mt-2 gap-2">
              {onDelete && (
                <Button size="sm" variant="destructive" onClick={() => onDelete(index)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default JournalEntryList;
