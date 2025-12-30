import { defineType, defineField } from 'sanity';

export const videoSchema = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title (Norwegian)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: '11-character YouTube video ID (e.g., "dQw4w9WgXcQ")',
      validation: (Rule) =>
        Rule.required()
          .length(11)
          .regex(/^[a-zA-Z0-9_-]{11}$/, {
            name: 'youtube-id',
            invert: false,
          }),
    }),
    defineField({
      name: 'description',
      title: 'Description (Norwegian)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Toggle ON to display this video on the homepage. Only one video should be featured at a time.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'youtubeId',
      featured: 'featured',
    },
    prepare({ title, subtitle, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `YouTube ID: ${subtitle}`,
      };
    },
  },
});
