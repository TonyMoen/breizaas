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
      of: [
        {
          type: 'block',
          // Styles - define heading levels and normal text
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Overskrift 2', value: 'h2' },
            { title: 'Overskrift 3', value: 'h3' },
          ],
          // Lists - bullet and numbered
          lists: [
            { title: 'Punktliste', value: 'bullet' },
            { title: 'Nummerert liste', value: 'number' },
          ],
          // Marks - bold, italic, underline
          marks: {
            decorators: [
              { title: 'Fet', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
              { title: 'Understreket', value: 'underline' },
            ],
            annotations: [
              {
                title: 'Lenke',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Full biografi med rik tekst formatering (minimum 100 tegn)',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((blocks) => {
            if (!blocks || blocks.length === 0) {
              return 'Biografi er påkrevd';
            }
            // Count total text length
            const text = blocks
              .filter((block: any) => block._type === 'block')
              .map((block: any) =>
                block.children
                  ?.map((child: any) => child.text)
                  .join('')
              )
              .join('');

            if (text.length < 100) {
              return 'Biografi må være minst 100 tegn';
            }
            return true;
          }),
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
