'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

interface InquiryEngineProps {
  className?: string;
}

export default function InquiryEngine({ className = '' }: InquiryEngineProps) {
  const t = useTranslations();
  
  const [name, setName] = useState('');
  const [method, setMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Required';
    
    if (!contactInfo.trim()) {
      newErrors.contactInfo = 'Required';
    } else if (method === 'email' && !/^\S+@\S+\.\S+$/.test(contactInfo)) {
      newErrors.contactInfo = 'Invalid email';
    }
    
    if (!message.trim()) newErrors.message = 'Required';
    if (!privacyConsent) newErrors.privacyConsent = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Contact target configurations
    const targetEmail = 'carlosjo.da@gmail.com';
    const targetPhone = '31657479978';

    const subject = `Inquiry from ${name}`;
    let body = `Name: ${name}\n`;
    body += `Contact (${method}): ${contactInfo}\n\n`;
    body += `Message:\n${message}`;

    let url = '';
    if (method === 'whatsapp') {
      const text = encodeURIComponent(body);
      url = `https://wa.me/${targetPhone}?text=${text}`;
    } else {
      const mailtoSubject = encodeURIComponent(subject);
      const mailtoBody = encodeURIComponent(body);
      url = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    }

    // Open URL
    window.open(url, '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`p-8 bg-secondary-bg border border-border rounded text-center ${className}`}>
        <h3 className="font-display text-2xl uppercase mb-4 text-white">{t('contact.title')}</h3>
        <p className="text-accent-gold">{t('contact.successMsg')}</p>
        <button 
          onClick={() => {
            setSubmitted(false);
            setName('');
            setContactInfo('');
            setMessage('');
            setPrivacyConsent(false);
          }}
          className="mt-6 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold uppercase tracking-wider text-sm transition-colors rounded"
        >
          {t('common.back')}
        </button>
      </div>
    );
  }

  return (
    <div className={`p-8 bg-secondary-bg border border-border rounded ${className}`}>
      <h3 className="font-display text-3xl uppercase mb-2 text-white">{t('contact.title')}</h3>
      <p className="text-zinc-400 mb-8">{t('contact.subtitle')}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6" data-testid="inquiry-form">
        <div>
          <label className="block text-sm text-zinc-400 uppercase tracking-widest mb-2">
            {t('contact.nameLabel')}
          </label>
          <input 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
            className={`w-full bg-primary-bg border ${errors.name ? 'border-red-500' : 'border-border'} text-white p-3 rounded focus:outline-none focus:border-accent-gold transition-colors`}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm text-zinc-400 uppercase tracking-widest mb-3">
              {t('common.type')}
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center cursor-pointer text-white">
                <input 
                  type="radio" 
                  name="method" 
                  value="whatsapp" 
                  checked={method === 'whatsapp'} 
                  onChange={() => setMethod('whatsapp')}
                  className="mr-2 accent-accent-gold"
                />
                WhatsApp
              </label>
              <label className="flex items-center cursor-pointer text-white">
                <input 
                  type="radio" 
                  name="method" 
                  value="email" 
                  checked={method === 'email'} 
                  onChange={() => setMethod('email')}
                  className="mr-2 accent-accent-gold"
                />
                E-mail
              </label>
            </div>
          </div>
          
          <div className="flex-2 w-full">
            <label className="block text-sm text-zinc-400 uppercase tracking-widest mb-2">
              {method === 'whatsapp' ? t('contact.phoneLabel') : t('contact.emailLabel')}
            </label>
            <input 
              type={method === 'email' ? 'email' : 'text'} 
              value={contactInfo}
              onChange={e => setContactInfo(e.target.value)}
              className={`w-full bg-primary-bg border ${errors.contactInfo ? 'border-red-500' : 'border-border'} text-white p-3 rounded focus:outline-none focus:border-accent-gold transition-colors`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 uppercase tracking-widest mb-2">
            {t('contact.messageLabel')}
          </label>
          <textarea 
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            className={`w-full bg-primary-bg border ${errors.message ? 'border-red-500' : 'border-border'} text-white p-3 rounded focus:outline-none focus:border-accent-gold transition-colors`}
          />
        </div>

        <div>
          <label className="flex items-start cursor-pointer text-zinc-300">
            <input 
              type="checkbox" 
              checked={privacyConsent}
              onChange={e => setPrivacyConsent(e.target.checked)}
              className="mt-1 mr-3 accent-accent-gold"
              data-testid="privacy-checkbox"
            />
            <span className={`text-sm ${errors.privacyConsent ? 'text-red-400' : ''}`}>
              {t('contact.privacyConsent')}
            </span>
          </label>
        </div>

        <button 
          type="submit"
          className="w-full bg-accent-gold text-primary-bg font-display uppercase tracking-widest py-4 rounded hover:bg-white transition-colors"
        >
          {t('contact.submitBtn')}
        </button>
      </form>
    </div>
  );
}
