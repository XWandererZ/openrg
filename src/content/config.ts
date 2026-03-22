import { defineCollection, z } from 'astro:content';

const talks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    speaker: z.string(),
    affiliation: z.string().optional(),
    slides: z.string().url().optional(),
    recording: z.string().url().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    category: z.enum(['talk', 'introduction', 'discussion']).default('talk'),
  }),
});

export const collections = { talks };
