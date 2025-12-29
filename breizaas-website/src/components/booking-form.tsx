"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check } from 'lucide-react';
import { bookingSchema, type BookingFormData } from '@/schemas/booking.schema';
import { MESSAGES } from '@/lib/messages';

interface BookingFormProps {
  className?: string;
}

export function BookingForm({ className = '' }: BookingFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [csrfToken, setCSRFToken] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onBlur', // Real-time validation on blur
    defaultValues: {
      requestTechnicalRider: false,
    },
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

  const onSubmit = async (data: BookingFormData) => {
    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // Include CSRF token (Story 5.5)
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle different error types
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
          setErrorMessage(MESSAGES.booking.validationError);
        } else {
          setErrorMessage(MESSAGES.booking.serverError);
        }
        setSubmitStatus('error');
        return;
      }

      // Success
      setSubmitStatus('success');
      reset(); // Clear form
    } catch {
      setErrorMessage(MESSAGES.booking.networkError);
      setSubmitStatus('error');
    }
  };

  // Success state - replace form with success message
  if (submitStatus === 'success') {
    return (
      <div className={`${className} text-center py-12`}>
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-gold-champagne/20 p-6">
            <Check className="h-16 w-16 text-gold-champagne" strokeWidth={2.5} />
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-heading text-white-warm mb-2">
          {MESSAGES.booking.success}
        </h3>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Error message display */}
      {submitStatus === 'error' && errorMessage && (
        <div className="mb-6 p-4 bg-amber/10 border-2 border-amber rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber flex-shrink-0 mt-0.5" />
          <p className="text-amber text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Person */}
        <div>
          <label htmlFor="contactPerson" className="text-white-warm font-medium mb-2 block">
            {MESSAGES.booking.contactPerson} <span className="text-amber">*</span>
          </label>
          <input
            id="contactPerson"
            type="text"
            {...register('contactPerson')}
            placeholder={MESSAGES.booking.contactPersonPlaceholder}
            className={`
              w-full h-12 bg-brown-medium text-white-warm border-2
              ${errors.contactPerson ? 'border-amber' : 'border-brown-light'}
              focus:border-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
              text-base px-4 rounded-md outline-none transition-colors
            `}
            aria-invalid={errors.contactPerson ? 'true' : 'false'}
            aria-describedby={errors.contactPerson ? 'contactPerson-error' : undefined}
            aria-required="true"
          />
          {errors.contactPerson && (
            <p id="contactPerson-error" className="text-amber text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.contactPerson.message}
            </p>
          )}
        </div>

        {/* Organization */}
        <div>
          <label htmlFor="organization" className="text-white-warm font-medium mb-2 block">
            {MESSAGES.booking.organization} <span className="text-amber">*</span>
          </label>
          <input
            id="organization"
            type="text"
            {...register('organization')}
            placeholder={MESSAGES.booking.organizationPlaceholder}
            className={`
              w-full h-12 bg-brown-medium text-white-warm border-2
              ${errors.organization ? 'border-amber' : 'border-brown-light'}
              focus:border-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
              text-base px-4 rounded-md outline-none transition-colors
            `}
            aria-invalid={errors.organization ? 'true' : 'false'}
            aria-describedby={errors.organization ? 'organization-error' : undefined}
            aria-required="true"
          />
          {errors.organization && (
            <p id="organization-error" className="text-amber text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.organization.message}
            </p>
          )}
        </div>

        {/* Email and Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-white-warm font-medium mb-2 block">
              {MESSAGES.booking.email} <span className="text-amber">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder={MESSAGES.booking.emailPlaceholder}
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

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="text-white-warm font-medium mb-2 block">
              {MESSAGES.booking.phone}
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder={MESSAGES.booking.phonePlaceholder}
              className={`
                w-full h-12 bg-brown-medium text-white-warm border-2
                ${errors.phone ? 'border-amber' : 'border-brown-light'}
                focus:border-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
                text-base px-4 rounded-md outline-none transition-colors
              `}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-amber text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Event Type and Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Type */}
          <div>
            <label htmlFor="eventType" className="text-white-warm font-medium mb-2 block">
              {MESSAGES.booking.eventType} <span className="text-amber">*</span>
            </label>
            <select
              id="eventType"
              {...register('eventType')}
              className={`
                w-full h-12 bg-brown-medium text-white-warm border-2
                ${errors.eventType ? 'border-amber' : 'border-brown-light'}
                focus:border-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
                text-base px-4 rounded-md outline-none transition-colors
              `}
              aria-invalid={errors.eventType ? 'true' : 'false'}
              aria-describedby={errors.eventType ? 'eventType-error' : undefined}
              aria-required="true"
            >
              <option value="">{MESSAGES.booking.eventTypeSelectDefault}</option>
              <option value="Festival">{MESSAGES.booking.eventTypeFestival}</option>
              <option value="Konsert">{MESSAGES.booking.eventTypeKonsert}</option>
              <option value="Privat arrangement">{MESSAGES.booking.eventTypePrivat}</option>
              <option value="Bedriftsarrangement">{MESSAGES.booking.eventTypeBedrift}</option>
              <option value="Annet">{MESSAGES.booking.eventTypeAnnet}</option>
            </select>
            {errors.eventType && (
              <p id="eventType-error" className="text-amber text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.eventType.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="text-white-warm font-medium mb-2 block">
              {MESSAGES.booking.date} <span className="text-amber">*</span>
            </label>
            <input
              id="date"
              type="date"
              {...register('date')}
              className={`
                w-full h-12 bg-brown-medium text-white-warm border-2
                ${errors.date ? 'border-amber' : 'border-brown-light'}
                focus:border-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
                text-base px-4 rounded-md outline-none transition-colors
              `}
              aria-invalid={errors.date ? 'true' : 'false'}
              aria-describedby={errors.date ? 'date-error' : undefined}
              aria-required="true"
            />
            {errors.date && (
              <p id="date-error" className="text-amber text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.date.message}
              </p>
            )}
          </div>
        </div>

        {/* Venue and City Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Venue */}
          <div>
            <label htmlFor="venue" className="text-white-warm font-medium mb-2 block">
              {MESSAGES.booking.venue} <span className="text-amber">*</span>
            </label>
            <input
              id="venue"
              type="text"
              {...register('venue')}
              placeholder={MESSAGES.booking.venuePlaceholder}
              className={`
                w-full h-12 bg-brown-medium text-white-warm border-2
                ${errors.venue ? 'border-amber' : 'border-brown-light'}
                focus:border-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
                text-base px-4 rounded-md outline-none transition-colors
              `}
              aria-invalid={errors.venue ? 'true' : 'false'}
              aria-describedby={errors.venue ? 'venue-error' : undefined}
              aria-required="true"
            />
            {errors.venue && (
              <p id="venue-error" className="text-amber text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.venue.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="text-white-warm font-medium mb-2 block">
              {MESSAGES.booking.city} <span className="text-amber">*</span>
            </label>
            <input
              id="city"
              type="text"
              {...register('city')}
              placeholder={MESSAGES.booking.cityPlaceholder}
              className={`
                w-full h-12 bg-brown-medium text-white-warm border-2
                ${errors.city ? 'border-amber' : 'border-brown-light'}
                focus:border-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
                text-base px-4 rounded-md outline-none transition-colors
              `}
              aria-invalid={errors.city ? 'true' : 'false'}
              aria-describedby={errors.city ? 'city-error' : undefined}
              aria-required="true"
            />
            {errors.city && (
              <p id="city-error" className="text-amber text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.city.message}
              </p>
            )}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className="text-white-warm font-medium mb-2 block">
            {MESSAGES.booking.budget}
          </label>
          <input
            id="budget"
            type="text"
            {...register('budget')}
            placeholder={MESSAGES.booking.budgetPlaceholder}
            className={`
              w-full h-12 bg-brown-medium text-white-warm border-2
              ${errors.budget ? 'border-amber' : 'border-brown-light'}
              focus:border-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
              text-base px-4 rounded-md outline-none transition-colors
            `}
            aria-invalid={errors.budget ? 'true' : 'false'}
            aria-describedby={errors.budget ? 'budget-error' : undefined}
          />
          {errors.budget && (
            <p id="budget-error" className="text-amber text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.budget.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="text-white-warm font-medium mb-2 block">
            {MESSAGES.booking.description} <span className="text-amber">*</span>
          </label>
          <textarea
            id="description"
            {...register('description')}
            placeholder={MESSAGES.booking.descriptionPlaceholder}
            rows={5}
            className={`
              w-full bg-brown-medium text-white-warm border-2
              ${errors.description ? 'border-amber' : 'border-brown-light'}
              focus:border-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
              text-base px-4 py-3 rounded-md outline-none transition-colors resize-y
            `}
            aria-invalid={errors.description ? 'true' : 'false'}
            aria-describedby={errors.description ? 'description-error' : undefined}
            aria-required="true"
          />
          {errors.description && (
            <p id="description-error" className="text-amber text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Technical Rider Checkbox */}
        <div className="flex items-start gap-3">
          <input
            id="requestTechnicalRider"
            type="checkbox"
            {...register('requestTechnicalRider')}
            className="
              mt-1 h-5 w-5 bg-brown-medium border-2 border-brown-light
              text-gold-champagne focus:ring-2 focus:ring-gold-champagne/20
              rounded cursor-pointer
            "
            aria-describedby="requestTechnicalRider-label"
          />
          <label
            id="requestTechnicalRider-label"
            htmlFor="requestTechnicalRider"
            className="text-white-warm font-medium cursor-pointer"
          >
            {MESSAGES.booking.requestTechnicalRider}
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitStatus === 'submitting'}
            className="
              w-full md:w-auto bg-gold-champagne hover:bg-gold-vintage
              text-brown-dark font-bold py-3 px-8 rounded-md
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
              min-w-[200px]
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
                {MESSAGES.booking.submitting}
              </span>
            ) : (
              MESSAGES.booking.submit
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
