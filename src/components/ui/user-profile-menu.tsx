import React, { useState, useEffect } from 'react';
import { User, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from "@/components/ui/dropdown-menu";
import { Notification, NotificationButton } from '@/components/ui/notification-button';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
interface UserProfileMenuProps {
  userName?: string;
  onClose?: () => void;
  notifications?: Notification[];
}
export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  userName: propUserName,
  onClose,
  notifications
}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(propUserName || "Umang");
  const hasNotifications = notifications && notifications.length > 0;
  const unreadCount = notifications ? notifications.filter(n => n.unread).length : 0;
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    // If prop is provided, use it
    if (propUserName) {
      setUserName(propUserName);
      return;
    }

    // Otherwise, load from localStorage
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        if (parsedData.name) {
          setUserName(parsedData.name.split(' ')[0]); // Use first name only
        }
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
      }
    }

    // Listen for profile updates
    const handleProfileUpdate = (event: any) => {
      const {
        userData
      } = event.detail;
      if (userData && userData.name) {
        setUserName(userData.name.split(' ')[0]); // Use first name only
      }
    };
    document.addEventListener('user-profile-updated', handleProfileUpdate);
    return () => {
      document.removeEventListener('user-profile-updated', handleProfileUpdate);
    };
  }, [propUserName]);
  const handleNavigation = (path: string) => {
    navigate(path);
    if (onClose) onClose();
    setIsMenuOpen(false);
  };
  const handleNotificationClick = (id: number) => {
    toast.success(`Notification ${id} marked as read`);
    // In a real app, would mark notification as read in state/database
  };
  const handleMenuOpenChange = (open: boolean) => {
    setIsMenuOpen(open);
  };

  // Function to close the menu (for notification button to use)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return <DropdownMenu open={isMenuOpen} onOpenChange={handleMenuOpenChange}>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 transition-colors">
        <div className="bg-white text-primary rounded-full p-1">
          <User className="h-4 w-4" />
        </div>
        <span className="font-medium hidden sm:inline">{userName}</span>
        {notifications && unreadCount > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile Settings</span>
        </DropdownMenuItem>

        {isMobile && notifications && <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="p-0">
              
            </DropdownMenuItem>
          </>}

        {hasNotifications && !isMobile && <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                  {unreadCount > 0 && <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">
                      {unreadCount}
                    </span>}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-72">
                    {notifications.length > 0 ? <>
                        {notifications.map(notification => <DropdownMenuItem key={notification.id} onClick={() => handleNotificationClick(notification.id)} className="flex flex-col items-start py-2">
                            <div className="flex justify-between w-full">
                              <span className="font-medium">{notification.title}</span>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </span>
                          </DropdownMenuItem>)}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center text-primary" onClick={() => toast.success('All notifications marked as read')}>
                          Mark all as read
                        </DropdownMenuItem>
                      </> : <DropdownMenuItem disabled>No notifications</DropdownMenuItem>}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </>}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleNavigation('/goals')}>
          Goals
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/calendar')}>
          Calendar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/journal')}>
          Journal
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>;
};