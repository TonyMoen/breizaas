import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pressKit',
  title: 'Pressepakke',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroImage',
      title: 'Hero bakgrunnsbilde',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero overskrift',
      type: 'string',
      initialValue: 'FOR ARRANGØRER',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero undertekst',
      type: 'string',
      initialValue: 'Pressepakke og rider informasjon',
    }),

    // Technical Rider
    defineField({
      name: 'technicalRiderDescription',
      title: 'Teknisk rider beskrivelse',
      type: 'text',
      initialValue: 'Komplett teknisk rider med stageplot, inputliste, lyd- og lyskrav.',
    }),
    defineField({
      name: 'technicalRiderPdf',
      title: 'Teknisk rider PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),

    // Hospitality Rider
    defineField({
      name: 'hospitalityRider',
      title: 'Hospitality rider',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detaljerte krav for catering, backstage, etc.',
    }),

    // Press Kit Google Drive
    defineField({
      name: 'pressKitDriveUrl',
      title: 'Pressepakke Google Drive URL',
      type: 'url',
    }),
    defineField({
      name: 'pressKitDescription',
      title: 'Pressepakke beskrivelse',
      type: 'text',
      initialValue: 'Last ned komplett pressepakke med bilder, logoer og mer fra Google Drive:',
    }),

    // Artist Bio
    defineField({
      name: 'shortBio',
      title: 'Kort bio (2-3 setninger)',
      type: 'text',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'fullBio',
      title: 'Full bio',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),

    // Press Photos
    defineField({
      name: 'pressPhotos',
      title: 'Pressebilder',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt tekst',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Bildetekst',
              type: 'string',
            },
          ],
        },
      ],
    }),

    // Logo Files
    defineField({
      name: 'logoFiles',
      title: 'Logofiler',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Logo navn',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'file',
              title: 'Logo fil',
              type: 'file',
              options: {
                accept: 'image/png,image/svg+xml,image/jpeg',
              },
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),

    // Booking Contact
    defineField({
      name: 'bookingEmail',
      title: 'Booking e-post',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'bookingPhone',
      title: 'Booking telefon',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heroHeadline',
      media: 'heroImage',
    },
  },
})
