import { defineType, defineField } from 'sanity';

export const trackSchema = defineType({
  name: 'track',
  title: 'Track',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Track Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'title',
      title: 'Track Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Format: "3:45"',
      validation: (Rule) =>
        Rule.required().regex(/^\d+:\d{2}$/, {
          name: 'duration-format',
          invert: false,
        }),
    }),
    defineField({
      name: 'spotifyTrackUrl',
      title: 'Spotify Track URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'duration',
      number: 'number',
    },
    prepare({ title, subtitle, number }) {
      return {
        title: `${number}. ${title}`,
        subtitle,
      };
    },
  },
});
