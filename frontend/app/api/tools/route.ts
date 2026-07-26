export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/db';
import { Tool } from '@/models/Tool';

export async function GET() {
  try {
    await connectToDatabase();
    const tools = await Tool.find({}).sort({ createdAt: -1 });
    return NextResponse.json(tools, { status: 200 });
  } catch (error: unknown) {
    console.error('🔴 API TOOLS GET EXCEPTION:', error);
    const msg = error instanceof Error ? error.message : 'Unknown exception';
    return NextResponse.json(
      { success: false, message: 'Failed to extract tools.', error: msg },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, slug, category, description, componentKey, toolType, config, seoTitle, seoDescription } = body;

    const rawName = name || body.title;
    const rawSlug = slug || (rawName ? rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '');

    if (!rawName || !rawSlug) {
      return NextResponse.json(
        { success: false, message: 'Tool name and slug are required.' },
        { status: 400 }
      );
    }

    const cleanSlug = rawSlug.toLowerCase().trim();

    const existingTool = await Tool.findOne({ slug: cleanSlug });
    if (existingTool) {
      return NextResponse.json(
        { success: false, message: 'A tool with this slug already exists.' },
        { status: 409 }
      );
    }

    const freshTool = await Tool.create({
      name: rawName,
      slug: cleanSlug,
      category: category || 'Utility',
      description: description || '',
      componentKey: componentKey || '',
      toolType: toolType || 'custom',
      config: config || undefined,
      seoTitle: seoTitle || rawName,
      seoDescription: seoDescription || ''
    });

    return NextResponse.json({ success: true, data: freshTool }, { status: 201 });
  } catch (error: unknown) {
    console.error('🔴 API TOOL POST EXCEPTION:', error);
    const msg = error instanceof Error ? error.message : 'Unknown exception';
    return NextResponse.json(
      { success: false, message: 'Failed to create tool record.', error: msg },
      { status: 500 }
    );
  }
}