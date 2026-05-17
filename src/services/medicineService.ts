import { Medicine } from '../types';
import coldEasePlusImg from '../assets/medicine/cold-ease-plus.svg';
import nightTimeColdReliefImg from '../assets/medicine/nighttime-cold-relief.svg';
import headReliefImg from '../assets/medicine/headrelief-extra-strength.svg';
import jointEaseGelImg from '../assets/medicine/jointease-gel.svg';
import nauseaStopImg from '../assets/medicine/nausea-stop.svg';
import rehydrationSolutionImg from '../assets/medicine/rehydration-solution.svg';
import allergyClearImg from '../assets/medicine/allergyclear-24h.svg';
import antisepticImg from '../assets/medicine/first-aid-antiseptic.svg';
import multivitaminImg from '../assets/medicine/daily-multivitamin.svg';
import skinLotionImg from '../assets/medicine/hydrating-skin-lotion.svg';

export const MEDICINES: Medicine[] = [
  {
    id: 'med-101',
    name: 'ColdEase Plus',
    description: 'Relieves cold symptoms including cough, congestion, and fever.',
    usageInstructions: 'Take 1-2 tablets every 4-6 hours as needed, not exceeding 8 tablets in 24 hours.',
    sideEffects: 'May cause drowsiness. Avoid alcohol and operating machinery.',
    price: 12.99,
    dosage: '500mg tablets',
    category: 'Cold & Flu',
    image: coldEasePlusImg,
    requiresPrescription: false,
    stock: 50,
  },
  {
    id: 'med-102',
    name: 'NightTime Cold Relief',
    description: 'Nighttime cold medicine for restful sleep while treating symptoms.',
    usageInstructions: 'Take 30ml before bedtime.',
    sideEffects: 'Drowsiness and dizziness may occur.',
    price: 8.99,
    dosage: '120ml syrup',
    category: 'Cold & Flu',
    image: nightTimeColdReliefImg,
    requiresPrescription: false,
    stock: 35,
  },
  {
    id: 'med-201',
    name: 'HeadRelief Extra Strength',
    description: 'Fast-acting pain relief for headaches and migraines.',
    usageInstructions: 'Take 2 tablets every 6 hours as needed, not exceeding 6 tablets in 24 hours.',
    sideEffects: 'May cause stomach upset. Take with food if necessary.',
    price: 9.99,
    dosage: '500mg tablets',
    category: 'Pain Relief',
    image: headReliefImg,
    requiresPrescription: false,
    stock: 45,
  },
  {
    id: 'med-202',
    name: 'JointEase Gel',
    description: 'Topical pain relief gel for arthritis and joint discomfort.',
    usageInstructions: 'Apply to affected area up to 4 times daily.',
    sideEffects: 'May cause skin irritation in sensitive individuals.',
    price: 15.49,
    dosage: '100g gel',
    category: 'Pain Relief',
    image: jointEaseGelImg,
    requiresPrescription: false,
    stock: 28,
  },
  {
    id: 'med-301',
    name: 'NauseaStop',
    description: 'Relieves nausea, vomiting, and motion sickness.',
    usageInstructions: 'Take 1 tablet every 8 hours as needed.',
    sideEffects: 'May cause drowsiness and dry mouth.',
    price: 11.49,
    dosage: '25mg tablets',
    category: 'Digestive Health',
    image: nauseaStopImg,
    requiresPrescription: false,
    stock: 30,
  },
  {
    id: 'med-302',
    name: 'Rehydration Solution',
    description: 'Replenishes electrolytes lost during vomiting or diarrhea.',
    usageInstructions: 'Mix one packet in a glass of water and drink as needed.',
    sideEffects: 'None known when used as directed.',
    price: 14.99,
    dosage: '10 packets',
    category: 'Digestive Health',
    image: rehydrationSolutionImg,
    requiresPrescription: false,
    stock: 25,
  },
  {
    id: 'med-401',
    name: 'AllergyClear 24H',
    description: 'Non-drowsy 24-hour relief from seasonal allergies.',
    usageInstructions: 'Take 1 tablet daily.',
    sideEffects: 'May cause dry mouth and headache in some individuals.',
    price: 18.99,
    dosage: '10mg tablets',
    category: 'Allergy',
    image: allergyClearImg,
    requiresPrescription: false,
    stock: 40,
  },
  {
    id: 'med-501',
    name: 'First Aid Antiseptic',
    description: 'Helps prevent infection in minor cuts, scrapes, and burns.',
    usageInstructions: 'Clean affected area and apply a small amount 1-3 times daily.',
    sideEffects: 'Temporary stinging may occur upon application.',
    price: 6.99,
    dosage: '120ml solution',
    category: 'First Aid',
    image: antisepticImg,
    requiresPrescription: false,
    stock: 55,
  },
  {
    id: 'med-601',
    name: 'Daily Multivitamin',
    description: 'Complete daily vitamin and mineral support for adults.',
    usageInstructions: 'Take 1 tablet daily with food.',
    sideEffects: 'None when used as directed.',
    price: 19.99,
    dosage: '90 tablets',
    category: 'Vitamins',
    image: multivitaminImg,
    requiresPrescription: false,
    stock: 65,
  },
  {
    id: 'med-701',
    name: 'Hydrating Skin Lotion',
    description: 'Intensive moisturizing lotion for dry and sensitive skin.',
    usageInstructions: 'Apply to clean skin as needed.',
    sideEffects: 'May cause irritation in individuals with specific allergies.',
    price: 13.49,
    dosage: '250ml lotion',
    category: 'Skincare',
    image: skinLotionImg,
    requiresPrescription: false,
    stock: 38,
  },
];

export const fetchMedicines = async (): Promise<Medicine[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MEDICINES;
};

export const searchMedicines = async (query: string): Promise<Medicine[]> => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const lowercaseQuery = query.toLowerCase().trim();

  return MEDICINES.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(lowercaseQuery) ||
      medicine.description.toLowerCase().includes(lowercaseQuery) ||
      medicine.category.toLowerCase().includes(lowercaseQuery),
  );
};

export const getMedicineDetails = async (id: string): Promise<Medicine | null> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MEDICINES.find((medicine) => medicine.id === id) ?? null;
};

export const getMedicineByIdSync = (id: string): Medicine | undefined => {
  return MEDICINES.find((medicine) => medicine.id === id);
};
