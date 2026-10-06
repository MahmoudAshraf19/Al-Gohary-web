import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/ui/PageHeader';
import { useSettings } from '../hooks/useFirestoreData';

export const Route = createFileRoute('/account-deletion')({
  component: AccountDeletionPage,
});

function AccountDeletionPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const { data: deletionData, isLoading } = useSettings('accountDeletion');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader 
        title={t('legal.accountDeletion.title', 'Account Deletion Policy')} 
        description={t('legal.accountDeletion.subtitle', 'Learn how you can request to delete your account and data.')} 
      />
      
      <div className="container-page py-20 lg:py-28">
        <div className="max-w-4xl mx-auto bg-surface p-8 md:p-12 rounded-3xl shadow-soft border border-border">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded shimmer w-full"></div>
                <div className="h-6 bg-muted rounded shimmer w-5/6"></div>
                <div className="h-6 bg-muted rounded shimmer w-4/6"></div>
              </div>
            ) : deletionData ? (
              <div className="whitespace-pre-line text-foreground/80 leading-relaxed text-lg">
                {isArabic 
                  ? (deletionData.content_ar || deletionData.content || t('legal.noContent', 'لا يوجد محتوى متاح.'))
                  : (deletionData.content_en || deletionData.content || t('legal.noContent', 'No content available.'))
                }
              </div>
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
