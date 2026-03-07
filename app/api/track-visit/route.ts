// import { NextResponse } from 'next/server';
// import { getDB } from '@/lib/db/client';

// export async function POST(request: Request) {
//   try {
//     const { page } = await request.json();
    
//     const db = await getDB();
//     await db.collection('visits').insertOne({
//       page,
//       timestamp: new Date(),
//       userAgent: request.headers.get('user-agent') || 'unknown',
//       referer: request.headers.get('referer') || 'direct',
//     });
    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error tracking visit:', error);
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }