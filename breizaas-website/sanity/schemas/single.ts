import { defineType, defineField } from 'sanity';

export const singleSchema = defineType({
  name: 'single',
  title: 'Single',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Single Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Song Page Address',
      type: 'slug',
      description:
        'The song gets its own page at breizaas.no/<address>, with links to every streaming service. Click Generate. If left empty, the address is made from the title. Do not change it after the link has been shared.',
      options: {
        source: 'title',
        maxLength: 80,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/æ/g, 'ae')
            .replace(/ø/g, 'o')
            .replace(/å/g, 'a')
            .normalize('NFKD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/&/g, ' og ')
            .replace(/['’`´]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 80),
      },
    }),
    defineField({
      name: 'artistLine',
      title: 'Artists',
      type: 'string',
      description:
        'Only for collaborations, e.g. "Breizaas, Tommen". Leave empty when Breizaas is the only artist.',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      description:
        'A date in the future makes the song page show "Kommer <date>" and the pre-save button instead of the listening links.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true, // Enable cropping
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text (Norwegian)',
          type: 'string',
          description: 'Norwegian description for accessibility (e.g., "Coverkunst for [title]")',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'About the Song (Norwegian)',
      type: 'text',
      rows: 3,
      description: 'Optional. One or two sentences shown on the song page. Without it the page shows title, artist and release year.',
    }),
    defineField({
      name: 'presaveUrl',
      title: 'Pre-save URL',
      type: 'url',
      description:
        'Optional. The pre-save link from the distributor (e.g. DistroKid HyperFollow). Shown on the song page until the release date.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
        }),
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
        }),
    }),
    defineField({
      name: 'appleMusicUrl',
      title: 'Apple Music URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
        }),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'The song page also links to YouTube Music with the same video.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
        }),
    }),
    defineField({
      name: 'tidalUrl',
      title: 'Tidal URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
        }),
    }),
    defineField({
      name: 'deezerUrl',
      title: 'Deezer URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
        }),
    }),
    defineField({
      name: 'amazonMusicUrl',
      title: 'Amazon Music URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
        }),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Single',
      type: 'boolean',
      description: 'Display this single as featured banner on homepage (only one should be featured at a time)',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'releaseDate',
      media: 'coverImage',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
