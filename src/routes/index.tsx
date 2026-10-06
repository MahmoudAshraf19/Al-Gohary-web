import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useRef, useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { PhoneMockup } from '../components/ui/PhoneMockup';
import appleIcon from '../assets/icons/apple.png';
import googleIcon from '../assets/icons/google.png';
import { ShieldCheck, Search, Star, Wrench, Zap, Clock, MapPin } from 'lucide-react';
import { useSettings, useCategories, useGovernorates } from '../hooks/useFirestoreData';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const { data: settings } = useSettings('contact');
  const { data: addressSettings } = useSettings('address');
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const { data: governorates = [] } = useGovernorates();
  const activeCategories = categories.filter(c => c.available);

  const availableNowIds = (addressSettings?.['Available_governorates_now'] || []) as string[];
  const comingSoonIds = (addressSettings?.['Governorates_will_be_available_soon'] || []) as string[];

  const availableGovs = governorates.filter(g => availableNowIds.includes(g.id));
  const comingSoonGovs = governorates.filter(g => comingSoonIds.includes(g.id));

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    const scrollContainer = scrollRef.current;
    
    if (!scrollContainer) return;

    const scroll = () => {
      if (!isHovering) {
        const prevScroll = scrollContainer.scrollLeft;
        // In RTL, 0 is right, scrolling left means decreasing scrollLeft
        scrollContainer.scrollLeft += isArabic ? -1 : 1; 
        
        // If it didn't move, we hit the boundary. Reset to 0 (start).
        if (scrollContainer.scrollLeft === prevScroll) {
            scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovering, isArabic, activeCategories.length]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-24 md:pt-24 md:pb-32 bg-background relative overflow-hidden">
        <div className="container-page relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col items-start space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-primary leading-[1.1]">
              {t('hero.headline', 'Your Trusted Platform for Everyday Services.')}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-[600px] leading-relaxed">
              {t('hero.subheadline', 'Connect with reliable professionals for maintenance, cleaning, electrical, and plumbing services instantly.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary-dark text-primary-foreground shadow-raised cursor-pointer"
                onClick={() => document.getElementById('download-app-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('nav.downloadApp', 'Download the App')}
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-lg px-8 py-6 rounded-full border-2 border-secondary text-secondary hover:bg-secondary/5">
                <Link to="/services">
                  {t('hero.explore', 'Explore Services')}
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative lg:ml-auto w-full flex justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-tertiary/30 rounded-full blur-3xl"></div>
            {/* The main hero app screenshot */}
            <PhoneMockup
              images={[
                "https://firebasestorage.googleapis.com/v0/b/naslookapp-ecf15.firebasestorage.app/o/screens%2Fs1%20(1).jpg?alt=media&token=93f0a60d-ed51-4231-be3d-0764dc4cb9fb",
                "https://firebasestorage.googleapis.com/v0/b/naslookapp-ecf15.firebasestorage.app/o/screens%2Fs1%20(2).jpg?alt=media&token=f3de83d4-42ad-4853-b4a0-a6ba1b87692e",
                "https://firebasestorage.googleapis.com/v0/b/naslookapp-ecf15.firebasestorage.app/o/screens%2Fs1%20(3).jpg?alt=media&token=4618555b-cdbf-4263-99d1-b58703054112",
                "https://firebasestorage.googleapis.com/v0/b/naslookapp-ecf15.firebasestorage.app/o/screens%2Fs1%20(4).jpg?alt=media&token=2fbd81cb-3f49-457c-a5c7-bf2cfa3dc6f6"
              ]}
              alt="Al-Gohary App Home Screen"
              className="lg:max-w-[320px] xl:max-w-[360px] relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Services Discovery Section */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-primary">
              {t('home.discoverTitle', 'Explore Our Categories')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              {t('home.discoverDesc', 'From basic repairs to complex installations, we have the right professionals for you.')}
            </p>
          </div>

          <div 
            ref={scrollRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={() => setIsHovering(true)}
            onTouchEnd={() => setIsHovering(false)}
            className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 hide-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0"
          >
            {isLoadingCategories ? (
              // Loading skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-3xl w-[200px] shrink-0 aspect-square bg-muted shimmer"></div>
              ))
            ) : activeCategories.length > 0 ? (
              activeCategories.map((category, i) => (
                <div key={i} className="group relative rounded-3xl overflow-hidden w-[200px] md:w-[240px] shrink-0 aspect-square bg-muted shadow-sm hover:shadow-raised transition-shadow cursor-pointer flex flex-col items-center justify-center p-6 border border-border">
                  {category.image_url && (
                    <img
                      src={category.image_url}
                      alt={isArabic ? category.name_ar : category.name_en}
                      className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-500 mb-4"
                      fetchPriority="high"
                    />
                  )}
                  <h3 className="text-xl font-bold text-foreground text-center">
                    {isArabic ? category.name_ar : category.name_en}
                  </h3>
                </div>
              ))
            ) : (
              // Fallback if no types found
              ['Plumbing', 'Electrical', 'Cleaning', 'Maintenance'].map((type, i) => (
                <div key={i} className="group relative rounded-3xl overflow-hidden w-[200px] shrink-0 aspect-square bg-muted shimmer flex items-center justify-center">
                  <h3 className="text-xl font-bold text-muted-foreground">{type}</h3>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-primary text-primary hover:bg-primary/5">
              <Link to="/services">{t('home.viewAllServices', 'View All Services')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-background">
        <div className="container-page">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-primary">
              {t('home.howItWorksTitle', 'How Al-Gohary Works')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              {t('home.howItWorksDesc', 'Getting your work done is simpler than ever.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { num: "01", title: t('home.steps.discover.title', "Find Service"), desc: t('home.steps.discover.desc', "Browse categories and select what you need.") },
              { num: "02", title: t('home.steps.choose.title', "Connect"), desc: t('home.steps.choose.desc', "Chat directly with skilled professionals.") },
              { num: "03", title: t('home.steps.book.title', "Agree"), desc: t('home.steps.book.desc', "Agree on price, time, and details securely.") },
              { num: "04", title: t('home.steps.enjoy.title', "Done"), desc: t('home.steps.enjoy.desc', "Receive the service and rate your experience.") },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="text-secondary text-6xl font-display font-bold mb-6 opacity-30">
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{step.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col space-y-10 z-30">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                {t('home.experience.title', 'Quality service, right at your doorstep.')}
              </h2>
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                {t('home.experience.desc', "We ensure you connect with only the best, vetted professionals in your area to guarantee satisfaction.")}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1 bg-tertiary/20 p-3 rounded-xl h-fit text-tertiary"><ShieldCheck /></div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('home.features.secure.title', 'Vetted Professionals')}</h3>
                  <p className="text-primary-foreground/80">{t('home.features.secure.desc', 'All providers pass strict background checks before joining.')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-tertiary/20 p-3 rounded-xl h-fit text-tertiary"><Clock /></div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('home.features.fast.title', 'Fast Response')}</h3>
                  <p className="text-primary-foreground/80">{t('home.features.fast.desc', 'Get immediate responses and schedule services at your convenience.')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-tertiary/20 p-3 rounded-xl h-fit text-tertiary"><Star /></div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('home.features.quality.title', 'Quality Assured')}</h3>
                  <p className="text-primary-foreground/80">{t('home.features.quality.desc', 'Real ratings and reviews ensure you get top-notch service every time.')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/30 rounded-full blur-3xl"></div>
            <PhoneMockup
              images={[
                "https://firebasestorage.googleapis.com/v0/b/naslookapp-ecf15.firebasestorage.app/o/screens%2Fs1%20(5).jpg?alt=media&token=9638dda0-5037-4693-b688-7f3f32a35f66",
                "https://firebasestorage.googleapis.com/v0/b/naslookapp-ecf15.firebasestorage.app/o/screens%2Fs1%20(6).jpg?alt=media&token=fd9d1cd7-42a4-40e1-928c-878609ae8fe3",
                "https://firebasestorage.googleapis.com/v0/b/naslookapp-ecf15.firebasestorage.app/o/screens%2Fs1%20(7).jpg?alt=media&token=4e4bf0d6-0430-434d-9fce-d85d6f1dfbba",
                "https://firebasestorage.googleapis.com/v0/b/naslookapp-ecf15.firebasestorage.app/o/screens%2Fs1%20(1).jpg?alt=media&token=93f0a60d-ed51-4231-be3d-0764dc4cb9fb"
              ]}
              alt="Al-Gohary App Search Screen"
              className="relative z-10 lg:max-w-[340px] transform rotate-3 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Governorates Section */}
      <section className="py-24 bg-background border-t border-border overflow-hidden">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-primary flex items-center justify-center gap-4">
              <MapPin className="w-10 h-10 text-tertiary" />
              {t('home.coverageTitle', 'Where We Operate')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              {t('home.coverageDesc', 'We are rapidly expanding to bring Al-Gohary services to every corner of the country.')}
            </p>
          </div>

          <div className="space-y-16 max-w-5xl mx-auto">
            {/* Available Now */}
            {availableGovs.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px bg-border flex-1"></div>
                  <h3 className="text-2xl font-bold text-primary px-4 bg-background inline-flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                    {t('home.availableNow', 'Available Now')}
                  </h3>
                  <div className="h-px bg-border flex-1"></div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  {availableGovs.map(gov => (
                    <div key={gov.id} className="bg-surface border border-primary/20 shadow-sm hover:shadow-md hover:border-primary/50 hover:-translate-y-1 transition-all rounded-2xl px-8 py-4 flex items-center justify-center">
                      <span className="text-lg font-bold text-foreground">
                        {isArabic ? gov['governorate_name_ar'] : gov['governorate_name_en']}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Coming Soon */}
            {comingSoonGovs.length > 0 && (
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
      </section>

      {/* Download App CTA */}
      <section id="download-app-section" className="py-24 bg-surface text-center">
        <div className="container-page max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-primary">
            {t('home.cta.title', 'Ready to get started?')}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {settings?.['appStore'] && (
              <a href={settings['appStore']} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-xl text-lg font-semibold hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-md">
                <img src={appleIcon} alt="Apple" className="w-6 h-6 object-contain filter invert" />
                <span>{t('home.cta.appstore', 'Download on the App Store')}</span>
              </a>
            )}
            {settings?.['playStore'] && (
              <a href={settings['playStore']} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-xl text-lg font-semibold hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-md">
                <img src={googleIcon} alt="Google Play" className="w-6 h-6 object-contain filter invert" />
                <span>{t('home.cta.googleplay', 'Get it on Google Play')}</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
