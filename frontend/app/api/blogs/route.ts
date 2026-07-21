export const dynamic = 'force-dynamic'; // ✅ Prevents static caching issues

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/db';
import { Blog } from '@/models/Blog';

export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown exception';
    return NextResponse.json({ success: false, message: 'Failed to extract entries.', error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { title, slug, category, tags, seoTitle, seoDescription, status, content } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ success: false, message: 'Missing required validation properties.' }, { status: 400 });
    }

    const freshArticle = await Blog.create({
      title,
      slug: slug.toLowerCase().trim(),
      category: category || 'Finance',
      tags: tags || '',
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || '',
      status: status || 'draft', // Make sure this matches Option A/B casing decisions
      content
    });

    return NextResponse.json({ success: true, data: freshArticle }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown exception';
    return NextResponse.json({ success: false, message: 'Failed to commit record.', error: msg }, { status: 500 });
  }
}