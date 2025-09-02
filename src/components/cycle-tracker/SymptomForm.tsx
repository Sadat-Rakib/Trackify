
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SymptomDetails } from './SymptomDetailsTypes';

interface SymptomFormProps {
  symptomType: string;
  setSymptomType: (type: string) => void;
  symptomSeverity: number;
  setSymptomSeverity: (severity: number) => void;
  symptomDetails: SymptomDetails;
  setSymptomDetails: (details: SymptomDetails) => void;
  handleAddSymptom: () => void;
}

const SymptomForm = ({
  symptomType,
  setSymptomType,
  symptomSeverity,
  setSymptomSeverity,
  symptomDetails,
  setSymptomDetails,
  handleAddSymptom
}: SymptomFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Symptom Type</label>
        <Select value={symptomType} onValueChange={setSymptomType}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cramps">Cramps</SelectItem>
            <SelectItem value="headache">Headache</SelectItem>
            <SelectItem value="bloating">Bloating</SelectItem>
            <SelectItem value="fatigue">Fatigue</SelectItem>
            <SelectItem value="mood_swings">Mood Swings</SelectItem>
            <SelectItem value="breast_tenderness">Breast Tenderness</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Severity (1-5)</label>
        <Select value={String(symptomSeverity)} onValueChange={(val) => setSymptomSeverity(Number(val))}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 - Very Mild</SelectItem>
            <SelectItem value="2">2 - Mild</SelectItem>
            <SelectItem value="3">3 - Moderate</SelectItem>
            <SelectItem value="4">4 - Severe</SelectItem>
            <SelectItem value="5">5 - Very Severe</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Additional Details</label>
        <Textarea
          value={symptomDetails.notes || ''}
          onChange={(e) => setSymptomDetails({...symptomDetails, notes: e.target.value})}
        />
      </div>
      
      <Button className="w-full" onClick={handleAddSymptom}>
        Record Symptom
      </Button>
    </div>
  );
};

export default SymptomForm;
