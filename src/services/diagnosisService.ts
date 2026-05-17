import { Diagnosis, DiagnosisInput, Medicine } from '../types';
import { getMedicineByIdSync } from './medicineService';

const requiredMedicines = (ids: string[]): Medicine[] => {
  return ids
    .map((id) => getMedicineByIdSync(id))
    .filter((medicine): medicine is Medicine => Boolean(medicine));
};

export const analyzeSymptomsApi = async (symptomData: DiagnosisInput): Promise<Diagnosis> => {
  console.log('Analyzing symptoms:', symptomData);
  await new Promise((resolve) => setTimeout(resolve, 1800));

  const symptoms = symptomData.symptoms.map((symptom) => symptom.toLowerCase());
  const duration = symptomData.duration.toLowerCase();
  const severity = symptomData.severity.toLowerCase();

  const hasSymptom = (value: string) => symptoms.includes(value.toLowerCase());
  const isSevere = severity === 'severe';

  if (hasSymptom('Fever') && hasSymptom('Cough')) {
    return {
      id: `diagnosis-${Date.now()}`,
      condition: 'Common Cold',
      description:
        'Your symptoms are most consistent with a common cold or mild viral upper respiratory infection. Rest, fluids, and supportive medicines may help relieve discomfort.',
      confidence: 85,
      severity: isSevere ? 'moderate' : 'mild',
      recommendedMedicines: requiredMedicines(['med-101', 'med-102']),
      advice:
        'Rest well, stay hydrated, and avoid exposing others while symptoms continue. If symptoms worsen, breathing becomes difficult, or fever lasts several days, consult a doctor.',
      seeDoctor: false,
    };
  }

  if (hasSymptom('Headache') && duration.includes('week')) {
    return {
      id: `diagnosis-${Date.now()}`,
      condition: 'Tension Headache',
      description:
        'This pattern is commonly seen with tension headaches, which may feel like pressure or tightness around the head. Stress, poor posture, dehydration, and sleep changes can contribute.',
      confidence: 75,
      severity: 'mild',
      recommendedMedicines: requiredMedicines(['med-201']),
      advice:
        'Hydrate well, rest your eyes, and try relaxation or posture correction. If headaches are severe, frequent, or unusual for you, seek medical advice.',
      seeDoctor: false,
    };
  }

  if (hasSymptom('Nausea') && duration.includes('day')) {
    return {
      id: `diagnosis-${Date.now()}`,
      condition: 'Gastroenteritis',
      description:
        'Your symptoms may be linked to stomach irritation or a mild stomach infection. Hydration is important, especially if there is vomiting or diarrhea.',
      confidence: 70,
      severity: isSevere ? 'moderate' : 'mild',
      recommendedMedicines: requiredMedicines(['med-301', 'med-302']),
      advice:
        'Drink fluids slowly, use oral rehydration support if needed, and eat bland foods. Seek medical attention if symptoms are intense or you cannot keep liquids down.',
      seeDoctor: isSevere,
    };
  }

  return {
    id: `diagnosis-${Date.now()}`,
    condition: 'General Discomfort',
    description:
      'Your symptoms do not strongly match one specific condition in this demo. The discomfort may still be due to a minor viral issue, fatigue, allergy, or temporary irritation.',
    confidence: 60,
    severity: isSevere ? 'moderate' : 'mild',
    recommendedMedicines: requiredMedicines(['med-401', 'med-601']),
    advice:
      'Rest, drink water, monitor your symptoms, and use supportive care. If symptoms persist, worsen, or feel serious, please consult a healthcare professional.',
    seeDoctor: isSevere,
  };
};
