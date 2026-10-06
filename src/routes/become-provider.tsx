import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Wrench, CircleDollarSign, Users, Headset } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useSettings } from '../hooks/useFirestoreData';

export const Route = createFileRoute('/become-provider')({
  component: BecomeProviderPage,
});

function BecomeProviderPage() {
  const { t } = useTranslation();
  const { data: settings } = useSettings('contact');
  
  const appStoreLink = settings?.['appStore'] || '#';

  return (
    <div className="flex flex-col min-h-screen bg-background items-center py-12 md:py-20">
      <div className="container-page max-w-2xl w-full flex flex-col items-stretch">
        
        {/* Top Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Wrench className="w-12 h-12" />
          </div>
        </div>
        
        {/* Title and Subtitle */}
        <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground text-center mb-4">
          {t('provider.landingTitle', 'Become a Provider')}
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 text-center mb-12 max-w-md mx-auto leading-relaxed">
          {t('provider.landingDesc', 'Join us and start your journey as a verified provider.')}
        </p>
        
        {/* Benefits List */}
        <div className="space-y-6 mb-16">
          <BenefitItem 
            icon={<CircleDollarSign className="w-7 h-7 text-primary" />}
            title={t('provider.earnIncome', 'Earn Income')}
            description={t('provider.earnIncomeDesc', 'Turn your skills into a steady source of income.')}
          />
          <BenefitItem 
            icon={<Users className="w-7 h-7 text-primary" />}
            title={t('provider.reachCustomers', 'Reach More Customers')}
            description={t('provider.reachCustomersDesc', 'Connect with trusted customers looking for your services.')}
          />
          <BenefitItem 
            icon={<Headset className="w-7 h-7 text-primary" />}
            title={t('provider.getSupport', 'Get Full Support')}
            description={t('provider.getSupportDesc', 'We are with you at every step of your journey.')}
          />
        </div>
        
        {/* Actions */}
        <div className="flex flex-col space-y-4 mt-auto">
          <Button asChild className="w-full py-7 text-lg rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md">
            <a href={appStoreLink} target="_blank" rel="noreferrer">
              {t('provider.startApplication', 'Start Application')}
            </a>
          </Button>
          
          <Button asChild variant="outline" className="w-full py-7 text-lg rounded-xl border-2 border-primary text-primary hover:bg-primary/5 font-bold">
            <a href={appStoreLink} target="_blank" rel="noreferrer">
              {t('provider.checkStatus', 'Check Status')}
            </a>
          </Button>
        </div>
        
      </div>
    </div>
  );
}

function BenefitItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-start gap-5 p-2">
      <div className="bg-primary/10 p-4 rounded-2xl flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-col pt-1">
        <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
        <p className="text-foreground/70 text-base">{description}</p>
      </div>
    </div>
  );
}
