import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
const siteUrl = (env.VITE_SITE_URL || 'https://acharitiwari.vercel.app').replace(/\/$/, '');
const apiUrl = (env.VITE_API_URL || 'https://api-achar.phoneclubs.com/api').replace(/\/$/, '');

const staticPages = [
  ['/', 'weekly', '1.0'],
  ['/products', 'weekly', '0.9'],
  ['/blog', 'weekly', '0.8'],
  ['/reviews', 'weekly', '0.7'],
  ['/about', 'monthly', '0.6'],
  ['/contact', 'monthly', '0.5'],
  ['/privacy-policy', 'yearly', '0.2'],
  ['/terms-of-service', 'yearly', '0.2'],
  ['/shipping-policy', 'yearly', '0.3'],
  ['/refund-policy', 'yearly', '0.3'],
];

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

async function readCollection(path, key) {
  try {
    const response = await fetch(`${apiUrl}${path}`, { signal: AbortSignal.timeout(10_000) });
    if (!response.ok) return [];
    const body = await response.json();
    return Array.isArray(body?.[key]) ? body[key] : [];
  } catch {
    return [];
  }
}

const [products, posts] = await Promise.all([
  readCollection('/products?status=active', 'products'),
  readCollection('/blog', 'posts'),
]);

const urls = staticPages.map(([path, changefreq, priority]) => ({ path, changefreq, priority }));
products.forEach((product) => {
  const id = product.slug || product._id;
  if (id) urls.push({ path: `/product/${encodeURIComponent(id)}`, changefreq: 'weekly', priority: '0.8', lastmod: product.updatedAt });
});
posts.forEach((post) => {
  const id = post.slug || post._id;
  if (id) urls.push({ path: `/blog/${encodeURIComponent(id)}`, changefreq: 'monthly', priority: '0.7', lastmod: post.updatedAt || post.publishedAt });
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ path, changefreq, priority, lastmod }) => `  <url><loc>${escapeXml(`${siteUrl}${path}`)}</loc>${lastmod ? `<lastmod>${escapeXml(new Date(lastmod).toISOString())}</lastmod>` : ''}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`).join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Disallow: /account
Disallow: /cart
Disallow: /checkout
Disallow: /search

Sitemap: ${siteUrl}/sitemap.xml
`;

await Promise.all([
  writeFile(resolve('public/sitemap.xml'), sitemap, 'utf8'),
  writeFile(resolve('public/robots.txt'), robots, 'utf8'),
]);

console.log(`Generated sitemap with ${urls.length} indexable URLs.`);
