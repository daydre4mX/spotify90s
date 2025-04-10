'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-resizable/css/styles.css';

const ResizableBox = dynamic(
  () =>
    import('react-resizable').then((mod) => mod.ResizableBox),
  { ssr: false }
);

export default function Lyrics() {
  return (
      <div>
        <ResizableBox
          width={200}
          height={200}
          minConstraints={[150, 150]}
          maxConstraints={[500, 500]}
          resizeHandles={['se']}
        >
          <div className="bg-default-gray w-full h-full rounded-xl border-3 border-gray-400">
          <p className='m-1 text-center font-mono text-xs border-b border-gray-400'>
              Jamz.Lyrics
              // 
              <span id="WindowClose" className="absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"></svg>
              </span>

            </p>
            <div className='overflow-hidden rounded-xs bg-gray-600 m-1 font-mono'>
              Lyrics will play here
            </div>
          </div>
        </ResizableBox>
      </div>
  );
}