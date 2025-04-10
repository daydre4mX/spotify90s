'use client';
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-resizable/css/styles.css';

const Draggable = dynamic(() => import('react-draggable'), { ssr: false });
const ResizableBox = dynamic(
  () =>
    import('react-resizable').then((mod) => mod.ResizableBox),
  { ssr: false }
);

export default function Lyrics() {
  const nodeRef = React.useRef(null);

  return (
    <Draggable bounds="body" nodeRef={nodeRef} cancel=".react-resizable-handle">
      <div ref={nodeRef}>
        <ResizableBox
          width={200}
          height={200}
          minConstraints={[100, 100]}
          maxConstraints={[500, 500]}
          resizeHandles={['se']}
        >
          <div className="bg-default-gray w-full h-full rounded-xl border border-gray-400">
            <p className='m-1 text-center font-mono text-xs border rounded-full'>
              Lyrics
            </p>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
}