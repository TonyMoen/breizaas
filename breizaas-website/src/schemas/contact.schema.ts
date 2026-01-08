import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Navn må være minst 2 tegn'),
  email: z.string()
    .email('Vennligst oppgi en gyldig e-postadresse'),
  subject: z.enum([
    'booking',
    'press',
    'general',
    'other'
  ], {
    message: 'Vennligst velg et emne'
  }),
  message: z.string()
    .min(10, 'Meldingen må være minst 10 tegn'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
