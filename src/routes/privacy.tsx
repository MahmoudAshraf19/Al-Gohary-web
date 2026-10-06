import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/ui/PageHeader';
import { useSettings } from '@/hooks/useFirestoreData';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const { data: privacyData, isLoading } = useSettings('privacyPolicy');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader 
        title={t('legal.privacy.title', 'Privacy Policy')} 
        description={t('legal.privacy.subtitle', 'Learn how we collect, use, and protect your personal information.')} 
      />
      
      <div className="container-page py-20 lg:py-28">
        <div className="max-w-4xl mx-auto bg-surface p-8 md:p-12 rounded-3xl shadow-soft border border-border">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded shimmer w-full"></div>
                <div className="h-6 bg-muted rounded shimmer w-5/6"></div>
                <div className="h-6 bg-muted rounded shimmer w-4/6"></div>
                <div className="h-6 bg-muted rounded shimmer w-full mt-8"></div>
                <div className="h-6 bg-muted rounded shimmer w-3/4"></div>
              </div>
            ) : privacyData?.['privacy_policy'] ? (
              <div 
                className="text-foreground/80 leading-relaxed text-lg [&_strong]:text-foreground [&_p]:mb-4"
                dangerouslySetInnerHTML={{ __html: privacyData['privacy_policy'] }}
              />
            ) : (
              <div className="text-center text-muted-foreground py-10">
                {t('legal.noContent', 'No content available at the moment.')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
