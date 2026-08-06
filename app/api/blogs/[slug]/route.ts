export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/db';
import { Blog } from '@/models/Blog';

async function findBlog(identifier: string) {
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
  if (isObjectId) {
    return Blog.findById(identifier);
  }
  return Blog.findOne({ slug: identifier.toLowerCase().trim() });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ success: false, message: 'Slug parameter is required.' }, { status: 400 });
    }

    const blog = await findBlog(slug);

    if (!blog) {
      return NextResponse.json({ success: false, message: 'Article not found.' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error: unknown) {
    console.error('🔴 API BLOG SLUG FETCH EXCEPTION:', error);
    const msg = error instanceof Error ? error.message : 'Unknown exception';
    return NextResponse.json({ success: false, message: 'Failed to fetch article node.', error: msg }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const body = await request.json();
    const { title, summary, content, category, tags, image, authorName, authorBio, seoTitle, seoDescription, status, readingTime } = body;
    const newSlug = body.slug;

    const blog = await findBlog(slug);
    if (!blog) {
      return NextResponse.json({ success: false, message: 'Article not found.' }, { status: 404 });
    }

    if (title !== undefined) blog.title = title;
    if (newSlug !== undefined) blog.slug = newSlug.toLowerCase().trim();
    if (summary !== undefined) blog.summary = summary;
    if (content !== undefined) blog.content = content;
    if (category !== undefined) blog.category = category;
    if (tags !== undefined) {
      blog.tags = typeof tags === 'string' 
        ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) 
        : tags;
    }
    if (image !== undefined) blog.image = image;
    if (authorName !== undefined) blog.authorName = authorName;
    if (authorBio !== undefined) blog.authorBio = authorBio;
    if (seoTitle !== undefined) blog.seoTitle = seoTitle;
    if (seoDescription !== undefined) blog.seoDescription = seoDescription;
    if (status !== undefined) blog.status = status;
    if (readingTime !== undefined) blog.readingTime = Number(readingTime);

    await blog.save();

    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error: unknown) {
    console.error('🔴 API BLOG UPDATE EXCEPTION:', error);
    const msg = error instanceof Error ? error.message : 'Unknown exception';
    return NextResponse.json({ success: false, message: 'Failed to update article.', error: msg }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;

    const blog = await findBlog(slug);
    if (!blog) {
      return NextResponse.json({ success: false, message: 'Article not found.' }, { status: 404 });
    }

    await blog.deleteOne();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error('🔴 API BLOG DELETE EXCEPTION:', error);
    const msg = error instanceof Error ? error.message : 'Unknown exception';
    return NextResponse.json({ success: false, message: 'Failed to delete article.', error: msg }, { status: 500 });
  }
}