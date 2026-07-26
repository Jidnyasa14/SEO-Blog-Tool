export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/db';
import { Blog } from '@/models/Blog';

export async function GET() {
  try {
    await connectToDatabase();
    const articles = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(articles, { status: 200 });
  } catch (error: unknown) {
    console.error('🔴 API BLOGS GET EXCEPTION:', error);
    const msg = error instanceof Error ? error.message : 'Unknown exception';
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs.', error: msg },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { title, slug, summary, content, category, tags, image, authorName, authorBio, seoTitle, seoDescription, status, readingTime } = body;

    const rawSlug = slug || (title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '');

    if (!title || !rawSlug || !content) {
      return NextResponse.json(
        { success: false, message: 'Title, slug, and content body are required.' },
        { status: 400 }
      );
    }

    const cleanSlug = rawSlug.toLowerCase().trim();

    const existingBlog = await Blog.findOne({ slug: cleanSlug });
    if (existingBlog) {
      return NextResponse.json(
        { success: false, message: 'A blog article with this slug already exists.' },
        { status: 409 }
      );
    }

    const tagArray = typeof tags === 'string' 
      ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) 
      : (Array.isArray(tags) ? tags : []);

    const freshBlog = await Blog.create({
      title,
      slug: cleanSlug,
      summary: summary || '',
      content,
      category: category || 'General',
      tags: tagArray,
      image: image || '',
      authorName: authorName || 'Toolverse',
      authorBio: authorBio || 'Tech & Utilities Insights',
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || summary || '',
      status: status || 'published',
      readingTime: Number(readingTime) || 5,
    });

    return NextResponse.json({ success: true, data: freshBlog }, { status: 201 });
  } catch (error: unknown) {
    console.error('🔴 API BLOG POST EXCEPTION:', error);
    const msg = error instanceof Error ? error.message : 'Unknown exception';
    return NextResponse.json(
      { success: false, message: 'Failed to create blog entry.', error: msg },
      { status: 500 }
    );
  }
}