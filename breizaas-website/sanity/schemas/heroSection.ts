import { defineType, defineField } from 'sanity';

export const heroSectionSchema = defineType({
  name: 'heroSection',
  title: 'Hero-seksjon',
  type: 'document',
  fields: [
    defineField({
      name: 'pageName',
      title: 'Side',
      type: 'string',
      description: 'Hvilken side skal denne hero-seksjonen vises på?',
      options: {
        list: [
          { title: 'Forside (/)', value: 'home' },
          { title: 'Musikk (/musikk)', value: 'musikk' },
          { title: 'Om oss (/om-oss)', value: 'om-oss' },
          { title: 'Konserter (/konserter)', value: 'konserter' },
          { title: 'Merch (/merch)', value: 'merch' },
          { title: 'Kontakt (/kontakt)', value: 'kontakt' },
          { title: 'Arrangør (/arrangor)', value: 'arrangor' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Bakgrunnsbilde',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
          description: 'Beskrivelse av bildet for skjermlesere',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Overskrift',
      type: 'string',
      description: 'Hovedoverskrift for hero-seksjonen',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Undertekst',
      type: 'string',
      description: 'Undertekst under overskriften',
      validation: (Rule) => Rule.max(200),
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'pageName',
      media: 'heroImage',
    },
    prepare({ title, subtitle, media }) {
      const pageNames: Record<string, string> = {
        home: 'Forside',
        musikk: 'Musikk',
        'om-oss': 'Om oss',
        konserter: 'Konserter',
        merch: 'Merch',
        kontakt: 'Kontakt',
        arrangor: 'Arrangør',
      };
      return {
        title: title || 'Ingen overskrift',
        subtitle: `Side: ${pageNames[subtitle as string] || subtitle}`,
        media,
      };
    },
  },
});

export default heroSectionSchema;
