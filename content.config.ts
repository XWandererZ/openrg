import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    speaker: z.string(),
    affiliation: z.string().optional(),
    slides: z.string().url().optional(),
    recording: z.string().url().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { talks };
