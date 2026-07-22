export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/db';
import { Blog } from '@/models/Blog'; // ✅ FIXED: was importing Tool before

// Resolves the [slug] param as either a Mongo _id (used by the admin panel)
// or a real slug (used by the public /blog/[slug] page).
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
    console.error("🔴 API BLOG SLUG FETCH EXCEPTION:", error);
    const msg = error instanceof Error ? error.message : 'Unknown exception occurred';
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
    const { title, category, tags, seoTitle, seoDescription, status, content } = body;
    const newSlug = body.slug;

    const blog = await findBlog(slug);
    if (!blog) {
      return NextResponse.json({ success: false, message: 'Article not found.' }, { status: 404 });
    }

    if (title !== undefined) blog.title = title;
    if (newSlug !== undefined) blog.slug = newSlug.toLowerCase().trim();
    if (category !== undefined) blog.category = category;
    if (tags !== undefined) blog.tags = tags;
    if (seoTitle !== undefined) blog.seoTitle = seoTitle;
    if (seoDescription !== undefined) blog.seoDescription = seoDescription;
    if (status !== undefined) blog.status = status;
    if (content !== undefined) blog.content = content;

    await blog.save();

    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error: unknown) {
    console.error("🔴 API BLOG UPDATE EXCEPTION:", error);
    const msg = error instanceof Error ? error.message : 'Unknown exception occurred';
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
    console.error("🔴 API BLOG DELETE EXCEPTION:", error);
    const msg = error instanceof Error ? error.message : 'Unknown exception occurred';
    return NextResponse.json({ success: false, message: 'Failed to delete article.', error: msg }, { status: 500 });
  }
}