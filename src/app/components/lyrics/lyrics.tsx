'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-resizable/css/styles.css';

const ResizableBox = dynamic(
  () =>
    import('react-resizable').then((mod) => mod.ResizableBox),
  { ssr: false }
);

export default function Lyrics() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLyrics = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {!isOpen && (
        <button 
          className="transform translate-x-10 translate-y-1" 
          onClick={toggleLyrics}
        >
          Open Lyrics
        </button>
      )}
      {isOpen && (
        <div className="relative inline-block flex row-auto">
          <ResizableBox
            width={200}
            height={200}
            minConstraints={[150, 150]}
            maxConstraints={[500, 500]}
            resizeHandles={['se']}
          >
            <div className="bg-default-gray w-full h-full rounded-xl border-3 border-gray-400">
              <p className="m-1 text-center font-mono text-xs border-b border-gray-400">
                JAMZ.LYRICS <span></span>
              </p>
              <div className="overflow-hidden rounded-xs bg-gray-600 m-1 font-mono">
                Lyrics will play here
              </div>
            </div>
          </ResizableBox>
          <button 
            className="absolute top-0 right-2 z-1 p-1 flex row-auto"
            onClick={toggleLyrics}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
} 