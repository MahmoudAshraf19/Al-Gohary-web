import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/ui/PageHeader';
import { useCategories } from '../hooks/useFirestoreData';

export const Route = createFileRoute('/services')({
  component: ServicesPage,
});

function ServicesPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const { data: categories = [], isLoading } = useCategories();
  const activeCategories = categories.filter(c => c.available);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader 
        title={t('services.pageTitle', 'Our Services')} 
        description={t('services.pageSubtitle', 'Browse our wide range of service categories to find what you need.')} 
      />
      
      <div className="container-page py-16 lg:py-24">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl aspect-square bg-muted shimmer"></div>
            ))}
          </div>
        ) : activeCategories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activeCategories.map((category) => (
              <div 
                key={category.id} 
                className="group relative rounded-2xl overflow-hidden bg-surface border border-border shadow-soft hover:shadow-raised transition-all cursor-pointer p-8 flex flex-col items-center justify-center text-center gap-6"
              >
                {category.image_url && (
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center p-6">
                    <img 
                      src={category.image_url} 
                      alt={isArabic ? category.name_ar : category.name_en} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      fetchPriority="high"
                    />
                  </div>
                )}
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  {isArabic ? category.name_ar : category.name_en}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground text-lg">
            {t('services.noServices', 'No services available at the moment.')}
          </div>
        )}
      </div>
    </div>
  );
}
