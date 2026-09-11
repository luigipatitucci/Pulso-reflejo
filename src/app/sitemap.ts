import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://gestionreflejo.com';
  return ['', '/quienes-somos', '/training-lab', '/formacion', '/pulso-reflejo', '/autotest', '/contacto'].map(path => ({
    url: `${base}${path}`,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
