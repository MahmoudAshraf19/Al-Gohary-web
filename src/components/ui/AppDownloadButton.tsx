import { useTranslation } from "react-i18next";
import { useFirebaseSettings } from "../../hooks/useFirebaseSettings";
import { Button } from "./button";
import { Smartphone } from "lucide-react";

interface AppDownloadButtonProps {
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
}

export function AppDownloadButton({ className, variant = "default", size = "default" }: AppDownloadButtonProps) {
  const { t } = useTranslation();
  const { versionSettings } = useFirebaseSettings();

  const appLink = versionSettings?.appStoreLink || versionSettings?.googlePlayLink || '/download';

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <a href={appLink} target={appLink.startsWith('http') ? "_blank" : undefined} rel="noreferrer">
        <Smartphone className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
        {t('nav.downloadApp')}
      </a>
    </Button>
  );
}
