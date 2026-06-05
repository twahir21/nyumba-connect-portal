import { URL_LINK } from '@/tools/url.const';
import { MetadataRoute } from 'next';


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${URL_LINK}`,
      lastModified: new Date(),
      changeFrequency: 'daily', // Ukurasa mkuu unabadilika mara kwa mara
      priority: 1.0,
    },
    {
      url: `${URL_LINK}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${URL_LINK}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${URL_LINK}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly', // Sio kila siku unabadilisha vigezo
      priority: 0.3,
    },
    {
      url: `${URL_LINK}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}