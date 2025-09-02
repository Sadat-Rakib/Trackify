
import React from 'react';
import { X, Bell, Info, CheckCircle, AlertTriangle, ExternalLink, BookOpen, CalendarClock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: string;
}

interface NotificationDisplayProps {
  notifications: Notification[];
  onClose: () => void;
  isMobile?: boolean;
}

export const NotificationDisplay: React.FC<NotificationDisplayProps> & {
  handleNotificationClick: (id: number) => void;
} = ({ notifications, onClose, isMobile = false }) => {
  
  const getIconForType = (type: string) => {
    switch(type) {
      case 'achievement': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'reminder': return <CalendarClock className="h-4 w-4 text-orange-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      case 'system': return <BookOpen className="h-4 w-4 text-primary" />;
      default: return <Bell className="h-4 w-4 text-primary" />;
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className={cn(
          "absolute bg-card border border-border rounded-lg shadow-lg z-51 animate-fade-in",
          isMobile 
            ? "left-4 top-[60px] w-[calc(100vw-32px)]" 
            : "right-4 top-[60px] w-[350px] max-w-[calc(100vw-40px)]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={cn(
                  "p-3 mx-2 my-1 rounded-lg cursor-pointer transition-colors flex items-start gap-3",
                  notification.unread 
                    ? "bg-secondary/70 border-l-2 border-primary" 
                    : "bg-secondary/30 hover:bg-secondary/40"
                )}
                onClick={() => NotificationDisplay.handleNotificationClick(notification.id)}
              >
                <div className="mt-0.5 flex items-center justify-center h-6 w-6 rounded-full bg-background">
                  {getIconForType(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={cn(
                      "font-medium", 
                      notification.unread && "text-foreground"
                    )}>
                      {notification.title}
                      {notification.unread && (
                        <Badge variant="outline" className="ml-2 py-0 h-4 text-[10px] bg-primary/10 text-primary border-primary/20">New</Badge>
                      )}
                    </h4>
                    <span className="text-xs text-muted-foreground ml-2">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="border-t p-3 flex justify-center">
            <Button 
              variant="ghost"
              size="sm"
              className="text-sm text-primary hover:text-primary/80 hover:bg-primary/10"
              onClick={() => {
                toast.success('All notifications marked as read');
                onClose();
              }}
            >
              Mark all as read
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Static method to handle notification clicks
NotificationDisplay.handleNotificationClick = (id: number) => {
  toast.success(`Notification ${id} marked as read`);
  // In a real app, would mark notification as read in state/database
};
