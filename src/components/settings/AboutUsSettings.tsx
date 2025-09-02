
import React from 'react';
import { Github, Twitter, ExternalLink, Mail, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutUsSettings: React.FC = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-md md:text-lg font-medium mb-3 md:mb-4">About Trackify</h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4">
          Trackify is your all-in-one solution for tracking health, habits, and goals. 
          We're dedicated to helping you live a healthier, more balanced life through
          simple, effective tracking tools.
        </p>
        
        <div className="flex flex-col space-y-3">
          <p className="text-sm font-medium">Version 1.2.0</p>
          <p className="text-xs text-muted-foreground">Released on April 10, 2025</p>
        </div>
      </div>
      
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-md md:text-lg font-medium mb-3 md:mb-4">Connect With Us</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Twitter className="mr-2 h-4 w-4 text-blue-400" />
            Twitter
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Instagram className="mr-2 h-4 w-4 text-pink-500" />
            Instagram
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Linkedin className="mr-2 h-4 w-4 text-blue-600" />
            LinkedIn
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Mail className="mr-2 h-4 w-4 text-red-500" />
            Email
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <ExternalLink className="mr-2 h-4 w-4 text-green-500" />
            Website
          </Button>
        </div>
      </div>
      
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-md md:text-lg font-medium mb-3 md:mb-4">Legal</h3>
        <div className="space-y-2">
          <Button variant="link" className="h-auto p-0 text-sm text-primary">Terms of Service</Button>
          <Button variant="link" className="h-auto p-0 text-sm text-primary">Privacy Policy</Button>
          <Button variant="link" className="h-auto p-0 text-sm text-primary">Cookie Policy</Button>
        </div>
      </div>
      
      <div className="glass-card p-4 md:p-6 text-center">
        <p className="text-xs text-muted-foreground">&copy; 2025 Trackify. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AboutUsSettings;
