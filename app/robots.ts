import { URL_LINK } from '@/tools/url.const';
import { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: `${URL_LINK}/sitemap.xml`,
  };
}