
import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/header';
import SidebarNav from '@/components/nav/sidebar-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [userName, setUserName] = useState("Trackify");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Handle scroll for visual changes
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load user data from localStorage on component mount
    const loadUserName = () => {
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        try {
          const parsedData = JSON.parse(savedUserData);
          if (parsedData.name) {
            setUserName(parsedData.name.split(' ')[0]); // Use first name
          }
        } catch (error) {
          console.error('Failed to parse user data from localStorage', error);
        }
      }
    };

    loadUserName();

    // Listen for profile updates
    const handleProfileUpdate = (event: any) => {
      const { userData } = event.detail;
      if (userData && userData.name) {
        setUserName(userData.name.split(' ')[0]); // Use first name
      }
    };

    document.addEventListener('user-profile-updated', handleProfileUpdate);
    
    return () => {
      document.removeEventListener('user-profile-updated', handleProfileUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen flex w-full overflow-hidden bg-background">
      {!isMobile && (
        <aside className={cn(
          "hidden md:block w-60 border-r border-border backdrop-blur-sm transition-all duration-300 z-10",
          isScrolled ? "bg-card/70" : "bg-card/50"
        )}>
          <SidebarNav hideLogo={false} />
        </aside>
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName={userName} />
        <TooltipProvider>
          <main className="flex-1 px-3 sm:px-5 lg:px-6 py-5 w-full overflow-auto">
            {children}
          </main>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MainLayout;
