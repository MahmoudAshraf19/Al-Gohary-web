import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '@/hooks/useFirestoreData';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: contactSettings } = useSettings('contact');



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader 
        title={t('nav.contact', 'Contact Us')} 
        description={t('contact.subtitle', 'We\'re here to help. Reach out to us for support, inquiries, or feedback.')} 
      />
      
      <div className="container-page py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-primary mb-4">
                {t('contact.infoTitle', 'Get in Touch')}
              </h2>
              <p className="text-foreground/70 text-lg">
                {t('contact.infoDesc', 'Our support team is available during working hours to assist you with any questions or issues you might have.')}
              </p>
            </div>

            <div className="space-y-6">
              {contactSettings?.['email'] && (
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-4 rounded-2xl text-secondary mt-1">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t('contact.email', 'Email')}</h3>
                    <a href={`mailto:${contactSettings['email']}`} className="text-foreground/70 hover:text-primary transition-colors">{contactSettings['email']}</a>
                  </div>
                </div>
              )}
              
              {(contactSettings?.['phone'] || contactSettings?.['whatsapp']) && (
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary mt-1">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t('contact.phone', 'Phone & WhatsApp')}</h3>
                    {contactSettings?.['phone'] && (
                      <a href={`tel:${contactSettings['phone']}`} className="text-foreground/70 hover:text-primary transition-colors block" dir="ltr">{contactSettings['phone']}</a>
                    )}
                    {contactSettings?.['whatsapp'] && (
                      <a href={`https://wa.me/${contactSettings['whatsapp'].replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-primary transition-colors block" dir="ltr">WhatsApp: {contactSettings['whatsapp']}</a>
                    )}
                  </div>
                </div>
              )}

              {contactSettings?.['website'] && (
                <div className="flex items-start gap-4">
                  <div className="bg-tertiary/20 p-4 rounded-2xl text-tertiary mt-1">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t('contact.website', 'Website')}</h3>
                    <a href={contactSettings['website']} target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-primary transition-colors block">{contactSettings['website']}</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface p-8 md:p-10 rounded-3xl shadow-raised border border-border">
            <h2 className="text-2xl font-bold text-primary mb-6">
              {t('contact.sendMessage', 'Send us a message')}
            </h2>
            
            {isSubmitted ? (
              <div className="bg-success/10 text-success p-6 rounded-2xl text-center border border-success/20">
                <p className="font-semibold text-lg">{t('contact.success', 'Message sent successfully. We will get back to you soon!')}</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">{t('contact.name', 'Name')}</label>
                    <input type="text" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder={t('contact.namePlaceholder', 'Your full name')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">{t('contact.emailLabel', 'Email')}</label>
                    <input type="email" required className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder={t('contact.emailPlaceholder', 'your.email@example.com')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">{t('contact.subject', 'Subject')}</label>
                  <select className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>General Inquiry</option>
                    <option>Service Support</option>
                    <option>Provider Support</option>
                    <option>Technical Issue</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">{t('contact.message', 'Message')}</label>
                  <textarea required rows={5} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none" placeholder={t('contact.messagePlaceholder', 'Please describe your inquiry in detail...')}></textarea>
                </div>
                <Button type="submit" className="w-full py-6 text-lg rounded-xl bg-primary hover:bg-primary/90">
                  {t('contact.sendBtn', 'Send Message')}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
