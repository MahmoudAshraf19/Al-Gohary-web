import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ContactSettings {
  addressAr?: string;
  addressEn?: string;
  address?: string; // Fallback
  email?: string;
  phone?: string;
  whatsapp?: string;
  workingHoursAr?: string;
  workingHoursEn?: string;
  workingHours?: string; // Fallback
}

export function useContactSettings() {
  return useQuery({
    queryKey: ['settings', 'contact'],
    queryFn: async () => {
      console.log("Fetching Contact Settings from Firestore...");
      const snap = await getDoc(doc(db, 'settings', 'contact'));
      if (snap.exists()) {
        const data = snap.data() as ContactSettings;
        console.log("Successfully fetched Contact Settings:", data);
        return data;
      }
      console.log("No Contact Settings found (Document does not exist).");
      return null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
