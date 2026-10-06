import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";
import { useSettings } from "../../hooks/useFirestoreData";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { data: settings } = useSettings('contact');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.home', 'Home'), href: '/' },
    { name: t('nav.about', 'About'), href: '/about' },
    { name: t('nav.services', 'Services'), href: '/services' },
    { name: t('nav.howItWorks', 'How It Works'), href: '/how-it-works' },
    { name: t('nav.becomeProvider', 'Become a Provider'), href: '/become-provider' },
    { name: t('nav.coverage', 'Coverage'), href: '/coverage' },
    { name: t('nav.contact', 'Contact'), href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center gap-3 text-primary">
            <img src="/logo.png" alt="Al-Gohary" className="h-10 w-auto object-contain" />
            <span className="font-display font-bold text-2xl tracking-tight pt-1">
              {t('nav.brand', 'Al-Gohary')}
            </span>
          </Link>
          <div className="hidden gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                activeProps={{ className: "text-primary font-semibold" }}
                activeOptions={{ exact: link.href === '/' }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage} 
            className="text-sm font-medium hover:text-primary transition-colors text-foreground/80"
          >
            {i18n.language === 'en' ? 'العربية' : 'EN'}
          </button>
          
          <div className="hidden md:block">
            {settings?.['appStore'] && (
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                <a href={settings['appStore']} target="_blank" rel="noreferrer">
                  {t('nav.downloadApp', 'Download App')}
                </a>
              </Button>
            )}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={i18n.language === 'ar' ? 'right' : 'left'} className="pr-0 sm:max-w-xs bg-background text-foreground border-border">
              <Link
                to="/"
                className="flex items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <img src="/logo.png" alt="Al-Gohary" className="h-8 w-auto object-contain" />
                <span className="font-display font-bold text-2xl text-primary pt-1">{t('nav.brand', 'Al-Gohary')}</span>
              </Link>
              <div className="my-6 flex flex-col space-y-4 pb-10 pl-6 rtl:pl-0 rtl:pr-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-lg font-medium text-foreground/70 hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                    activeProps={{ className: "text-primary font-semibold" }}
                    activeOptions={{ exact: link.href === '/' }}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="mt-8 pt-4 border-t w-full pr-6 rtl:pr-0 rtl:pl-6">
                  {settings?.['appStore'] && (
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                      <a href={settings['appStore']} target="_blank" rel="noreferrer">
                        {t('nav.downloadApp', 'Download App')}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
