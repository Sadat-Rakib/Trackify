
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

interface DataSettingsProps {
  handleExportData: () => void;
  handleImportData: () => void;
}

const DataSettings: React.FC<DataSettingsProps> = ({
  handleExportData,
  handleImportData
}) => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium mb-4">Import & Export Data</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Export your NutriFit data to keep a backup or import it to another device.
        </p>
        <div className="flex flex-col md:flex-row gap-3">
          <Button 
            onClick={handleExportData}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export All Data
          </Button>
          <Button 
            onClick={handleImportData}
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Import Data
          </Button>
        </div>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium mb-4">Data Privacy</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How is my data stored?</AccordionTrigger>
            <AccordionContent>
              Your NutriFit data is stored locally in your browser. It is not sent to any servers unless you explicitly opt-in to cloud sync (future feature).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I delete all my data?</AccordionTrigger>
            <AccordionContent>
              Yes, you can clear all your stored data at any time. This action cannot be undone, so we recommend exporting a backup first.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is my data encrypted?</AccordionTrigger>
            <AccordionContent>
              Your local data is stored according to your browser's security policies. For additional security, we recommend keeping your device updated and securing it with a password.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="mt-6">
          <Button 
            variant="destructive" 
            className="w-full sm:w-auto"
            onClick={() => {
              if (confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
                // Here you would clear localStorage or other stored data
                localStorage.clear();
                toast.success('All data has been cleared');
              }
            }}
          >
            Clear All Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataSettings;
