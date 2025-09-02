import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Activity, Heart, BrainCircuit, Bed, Dumbbell, Utensils, Target, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import ActionableCard from './ActionableCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Define DashboardItems interface to match the one in settings
interface DashboardItems {
  water: boolean;
  nutrition: boolean;
  exercise: boolean;
  mood: boolean;
  goals: boolean;
  quickWater: boolean;
  quickExercise: boolean;
  quickNutrition: boolean;
  quickGoals: boolean;
  quickSleep: boolean;
  quickBudget: boolean;
  quickMood: boolean;
  quickCycle: boolean;
  healthScore: boolean;
  sleepQuality: boolean;
  workout: boolean;
  calories: boolean;
  moodTracker: boolean;
  activeGoals: boolean;
  journalEntry: boolean;
  habitsTracker: boolean;
}
interface DashboardActionableCardsProps {
  visibleCards: DashboardItems;
}
const DashboardActionableCards: React.FC<DashboardActionableCardsProps> = ({
  visibleCards
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const handleCardAction = (action: string) => {
    switch (action) {
      case 'exercise':
        navigate('/exercise');
        toast.success('Redirecting to exercise page');
        break;
      case 'sleep':
        navigate('/sleep');
        toast.success('Redirecting to sleep page');
        break;
      case 'nutrition':
        navigate('/nutrition');
        toast.success('Redirecting to nutrition page');
        break;
      case 'mood':
        navigate('/mood');
        toast.success('Redirecting to mood page');
        break;
      case 'goals':
        navigate('/goals');
        toast.success('Redirecting to goals page');
        break;
      case 'journal':
        navigate('/journal');
        toast.success('Redirecting to journal page');
        break;
      case 'habits':
        navigate('/habits');
        toast.success('Redirecting to habits page');
        break;
      case 'health':
        navigate('/');
        toast.success('Checking health stats');
        break;
      case 'water':
        navigate('/water');
        toast.success('Redirecting to water page');
        break;
      case 'budget':
        navigate('/budget');
        toast.success('Redirecting to budget page');
        break;
      case 'cycle':
        navigate('/cycle-tracker');
        toast.success('Redirecting to cycle tracker');
        break;
      default:
        break;
    }
  };

  // Define all available cards
  const cards = [{
    id: 'health',
    title: 'Health Score',
    value: '87/100',
    icon: Activity,
    color: 'primary',
    actionLabel: 'Check Stats',
    visible: visibleCards.healthScore
  }, {
    id: 'sleep',
    title: 'Sleep Quality',
    value: 'Good',
    icon: Bed,
    color: 'indigo',
    actionLabel: 'Track Sleep',
    visible: visibleCards.sleepQuality
  }, {
    id: 'exercise',
    title: 'Workout',
    value: '2 Today',
    icon: Dumbbell,
    color: 'green',
    actionLabel: 'Add Exercise',
    visible: visibleCards.workout
  }, {
    id: 'nutrition',
    title: 'Calories',
    value: '1,560',
    icon: Utensils,
    color: 'orange',
    actionLabel: 'Log Meal',
    visible: visibleCards.calories
  }, {
    id: 'mood',
    title: 'Mood',
    value: 'Happy',
    icon: BrainCircuit,
    color: 'yellow',
    actionLabel: 'Track Mood',
    visible: visibleCards.moodTracker
  }, {
    id: 'goals',
    title: 'Goals',
    value: '3 Active',
    icon: Target,
    color: 'blue',
    actionLabel: 'View Goals',
    visible: visibleCards.activeGoals
  }, {
    id: 'journal',
    title: 'Journal',
    value: 'New Entry',
    icon: BookOpen,
    color: 'emerald',
    actionLabel: 'Write Entry',
    visible: visibleCards.journalEntry
  }, {
    id: 'habits',
    title: 'Habits',
    value: '5 Tracked',
    icon: Heart,
    color: 'rose',
    actionLabel: 'Check Habits',
    visible: visibleCards.habitsTracker
  },
  // Quick action cards that were previously in DashboardQuickActions
  {
    id: 'water',
    title: 'Water',
    value: '5/8 Glasses',
    icon: Activity,
    color: 'water',
    actionLabel: 'Add Water',
    visible: visibleCards.quickWater
  }, {
    id: 'budget',
    title: 'Budget',
    value: '$1,200 Left',
    icon: Activity,
    color: 'green',
    actionLabel: 'Check Budget',
    visible: visibleCards.quickBudget
  }, {
    id: 'cycle',
    title: 'Cycle',
    value: 'Day 14',
    icon: Activity,
    color: 'rose',
    actionLabel: 'Track Cycle',
    visible: visibleCards.quickCycle
  }];

  // Filter only visible cards
  const visibleActionCards = cards.filter(card => card.visible);
  if (visibleActionCards.length === 0) {
    return null;
  }
  return <div className="glass-card mb-6 pb-[0px] bg-slate-50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <CollapsibleTrigger asChild className="w-full flex items-center justify-between">
            <button className="flex items-center justify-between w-full text-left">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <span className="text-lg font-medium">Insights</span>
              </div>
              {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          {visibleActionCards.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {visibleActionCards.map(card => <ActionableCard key={card.id} title={card.title} value={card.value} icon={card.icon} color={card.color} actionLabel={card.actionLabel} onClick={() => handleCardAction(card.id)} />)}
            </div>}
        </CollapsibleContent>
      </Collapsible>
    </div>;
};
export default DashboardActionableCards;