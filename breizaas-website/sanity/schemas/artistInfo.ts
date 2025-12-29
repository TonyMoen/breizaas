import { defineType, defineField } from 'sanity';

export const artistInfoSchema = defineType({
  name: 'artistInfo',
  title: 'Artistinformasjon',
  type: 'document',
  fields: [
    defineField({
      name: 'artistName',
      title: 'Artistnavn',
      type: 'string',
      initialValue: 'Breizaas',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Slagord',
      type: 'string',
      description: 'Kort beskrivelse, f.eks. "AI møter norsk festmusikk"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'biography',
      title: 'Biografi',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full biografi med rik tekst formatering',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'shortBio',
      title: 'Kort biografi',
      type: 'text',
      rows: 3,
      description: 'Kort biografi mellom 150-200 tegn',
      validation: (Rule) =>
        Rule.required()
          .min(150)
          .max(200)
          .error('Kort biografi må være mellom 150-200 tegn'),
    }),
    defineField({
      name: 'monthlyListeners',
      title: 'Månedlige lyttere',
      type: 'number',
      description: 'Antall månedlige lyttere på Spotify',
      validation: (Rule) =>
        Rule.required()
          .positive()
          .error('Månedlige lyttere må være et positivt tall'),
    }),
    defineField({
      name: 'totalStreams',
      title: 'Totale avspillinger',
      type: 'number',
      description: 'Totalt antall avspillinger på tvers av plattformer',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'numberOfReleases',
      title: 'Antall utgivelser',
      type: 'number',
      description: 'Totalt antall utgivelser (album, singler, EP)',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'notableAchievements',
      title: 'Prestasjoner',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Liste over bemerkelsesverdige prestasjoner',
    }),
    defineField({
      name: 'genreTags',
      title: 'Sjanger',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Bygdemusikk', 'Festmusikk', 'AI-generert'],
      description: 'Sjangre og stiler',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'socialMediaLinks',
      title: 'Sosiale medier',
      type: 'object',
      fields: [
        {
          name: 'spotify',
          title: 'Spotify URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['https'],
            }),
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['https'],
            }),
        },
        {
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['https'],
            }),
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['https'],
            }),
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['https'],
            }),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'artistName',
      subtitle: 'tagline',
    },
  },
});

export default artistInfoSchema;
