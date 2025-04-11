'use client'
import React from 'react';
const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;
const SCOPES = ['user-read-private', 'user-read-email','user-modify-playback-state'];
console.log('Client ID:', SPOTIFY_CLIENT_ID);

export default function WelcomePage() {
  const handleLogin = () => {
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('client_id', SPOTIFY_CLIENT_ID);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.append('scope', SCOPES.join(' '));
    authUrl.searchParams.append('state', crypto.randomUUID()); // Optional but recommended

    console.log(authUrl.toString())
    console.log("Spotify Auth URL:", authUrl.toString());

    window.location.href = authUrl.toString();
  };

  return (
    <div className='justify-items-center text-center m-5 py-30'>
      <h1 className='font-mono text-3xl py-20'>
          Welcome to JAMZ.AMP
          <p className='text-xs text-gray-700'>
            @ Peachhacks 2025 Hackathon
          </p>
      </h1>
      <button onClick = {handleLogin} className='flex bg-slate-700 hover:bg-green-500 border-3 border-white rounded-3xl'>
       <p className='m-2 font-mono'>
       Sign in to Spotify
        </p> 
      </button>
    </div>
  );
}
