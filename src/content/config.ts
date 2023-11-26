// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';
// 2. Define your collection(s)
const blogCollection = defineCollection({ 
    schema:z.object({
        title: z.string().max(50,"Maksymalnie 50 znaków"),
        date: z.date(),
        author: z.enum([
            "Tomasz 'GromoTJ' Jankiewicz",
            "Adtrina Rościszewski",
        ]),
        image: z.object({
            src: z.string(),
            alt: z.string(),
        }),
        description: z.string().max(250,"Max 250 znaków"),
        draft: z.boolean().optional().default(false),
        category: z.enum([
            "Za kulisami"
        ]),
    }),
    
});



// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'blog': blogCollection,
};