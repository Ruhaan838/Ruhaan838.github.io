import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Return empty array as default
    // In production, you would implement your getPosts logic here
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error in projects API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
