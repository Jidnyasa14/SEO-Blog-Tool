import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/config/db';
import { Tool } from '@/models/Tool';
import { Blog } from '@/models/Blog';

interface IToolDocument {
  slug: string;
  updatedAt?: Date | string;
}

interface IBlogDocument {
  slug: string;
  updatedAt?: Date | string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://toolverse.in';

  // Base static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/tools',
    '/blog',
    '/categories',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  let dynamicToolRoutes: MetadataRoute.Sitemap = [];
  let dynamicBlogRoutes: MetadataRoute.Sitemap = [];

  try {
    await connectToDatabase();

    const tools = await Tool.find({ isActive: true })
      .select('slug updatedAt')
      .lean<IToolDocument[]>();

    dynamicToolRoutes = tools.map((t) => ({
      url: `${baseUrl}/tools/${t.slug}`,
      lastModified: t.updatedAt ? new Date(t.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const blogs = await Blog.find({ status: { $regex: /^published$/i } })
      .select('slug updatedAt')
      .lean<IBlogDocument[]>();

    dynamicBlogRoutes = blogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: b.updatedAt ? new Date(b.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (err) {
    console.error('Failed fetching dynamic routes for sitemap:', err);
  }

  return [...staticRoutes, ...dynamicToolRoutes, ...dynamicBlogRoutes];
}