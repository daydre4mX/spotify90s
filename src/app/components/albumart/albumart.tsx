'use client';
import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-resizable/css/styles.css';
const ResizableBox = dynamic(
  () =>
    import('react-resizable').then((mod) => mod.ResizableBox),
  { ssr: false }
);

export default function Albumart() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAlbum = () => {
    setIsOpen(!isOpen);
  };

  return (
  <div>
    {!isOpen && (
      <button 
        className="transform translate-x-10 translate-y-1" 
        onClick={toggleAlbum}
      >
        Open Album Art
      </button>
    )}
   
    {isOpen && (
        <div className="relative flex row-auto">
          <ResizableBox
            width={200}
            height={200}
            minConstraints={[150, 150]}
            maxConstraints={[500, 500]}
            resizeHandles={['se']}
          >
            <div className="bg-default-gray w-full h-full rounded-xl border-3 border-gray-400">
              <p className='m-1 text-center font-mono text-xs border-b border-gray-400'>
                JAMZ.MUSIC ART
              </p>
              <div className='flex overflow-hidden justify-center m-2'>
                <img alt="Album Art" />
              </div>
              <button 
                className="absolute top-0 right-2 z-1 p-1 flex row-auto"
                onClick={toggleAlbum}
              >
                X
              </button>
            </div>
          </ResizableBox>
        </div>
      )}
    </div>
  );
}