'use client';
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

export default function visualizer() {
  const nodeRef = useRef(null);

  return (
    <Draggable className = "z-2"nodeRef={nodeRef}>
      <div ref={nodeRef}>
        <ResizableBox
          width={200}
          height={200}
          minConstraints={[100, 100]}
          maxConstraints={[500, 500]}
          resizeHandles={['se']}
        >
          <div className='bg-default-gray w-full h-full rounded-xl border border-gray-400 z-2'>
            visualizer
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
}