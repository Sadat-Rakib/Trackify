
import React from 'react';
import { Calendar } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const CalendarPage = () => {
  // Generate mock calendar data
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Adjust Sunday as 0 to be 6 (to start week on Monday)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < adjustedFirstDay; i++) {
    calendarDays.push({ day: null, hasWater: false, hasExercise: false, hasCalories: false });
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    // Randomly decide if the day has activities logged
    calendarDays.push({
      day: i,
      hasWater: Math.random() > 0.3,
      hasExercise: Math.random() > 0.6,
      hasCalories: Math.random() > 0.4,
      hasMood: Math.random() > 0.5
    });
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          Fitness Calendar
        </h2>
        <p className="text-muted-foreground">View your daily health and fitness activities at a glance.</p>
      </div>
      
      <div className="glass-card p-5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">
            {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
          </h3>
          <div className="flex gap-2">
            <button className="bg-secondary rounded-md p-2">
              <Calendar className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center font-medium mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="p-2">{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((calDay, index) => (
            <div key={index} className={`border rounded-lg p-2 min-h-24 ${calDay.day === today.getDate() ? 'border-primary' : 'border-border'} ${!calDay.day ? 'opacity-30' : ''}`}>
              {calDay.day && (
                <>
                  <div className="text-sm font-medium mb-2">{calDay.day}</div>
                  <div className="flex flex-wrap gap-1">
                    {calDay.hasWater && <div className="w-2 h-2 rounded-full bg-water"></div>}
                    {calDay.hasExercise && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                    {calDay.hasCalories && <div className="w-2 h-2 rounded-full bg-calories"></div>}
                    {calDay.hasMood && <div className="w-2 h-2 rounded-full bg-yellow-500"></div>}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="glass-card p-5">
          <h3 className="text-lg font-medium mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {[
              { time: '07:00 AM', activity: 'Morning Run', type: 'exercise' },
              { time: '08:30 AM', activity: 'Breakfast', type: 'nutrition' },
              { time: '01:00 PM', activity: 'Lunch', type: 'nutrition' },
              { time: '05:30 PM', activity: 'Yoga Session', type: 'exercise' },
              { time: '07:00 PM', activity: 'Dinner', type: 'nutrition' }
            ].map((item, i) => (
              <div key={i} className="flex items-start p-3 bg-secondary/50 rounded-xl">
                <div className="w-24 shrink-0 font-medium">{item.time}</div>
                <div className="flex-1">
                  <div className="font-medium">{item.activity}</div>
                  <div className="text-sm text-muted-foreground capitalize">{item.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-card p-5">
          <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {[
              { date: 'Tomorrow', activity: 'HIIT Workout', type: 'exercise' },
              { date: 'Jun 15', activity: 'Weekly Weigh-in', type: 'tracking' },
              { date: 'Jun 18', activity: 'Running Group', type: 'exercise' },
              { date: 'Jun 22', activity: 'Nutrition Consultation', type: 'health' }
            ].map((item, i) => (
              <div key={i} className="flex items-start p-3 bg-secondary/50 rounded-xl">
                <div className="w-24 shrink-0 font-medium">{item.date}</div>
                <div className="flex-1">
                  <div className="font-medium">{item.activity}</div>
                  <div className="text-sm text-muted-foreground capitalize">{item.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CalendarPage;
