import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/ui/PageHeader';
import { useSettings } from '@/hooks/useFirestoreData';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  // Fetch from Firestore settings collection using ID 'about_app'
  const { data: aboutData, isLoading } = useSettings('about_app');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader 
        title={t('about.title', 'About Al-Gohary')} 
        description={t('about.subtitle', 'Learn more about our platform and our mission to simplify everyday services.')} 
      />
      
      <div className="container-page py-20 lg:py-28">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded shimmer w-full"></div>
                <div className="h-6 bg-muted rounded shimmer w-5/6"></div>
                <div className="h-6 bg-muted rounded shimmer w-4/6"></div>
                <div className="h-6 bg-muted rounded shimmer w-full mt-8"></div>
                <div className="h-6 bg-muted rounded shimmer w-3/4"></div>
              </div>
            ) : aboutData?.['about_app'] ? (
              <div 
                className="text-foreground/80 leading-relaxed text-lg [&_strong]:text-foreground [&_p]:mb-4"
                dangerouslySetInnerHTML={{ __html: aboutData['about_app'] }}
              />
            ) : (
              <div className="text-center text-muted-foreground py-10">
                {t('about.noContent', 'No content available at the moment.')}
              </div>
            )}
          </div>

          <div className="pt-16 border-t border-border">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary text-center mb-12">
              {t('about.whyChooseUs', 'Why Choose Al-Gohary')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-primary rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('about.w1Title', 'Trusted Providers')}</h3>
                <p className="text-muted-foreground">{t('about.w1Desc', 'We connect you with reliable professionals for high-quality service.')}</p>
              </div>
              <div className="text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-secondary rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('about.w2Title', 'Seamless Experience')}</h3>
                <p className="text-muted-foreground">{t('about.w2Desc', 'Easy to use platform from discovery to service completion.')}</p>
              </div>
              <div className="text-center">
                <div className="bg-tertiary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-tertiary rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('about.w3Title', 'Direct Communication')}</h3>
                <p className="text-muted-foreground">{t('about.w3Desc', 'Chat directly with providers to agree on all necessary details.')}</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
