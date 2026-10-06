import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface AppSettings {
  aboutUrl?: string;
  appStoreUrl?: string;
  facebook?: string;
  faqUrl?: string;
  helpCenterUrl?: string;
  instagram?: string;
  linkedIn?: string;
  playStoreUrl?: string;
  privacyUrl?: string;
  snapchat?: string;
  supportEmail?: string;
  supportPhone?: string;
  termsUrl?: string;
  tiktok?: string;
  website?: string;
  whatsapp?: string;
  x?: string;
  youtube?: string;
}

export function useSettings() {
  return useQuery({
    queryKey: ['settings', 'general'],
    queryFn: async () => {
      const snap = await getDoc(doc(db, 'settings', 'general'));
      if (snap.exists()) {
        return snap.data() as AppSettings;
      }
      return null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
