import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Instagram, Twitter, Linkedin, Facebook, Youtube } from "lucide-react";
import { useSettings } from "../../hooks/useFirestoreData";

export function Footer() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const { data: contactSettings } = useSettings('contact');
  const { data: socialSettings } = useSettings('social_media');
  const { data: addressSettings } = useSettings('address');

  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="container-page py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block flex items-center gap-3 mb-6">
              <div className="bg-white p-1.5 rounded-xl">
                <img src="/logo.png" alt="Al-Gohary" className="h-10 w-auto object-contain" />
              </div>
              <span className="font-display font-bold text-3xl tracking-tight text-tertiary pt-1">Al-Gohary</span>
            </Link>
            <p className="mb-8 max-w-xs text-base text-primary-foreground/80 leading-relaxed">
              {t('footer.brandDesc', 'Your trusted platform for everyday services. Connecting you with reliable professionals easily and securely.')}
            </p>
            <div className="flex gap-4">
              {socialSettings?.['instagram'] && (
                <a href={socialSettings['instagram']} target="_blank" rel="noreferrer" className="text-primary-foreground/80 hover:text-tertiary transition-colors cursor-pointer">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialSettings?.['twitter'] && (
                <a href={socialSettings['twitter']} target="_blank" rel="noreferrer" className="text-primary-foreground/80 hover:text-tertiary transition-colors cursor-pointer">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {socialSettings?.['linkedin'] && (
                <a href={socialSettings['linkedin']} target="_blank" rel="noreferrer" className="text-primary-foreground/80 hover:text-tertiary transition-colors cursor-pointer">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {socialSettings?.['facebook'] && (
                <a href={socialSettings['facebook']} target="_blank" rel="noreferrer" className="text-primary-foreground/80 hover:text-tertiary transition-colors cursor-pointer">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {socialSettings?.['youtube'] && (
                <a href={socialSettings['youtube']} target="_blank" rel="noreferrer" className="text-primary-foreground/80 hover:text-tertiary transition-colors cursor-pointer">
                  <Youtube className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider text-tertiary uppercase">{t('footer.explore', 'Explore')}</h3>
            <ul className="space-y-4 text-base text-primary-foreground/80">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">{t('nav.home', 'Home')}</Link></li>
              <li><Link to="/services" className="hover:text-primary-foreground transition-colors">{t('nav.services', 'Services')}</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary-foreground transition-colors">{t('nav.howItWorks', 'How It Works')}</Link></li>
              <li><Link to="/become-provider" className="hover:text-primary-foreground transition-colors">{t('nav.becomeProvider', 'Become a Provider')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider text-tertiary uppercase">{t('footer.company', 'Company')}</h3>
            <ul className="space-y-4 text-base text-primary-foreground/80">
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">{t('nav.about', 'About')}</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">{t('nav.contact', 'Contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider text-tertiary uppercase">{t('footer.legal', 'Legal')}</h3>
            <ul className="space-y-4 text-base text-primary-foreground/80">
              <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">{t('footer.privacy', 'Privacy Policy')}</Link></li>
              <li><Link to="/terms" className="hover:text-primary-foreground transition-colors">{t('footer.terms', 'Terms & Conditions')}</Link></li>
              <li><Link to="/refund-policy" className="hover:text-primary-foreground transition-colors">{t('footer.refundPolicy', 'Refund Policy')}</Link></li>
              <li><Link to="/account-deletion" className="hover:text-primary-foreground transition-colors">{t('footer.accountDeletion', 'Account Deletion')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider text-tertiary uppercase">{t('footer.download', 'Download')}</h3>
            <ul className="space-y-4 text-base text-primary-foreground/80">
              {contactSettings?.['appStore'] && <li><a href={contactSettings['appStore']} target="_blank" rel="noreferrer" className="hover:text-primary-foreground transition-colors">App Store</a></li>}
              {contactSettings?.['playStore'] && <li><a href={contactSettings['playStore']} target="_blank" rel="noreferrer" className="hover:text-primary-foreground transition-colors">Google Play</a></li>}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 flex flex-col items-center justify-between border-t border-primary-foreground/10 pt-8 sm:flex-row">
          <p className="text-sm text-primary-foreground/60 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Al-Gohary. {t('footer.allRightsReserved', 'All rights reserved.')}
          </p>
          <div className="flex flex-col items-center space-y-2 sm:items-end">
            {(addressSettings?.['City'] || addressSettings?.['Country']) && (
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                {addressSettings?.['flag_url'] && (
                  <img src={addressSettings['flag_url']} alt="Flag" className="w-5 h-auto rounded-sm" />
                )}
                <span>
                  {[addressSettings?.['City'], addressSettings?.['Country']].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
            <div className="flex space-x-4 rtl:space-x-reverse text-sm mt-2">
              <button 
                onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                className="text-primary-foreground/80 hover:text-tertiary transition-colors font-medium"
              >
                {isArabic ? 'English' : 'العربية'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
