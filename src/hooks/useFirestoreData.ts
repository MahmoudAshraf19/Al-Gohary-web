import { useQuery } from '@tanstack/react-query';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useSettings(documentId: string) {
  return useQuery({
    queryKey: ['settings', documentId],
    queryFn: async () => {
      const snap = await getDoc(doc(db, 'settings', documentId));
      if (snap.exists()) {
        return snap.data();
      }
      return null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any[];
    },
    staleTime: 1000 * 60 * 5,
  });
}
export function useGovernorates() {
  return useQuery({
    queryKey: ['governorates'],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, 'governorates'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any[];
    },
    staleTime: 1000 * 60 * 60, // 1 hour cache, governorates rarely change
  });
}
