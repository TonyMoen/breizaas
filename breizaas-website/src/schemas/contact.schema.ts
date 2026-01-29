import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Namn må vera minst 2 teikn'),
  email: z.string()
    .email('Venlegst oppgje ei gyldig e-postadresse'),
  message: z.string()
    .min(10, 'Meldinga må vera minst 10 teikn'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
