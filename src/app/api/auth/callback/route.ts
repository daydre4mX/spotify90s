// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!);
  params.append('client_id', process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!);
  params.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET!);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const data = await response.json();

  // Optional: store tokens in cookies, db, etc.
  console.log('Spotify Tokens:', data);

  return NextResponse.json(data);
}
