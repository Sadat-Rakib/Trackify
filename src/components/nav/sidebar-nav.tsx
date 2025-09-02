
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Droplet, 
  Flame, 
  Activity, 
  SmilePlus, 
  Target, 
  Calendar, 
  Settings, 
  Moon, 
  DollarSign,
  Clock,
  CheckSquare,
  BookOpen,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

interface SidebarNavProps {
  hideLogo?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, active }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
              active 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
            aria-label={label}
          >
            {icon}
            <span className="text-sm">{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SidebarNav: React.FC<SidebarNavProps> = ({ hideLogo = false }) => {
  // Safely check if we can use useLocation
  let pathname = '/';
  try {
    const location = useLocation();
    pathname = location.pathname;
  } catch (error) {
    // If useLocation throws an error, we're outside of Router context
    console.warn('SidebarNav rendered outside Router context, defaulting active state to homepage');
  }

  const healthNavItems = [
    { icon: <Droplet className="h-5 w-5 text-cyan-500" />, label: 'Water Tracker', href: '/water' },
    { icon: <Flame className="h-5 w-5 text-orange-500" />, label: 'Nutrition', href: '/nutrition' },
    { icon: <Activity className="h-5 w-5 text-green-500" />, label: 'Exercise', href: '/exercise' },
    { icon: <Moon className="h-5 w-5 text-indigo-500" />, label: 'Sleep', href: '/sleep' },
  ];

  const wellbeingNavItems = [
    { icon: <SmilePlus className="h-5 w-5 text-yellow-500" />, label: 'Mood', href: '/mood' },
    { icon: <BookOpen className="h-5 w-5 text-emerald-500" />, label: 'Journal', href: '/journal' },
    { icon: <Heart className="h-5 w-5 text-pink-500" />, label: 'Cycle Tracker', href: '/cycle-tracker' },
  ];

  const productivityNavItems = [
    { icon: <Clock className="h-5 w-5 text-red-500" />, label: 'Pomodoro', href: '/pomodoro' },
    { icon: <CheckSquare className="h-5 w-5 text-purple-500" />, label: 'Habits', href: '/habits' },
    { icon: <Target className="h-5 w-5 text-blue-600" />, label: 'Goals', href: '/goals' },
    { icon: <DollarSign className="h-5 w-5 text-green-600" />, label: 'Budget', href: '/budget' },
    { icon: <Calendar className="h-5 w-5 text-violet-500" />, label: 'Calendar', href: '/calendar' },
  ];

  return (
    <div className="w-full md:w-60 h-full flex flex-col border-r border-sidebar-border bg-sidebar">
      {!hideLogo && (
        <div className="px-6 pt-6 pb-4">
          <h1 className="text-2xl font-bold flex items-center">
            <span className="bg-primary text-primary-foreground rounded-lg p-1 mr-2">
              <Activity className="h-5 w-5" />
            </span>
            Trackify
          </h1>
        </div>
      )}
      
      <ScrollArea className="flex-1">
        <div className="px-3 pb-6">
          <div className="space-y-4">
            {/* Dashboard */}
            <div>
              <NavItem
                icon={<LayoutDashboard className="h-5 w-5 text-blue-500" />}
                label="Dashboard"
                href="/"
                active={pathname === '/'}
              />
            </div>

            {/* Health Tracking Section */}
            <div>
              <div className="px-4 py-2">
                <h3 className="text-xs uppercase font-medium text-sidebar-foreground/70 tracking-wider">Health</h3>
              </div>
              <div className="space-y-1">
                {healthNavItems.map((item) => (
                  <NavItem
                    key={item.href}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    active={pathname === item.href}
                  />
                ))}
              </div>
            </div>
            
            {/* Mental & Emotional Tracking */}
            <div>
              <div className="px-4 py-2">
                <h3 className="text-xs uppercase font-medium text-sidebar-foreground/70 tracking-wider">Well-being</h3>
              </div>
              <div className="space-y-1">
                {wellbeingNavItems.map((item) => (
                  <NavItem
                    key={item.href}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    active={pathname === item.href}
                  />
                ))}
              </div>
            </div>
            
            {/* Productivity & Goals */}
            <div>
              <div className="px-4 py-2">
                <h3 className="text-xs uppercase font-medium text-sidebar-foreground/70 tracking-wider">Productivity</h3>
              </div>
              <div className="space-y-1">
                {productivityNavItems.map((item) => (
                  <NavItem
                    key={item.href}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    active={pathname === item.href}
                  />
                ))}
              </div>
            </div>
            
            {/* Settings at the bottom */}
            <div>
              <div className="px-4 py-2">
                <h3 className="text-xs uppercase font-medium text-sidebar-foreground/70 tracking-wider">Preferences</h3>
              </div>
              <div className="space-y-1">
                <NavItem
                  icon={<Settings className="h-5 w-5 text-gray-500" />}
                  label="Settings"
                  href="/settings"
                  active={pathname === '/settings'}
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SidebarNav;
