// app/api/download/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { url } = await req.json();


  try {
    const response = await fetch(`https://pinterest-downloader-download-pinterest-image-video-and-reels.p.rapidapi.com/pins?url=${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-rapidapi-key': '05ba220621mshef822755e617814p18ef60jsn29256bcce1a0',
        'x-rapidapi-host': 'pinterest-downloader-download-pinterest-image-video-and-reels.p.rapidapi.com',
      }
    });

    const data = await response.json();
   
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
