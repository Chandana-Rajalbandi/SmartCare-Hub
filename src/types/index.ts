export interface Medicine {
  id: string;
  name: string;
  description: string;
  usageInstructions: string;
  sideEffects: string;
  price: number;
  dosage: string;
  category: string;
  image: string;
  requiresPrescription: boolean;
  stock: number;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  medicalHistory: DiagnosisRecord[];
}

export interface DiagnosisRecord {
  id: string;
  date: string;
  symptoms: string[];
  diagnosis: string;
  recommendedMedicines: string[];
}

export interface Symptom {
  id: string;
  name: string;
  description: string;
}

export interface DiagnosisInput {
  symptoms: string[];
  bodyParts: string[];
  duration: string;
  severity: string;
  additionalInfo?: string;
}

export interface Diagnosis {
  id: string;
  condition: string;
  description: string;
  confidence: number;
  severity: 'mild' | 'moderate' | 'severe';
  recommendedMedicines: Medicine[];
  advice: string;
  seeDoctor: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  deliveryAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}
