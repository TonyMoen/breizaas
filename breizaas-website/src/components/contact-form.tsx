"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check } from 'lucide-react';
import { contactSchema, type ContactFormData } from '@/schemas/contact.schema';
import { MESSAGES } from '@/lib/messages';

const WEB3FORMS_ACCESS_KEY = 'e316dc75-0d7f-420a-b35c-511d722428bd';

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: data.name,
          email: data.email,
          message: data.message,
          subject: `Ny kontaktmelding fra ${data.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        reset();
      } else {
        setErrorMessage(result.message || MESSAGES.contact.serverError);
        setSubmitStatus('error');
      }
    } catch {
      setErrorMessage(MESSAGES.contact.networkError);
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className={`${className} text-center py-12`}>
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-gold-champagne/20 p-6">
            <Check className="h-16 w-16 text-gold-champagne" strokeWidth={2.5} />
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-heading text-white-warm mb-2">
          {MESSAGES.contact.success}
        </h3>
      </div>
    );
  }

  return (
    <div className={className}>
      {submitStatus === 'error' && errorMessage && (
        <div className="mb-6 p-4 bg-amber/10 border-2 border-amber rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber flex-shrink-0 mt-0.5" />
          <p className="text-amber text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="text-white-warm font-medium mb-2 block">
            {MESSAGES.contact.name}
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            placeholder={MESSAGES.contact.namePlaceholder}
            className={`
              w-full h-12 bg-brown-medium text-white-warm border-2
              ${errors.name ? 'border-amber' : 'border-brown-light'}
              focus:border-purple-playful focus:ring-2 focus:ring-purple-playful/20
              text-base px-4 rounded-md outline-none transition-colors
            `}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-required="true"
          />
          {errors.name && (
            <p id="name-error" className="text-amber text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-white-warm font-medium mb-2 block">
            {MESSAGES.contact.email}
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder={MESSAGES.contact.emailPlaceholder}
            className={`
              w-full h-12 bg-brown-medium text-white-warm border-2
              ${errors.email ? 'border-amber' : 'border-brown-light'}
              focus:border-purple-playful focus:ring-2 focus:ring-purple-playful/20
              text-base px-4 rounded-md outline-none transition-colors
            `}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-required="true"
          />
          {errors.email && (
            <p id="email-error" className="text-amber text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="text-white-warm font-medium mb-2 block">
            {MESSAGES.contact.message}
          </label>
          <textarea
            id="message"
            {...register('message')}
            placeholder={MESSAGES.contact.messagePlaceholder}
            rows={6}
            className={`
              w-full bg-brown-medium text-white-warm border-2
              ${errors.message ? 'border-amber' : 'border-brown-light'}
              focus:border-purple-playful focus:ring-2 focus:ring-purple-playful/20
              text-base px-4 py-3 rounded-md outline-none transition-colors resize-y
            `}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-required="true"
          />
          {errors.message && (
            <p id="message-error" className="text-amber text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={submitStatus === 'submitting'}
            className="
              w-full bg-purple-playful hover:bg-purple-playful/90
              text-white-warm font-bold py-3 px-8 rounded-md
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
            "
          >
            {submitStatus === 'submitting' ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {MESSAGES.contact.submitting}
              </span>
            ) : (
              MESSAGES.contact.submit
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
