import { defineType, defineField } from 'sanity';

export const albumSchema = defineType({
  name: 'album',
  title: 'Album',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Album Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'releaseYear',
      title: 'Release Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(2100),
    }),
    defineField({
      name: 'artwork',
      title: 'Album Artwork',
      type: 'image',
      options: {
        hotspot: true, // Enable cropping
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text (Norwegian)',
          type: 'string',
          description: 'Norwegian description for accessibility (e.g., "Albumcover for [title]")',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'spotifyAlbumUrl',
      title: 'Spotify Album URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
        }),
    }),
    defineField({
      name: 'tracks',
      title: 'Tracks',
      type: 'array',
      of: [{ type: 'track' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'releaseYear',
      media: 'artwork',
    },
  },
});
