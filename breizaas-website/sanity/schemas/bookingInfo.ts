import { defineType, defineField } from 'sanity';

export const bookingInfoSchema = defineType({
  name: 'bookingInfo',
  title: 'Bookinginfo',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Firmanavn',
      type: 'string',
      description: 'Navn på bookingfirma (vises på kontaktsiden)',
      initialValue: 'Aronsen Booking',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
      description: 'Booking e-postadresse',
      validation: (Rule) =>
        Rule.required()
          .email()
          .error('Må være en gyldig e-postadresse'),
    }),
    defineField({
      name: 'phone',
      title: 'Telefonnummer',
      type: 'string',
      description: 'Booking telefonnummer (norsk format)',
      validation: (Rule) =>
        Rule.required()
          .regex(/^[\d\s\+\-\(\)]+$/, {
            name: 'phone',
            invert: false,
          })
          .error('Må være et gyldig telefonnummer'),
    }),
    defineField({
      name: 'displayPhone',
      title: 'Telefonnummer (visningsformat)',
      type: 'string',
      description: 'Hvordan telefonnummeret skal vises (f.eks. "928 91 523")',
      initialValue: '928 91 523',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'email',
    },
  },
});

export default bookingInfoSchema;
