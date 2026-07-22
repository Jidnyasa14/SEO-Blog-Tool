export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/db';
import { Tool } from '@/models/Tool'; // Ensure your Mongoose Tool model exists here

export async function GET() {
  try {
    await connectToDatabase();
    const tools = await Tool.find({}).sort({ createdAt: -1 });
    return NextResponse.json(tools, { status: 200 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown exception';
    return NextResponse.json({ success: false, message: 'Failed to extract tools.', error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, slug, category, description, seoTitle, seoDescription } = body;

    if (!name || !slug) {
      return NextResponse.json({ success: false, message: 'Missing required tool fields.' }, { status: 400 });
    }

    const freshTool = await Tool.create({
      name,
      slug: slug.toLowerCase().trim(),
      category: category || 'Finance',
      description: description || '',
      seoTitle: seoTitle || name,
      seoDescription: seoDescription || ''
    });

    return NextResponse.json({ success: true, data: freshTool }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown exception';
    return NextResponse.json({ success: false, message: 'Failed to create tool record.', error: msg }, { status: 500 });
  }
}