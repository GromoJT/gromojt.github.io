import { getCollection,type CollectionEntry } from 'astro:content';

import rss from '@astrojs/rss';
import { formatBlogPosts } from '../js/utils';

const postImportResult = await getCollection('blog');
const posts:CollectionEntry<"blog">[] = formatBlogPosts(postImportResult);

export function GET(context) {
  return rss({
    stylesheet: '/rss/styles.xsl',
    // `<title>` field in output xml
    title: 'T&R Blog',
    // `<description>` field in output xml
    description: 'Blog do walki z niczym',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: posts.map((post) => ({
      link:`/blog/${post.slug}`,
      title: post.data.title,
      pubDate:post.data.date,
      description:post.data.description,
      customData: `
        <author>${post.data.author}</author>
      `
    })),
    // (optional) inject custom xml
    customData: `<language>pl-pl</language>`,
  });
}