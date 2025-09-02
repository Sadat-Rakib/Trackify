
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
}

const ReminderManager: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    const storedReminders = localStorage.getItem('reminders');
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleAddReminder = () => {
    if (editingReminder) {
      setReminders(
        reminders.map((reminder) =>
          reminder.id === editingReminder.id
            ? { ...reminder, title, description, time }
            : reminder
        )
      );
      setEditingReminder(null);
    } else {
      const newReminder = {
        id: Date.now().toString(),
        title,
        description,
        time,
      };
      setReminders([...reminders, newReminder]);
    }
    setTitle('');
    setDescription('');
    setTime('');
    setOpen(false);
  };

  const handleEditReminder = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setTitle(reminder.title);
    setDescription(reminder.description);
    setTime(reminder.time);
    setOpen(true);
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <div className="p-4">
        <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button>Add Reminder</Button>
        </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Reminder</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col space-y-4'>
        <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Reminder Title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Reminder Description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddReminder} type="submit">
            {editingReminder ? 'Update Reminder' : 'Add Reminder'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      <h2 className="text-lg font-semibold mt-6">Reminders</h2>
      <ul className="mt-4 space-y-2">
        {reminders.map((reminder) => (
          <li
            key={reminder.id}
            className="flex items-center justify-between p-3 border rounded-md"
          >
            <div>
              <p className="font-medium">{reminder.title}</p>
              <p className="text-sm text-gray-500">{reminder.description}</p>
              <p className="text-sm text-gray-500">Time: {reminder.time}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditReminder(reminder)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteReminder(reminder.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderManager;
