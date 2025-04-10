'use client';
import React, { useRef } from 'react';
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
              JAMZ.LYRICS
            </p>
            <div className='overflow-hidden rounded-xs bg-gray-600 m-1 font-mono'>
              Lyrics will play here
            </div>
          </div>
        </ResizableBox>
      </div>
  );
}