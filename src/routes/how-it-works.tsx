import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/ui/PageHeader';

export const Route = createFileRoute('/how-it-works')({
  component: HowItWorksPage,
});

function HowItWorksPage() {
  const { t } = useTranslation();

  const steps = [
    { num: "01", title: t('howItWorks.steps.1.title', "Choose a service"), desc: t('howItWorks.steps.1.desc', "Browse through our wide range of service categories.") },
    { num: "02", title: t('howItWorks.steps.2.title', "Select & Communicate"), desc: t('howItWorks.steps.2.desc', "Select the required service and communicate directly with the provider.") },
    { num: "03", title: t('howItWorks.steps.3.title', "Agree on Details"), desc: t('howItWorks.steps.3.desc', "Agree on price, date, time, and location.") },
    { num: "04", title: t('howItWorks.steps.4.title', "Confirm & Receive"), desc: t('howItWorks.steps.4.desc', "Confirm the request and receive the service at your convenience.") },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader 
        title={t('nav.howItWorks', 'How It Works')} 
        description={t('howItWorks.subtitle', 'A simple process to get the services you need.')} 
      />
      
      <div className="container-page py-20 lg:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="text-tertiary text-6xl font-display font-bold opacity-30 mt-1 shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
