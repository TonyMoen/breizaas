import { z } from 'zod';

const norwegianPhoneRegex = /^(\+47)?[4|9]\d{7}$/;

export const bookingSchema = z.object({
  contactPerson: z.string()
    .min(2, 'Kontaktperson må være minst 2 tegn'),
  organization: z.string()
    .min(2, 'Organisasjon må være minst 2 tegn'),
  email: z.string()
    .email('Vennligst oppgi en gyldig e-postadresse'),
  phone: z.string()
    .regex(norwegianPhoneRegex, 'Ugyldig telefonnummer')
    .optional()
    .or(z.literal('')), // Allow empty string for optional field
  eventType: z.enum([
    'Festival',
    'Konsert',
    'Privat arrangement',
    'Bedriftsarrangement',
    'Annet'
  ], {
    errorMap: () => ({ message: 'Vennligst velg type arrangement' })
  }),
  date: z.string()
    .min(1, 'Dato er påkrevd')
    .refine((date) => new Date(date) > new Date(), {
      message: 'Dato må være i fremtiden',
    }),
  venue: z.string()
    .min(2, 'Sted må være minst 2 tegn'),
  city: z.string()
    .min(2, 'By må være minst 2 tegn'),
  budget: z.string().optional(),
  description: z.string()
    .min(20, 'Beskrivelsen må være minst 20 tegn'),
  requestTechnicalRider: z.boolean().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
