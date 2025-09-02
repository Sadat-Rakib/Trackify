
import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NotificationStripeProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number; // in milliseconds, defaults to 3000ms (3 seconds)
  onClose?: () => void;
}

export const NotificationStripe: React.FC<NotificationStripeProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  
  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'warning': 
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };
  
  const getBgColor = () => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-primary';
    }
  };
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Wait for animation to complete
  };
  
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);
  
  if (!isVisible) return null;
  
  return (
    <div className={cn(
      "notification-stripe fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-2 px-4", 
      getBgColor(),
      isClosing ? 'slide-up' : ''
    )}>
      <div className="flex-1 text-center text-sm md:text-base flex items-center justify-center">
        <span className="mr-2">{getIcon()}</span>
        <span>{message}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-full hover:bg-white/10 transition-colors"
        onClick={handleClose}
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
