'use client';
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

export default function Lyrics() {
  const nodeRef = useRef(null);

  return (
    <Draggable className = "z-1" nodeRef={nodeRef}>
      <div ref={nodeRef}>
        <ResizableBox
          width={200}
          height={200}
          minConstraints={[100, 100]}
          maxConstraints={[500, 500]}
          resizeHandles={['se']}
        >
          <div className='bg-default-gray w-full h-full rounded-xl border border-gray-400 z-1'>
            Lyrics
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
}