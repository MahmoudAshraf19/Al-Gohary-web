import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, Building2 } from 'lucide-react';
import { useSettings, useGovernorates } from '../hooks/useFirestoreData';

export const Route = createFileRoute('/coverage')({
  component: Coverage,
});

function Coverage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const { data: addressSettings } = useSettings('address');
  const { data: governorates = [], isLoading: isLoadingGovs } = useGovernorates();

  const availableNowIds = (addressSettings?.['Available_governorates_now'] || []) as string[];
  const comingSoonIds = (addressSettings?.['Governorates_will_be_available_soon'] || []) as string[];

  const availableGovs = governorates.filter(g => availableNowIds.includes(g.id));
  const comingSoonGovs = governorates.filter(g => comingSoonIds.includes(g.id));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-24 relative overflow-hidden">
        <div className="container-page relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            {t('nav.coverage', 'Coverage Areas')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            {t('coverage.subtitle', 'Discover where Al-Gohary services are currently available and where we are heading next.')}
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-secondary/20 rounded-full blur-3xl -z-0 pointer-events-none"></div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container-page max-w-4xl mx-auto space-y-20">
          
          {/* Headquarters */}
          {(addressSettings?.['City'] || addressSettings?.['Country']) && (
            <div className="bg-surface border border-border rounded-3xl p-8 md:p-12 text-center shadow-sm">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Building2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('coverage.hq', 'Headquarters')}</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-2xl font-medium text-foreground/90">
                {addressSettings?.['flag_url'] && (
                  <img src={addressSettings['flag_url']} alt="Flag" className="w-20 h-auto rounded-lg shadow-md border border-border" />
                )}
                <span>
                  {[addressSettings?.['City'], addressSettings?.['Country']].filter(Boolean).join(', ')}
                </span>
              </div>
            </div>
          )}

          {/* Operating Areas */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-3">
                <MapPin className="w-8 h-8 text-tertiary" />
                {t('home.coverageTitle', 'Where We Operate')}
              </h2>
            </div>

            <div className="space-y-16">
              {/* Available Now */}
              {isLoadingGovs ? (
                <div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
              ) : availableGovs.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-border flex-1"></div>
                    <h3 className="text-2xl font-bold text-primary px-4 bg-background inline-flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                      {t('home.availableNow', 'Available Now')}
                    </h3>
                    <div className="h-px bg-border flex-1"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {availableGovs.map(gov => (
                      <div key={gov.id} className="bg-surface border border-primary/20 shadow-sm hover:shadow-md hover:border-primary/50 transition-all rounded-2xl p-4 flex items-center justify-center text-center h-full">
                        <span className="text-lg font-bold text-foreground">
                          {isArabic ? gov['governorate_name_ar'] : gov['governorate_name_en']}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Coming Soon */}
              {!isLoadingGovs && comingSoonGovs.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-border flex-1"></div>
                    <h3 className="text-xl font-bold text-muted-foreground px-4 bg-background inline-flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      {t('home.comingSoon', 'Coming Soon')}
                    </h3>
                    <div className="h-px bg-border flex-1"></div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    {comingSoonGovs.map(gov => (
                      <div key={gov.id} className="bg-muted/50 border border-border rounded-xl px-6 py-3 flex items-center justify-center opacity-70">
                        <span className="text-base font-semibold text-muted-foreground">
                          {isArabic ? gov['governorate_name_ar'] : gov['governorate_name_en']}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
