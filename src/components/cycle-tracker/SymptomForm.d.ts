
import { SymptomDetails } from './SymptomDetailsTypes';

export interface SymptomFormProps {
  symptomType: string;
  setSymptomType: (type: string) => void;
  symptomSeverity: number;
  setSymptomSeverity: (severity: number) => void;
  handleAddSymptom: () => void;
  symptomDetails: SymptomDetails;
  setSymptomDetails: (details: SymptomDetails) => void;
}
