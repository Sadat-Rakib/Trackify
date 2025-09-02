
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useIsMobile } from '@/hooks/use-mobile';
import Reminder from '@/components/ui/Reminder';
import { Bell, Info, Calendar, Target, Droplet, Mail, LucideIcon } from 'lucide-react';

interface NotificationOptionProps {
  title: string;
  description: string;
  defaultChecked?: boolean;
  icon?: React.ReactNode;
}

const NotificationOption: React.FC<NotificationOptionProps> = ({ 
  title, 
  description, 
  defaultChecked = false, 
  icon 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <div className={`flex gap-3 items-start ${isMobile ? 'max-w-[70%]' : ''}`}>
        {icon && <div className="mt-0.5 text-muted-foreground">{icon}</div>}
        <div>
          <p className="font-medium text-sm md:text-base">{title}</p>
          <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
};

const NotificationSettings: React.FC = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-md md:text-lg font-medium mb-3 md:mb-4 flex items-center">
          <Bell className="h-4 w-4 mr-2 text-primary" />
          Notification Preferences
        </h3>
        <div className="space-y-3 md:space-y-4">
          <NotificationOption
            title="Daily Reminders"
            description="Receive daily reminders to log your activities"
            defaultChecked
            icon={<Calendar className="h-4 w-4" />}
          />
          <Reminder />
          
          <NotificationOption
            title="Weekly Reports"
            description="Receive weekly summary of your progress"
            defaultChecked
            icon={<Info className="h-4 w-4" />}
          />
          
          <NotificationOption
            title="Goal Alerts"
            description="Get notified when you're close to achieving a goal"
            defaultChecked
            icon={<Target className="h-4 w-4" />}
          />
          
          <NotificationOption
            title="Hydration Reminders"
            description="Periodic reminders to drink water"
            defaultChecked
            icon={<Droplet className="h-4 w-4" />}
          />
        </div>
      </div>
      
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-md md:text-lg font-medium mb-3 md:mb-4 flex items-center">
          <Mail className="h-4 w-4 mr-2 text-primary" />
          Email Notifications
        </h3>
        <div className="space-y-3 md:space-y-4">
          <NotificationOption
            title="Marketing Emails"
            description="Receive emails about new features and promotions"
            defaultChecked={false}
          />
          
          <NotificationOption
            title="Health Tips"
            description="Weekly health and fitness tips"
            defaultChecked
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
