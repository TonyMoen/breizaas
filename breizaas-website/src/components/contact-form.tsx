"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check } from 'lucide-react';
import { contactSchema, type ContactFormData } from '@/schemas/contact.schema';
import { MESSAGES } from '@/lib/messages';

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [csrfToken, setCSRFToken] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  // Fetch CSRF token on component mount (Story 5.5)
  useEffect(() => {
    async function fetchCSRFToken() {
      try {
        const response = await fetch('/api/csrf');
        const data = await response.json();
        setCSRFToken(data.token);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        setErrorMessage(MESSAGES.security.tokenFetchError);
        setSubmitStatus('error');
      }
    }
    fetchCSRFToken();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // Include CSRF token (Story 5.5)
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 403) {
          // CSRF error - refresh token and show error
          setErrorMessage(MESSAGES.security.csrfError);
          // Refresh CSRF token for next attempt
          const tokenResponse = await fetch('/api/csrf');
          const tokenData = await tokenResponse.json();
          setCSRFToken(tokenData.token);
        } else if (response.status === 429) {
          setErrorMessage(MESSAGES.security.rateLimitError);
        } else if (response.status === 400) {
          setErrorMessage(MESSAGES.contact.validationError);
        } else {
          setErrorMessage(MESSAGES.contact.serverError);
        }
        setSubmitStatus('error');
        return;
      }

      setSubmitStatus('success');
      reset();
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
              focus:border-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
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
              focus:border-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
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

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="text-white-warm font-medium mb-2 block">
            {MESSAGES.contact.subject}
          </label>
          <select
            id="subject"
            {...register('subject')}
            className={`
              w-full h-12 bg-brown-medium text-white-warm border-2
              ${errors.subject ? 'border-amber' : 'border-brown-light'}
              focus:border-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
              text-base px-4 rounded-md outline-none transition-colors
            `}
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            aria-required="true"
          >
            <option value="">{MESSAGES.contact.subjectSelectDefault}</option>
            <option value="booking">{MESSAGES.contact.subjectBooking}</option>
            <option value="press">{MESSAGES.contact.subjectPress}</option>
            <option value="general">{MESSAGES.contact.subjectGeneral}</option>
            <option value="other">{MESSAGES.contact.subjectOther}</option>
          </select>
          {errors.subject && (
            <p id="subject-error" className="text-amber text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.subject.message}
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
              focus:border-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
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
