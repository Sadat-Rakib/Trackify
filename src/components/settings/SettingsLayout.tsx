
import React from 'react';
import Header from '@/components/ui/header';
import { Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SettingsLayoutProps {
  userName: string;
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  userName,
  children
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Settings className="h-7 w-7 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground">
          Customize your Trackify experience and manage your account
        </p>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Welcome, {userName}</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {children}
    </div>
  );
};

export default SettingsLayout;
