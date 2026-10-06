import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../lib/firebase";

export interface VersionSettings {
  appStoreLink?: string;
  app_version?: string;
  googlePlayLink?: string;
  web_version?: string;
  websiteUrl?: string;
}

export interface ContactSettings {
  address?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  workingHours?: string;
}

export function useFirebaseSettings() {
  const [versionSettings, setVersionSettings] = useState<VersionSettings | null>(null);
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const versionRef = ref(db, "settings/Version");
    const contactRef = ref(db, "settings/contact");

    let versionLoaded = false;
    let contactLoaded = false;

    const checkLoading = () => {
      if (versionLoaded && contactLoaded) {
        setLoading(false);
      }
    };

    const unsubscribeVersion = onValue(versionRef, (snapshot) => {
      if (snapshot.exists()) {
        setVersionSettings(snapshot.val());
      }
      versionLoaded = true;
      checkLoading();
    });

    const unsubscribeContact = onValue(contactRef, (snapshot) => {
      if (snapshot.exists()) {
        setContactSettings(snapshot.val());
      }
      contactLoaded = true;
      checkLoading();
    });

    return () => {
      unsubscribeVersion();
      unsubscribeContact();
    };
  }, []);

  return { versionSettings, contactSettings, loading };
}
