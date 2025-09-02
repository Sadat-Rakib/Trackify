import React, { useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Activity, X } from 'lucide-react';
import SidebarNav from '@/components/nav/sidebar-nav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  setIsOpen
}) => {
  // Fix body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  return <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-primary-foreground hover:text-primary-foreground/80 hover:bg-white/10 transition-colors">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-full max-w-[300px] border-r border-border shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-b-xl">
            <div className="flex items-center">
              <div className="bg-white text-primary rounded-lg p-1.5 mr-3">
                <Activity className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold">Trackify</h1>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full transition-colors text-blue-700 bg-blue-700 hover:bg-blue-600">
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <ScrollArea className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto py-4">
            <div className="py-2">
              <SidebarNav hideLogo={true} />
            </div>
          </ScrollArea>
          <div className="border-t border-border p-4">
            <p className="text-xs text-muted-foreground mb-2">
              © 2025 Trackify. All rights reserved.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>;
};