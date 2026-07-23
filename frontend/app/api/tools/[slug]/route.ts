export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/db';
import { Tool } from '@/models/Tool';

async function findTool(identifier: string) {
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
  if (isObjectId) {
    return Tool.findById(identifier);
  }
  return Tool.findOne({ slug: identifier.toLowerCase().trim() });
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

    const tool = await findTool(slug);

    if (!tool) {
      return NextResponse.json({ success: false, message: 'Tool not found.' }, { status: 404 });
    }

    return NextResponse.json(tool, { status: 200 });
  } catch (error: unknown) {
    console.error('🔴 API TOOL SLUG FETCH EXCEPTION:', error);
    const msg = error instanceof Error ? error.message : 'Unknown exception occurred';
    return NextResponse.json({ success: false, message: 'Failed to fetch tool node.', error: msg }, { status: 500 });
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
    const { name, category, description, seoTitle, seoDescription } = body;
    const newSlug = body.slug;

    const tool = await findTool(slug);
    if (!tool) {
      return NextResponse.json({ success: false, message: 'Tool not found.' }, { status: 404 });
    }

    if (name !== undefined) tool.name = name;
    if (newSlug !== undefined) tool.slug = newSlug.toLowerCase().trim();
    if (category !== undefined) tool.category = category;
    if (description !== undefined) tool.description = description;
    if (seoTitle !== undefined) tool.seoTitle = seoTitle;
    if (seoDescription !== undefined) tool.seoDescription = seoDescription;

    await tool.save();

    return NextResponse.json({ success: true, data: tool }, { status: 200 });
  } catch (error: unknown) {
    console.error('🔴 API TOOL UPDATE EXCEPTION:', error);
    const msg = error instanceof Error ? error.message : 'Unknown exception occurred';
    return NextResponse.json({ success: false, message: 'Failed to update tool.', error: msg }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;

    const tool = await findTool(slug);
    if (!tool) {
      return NextResponse.json({ success: false, message: 'Tool not found.' }, { status: 404 });
    }

    await tool.deleteOne();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error('🔴 API TOOL DELETE EXCEPTION:', error);
    const msg = error instanceof Error ? error.message : 'Unknown exception occurred';
    return NextResponse.json({ success: false, message: 'Failed to delete tool.', error: msg }, { status: 500 });
  }
}