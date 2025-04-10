'use client';
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

export default function Lyrics() {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      /* This tells Draggable to ignore mouse events on the resizable handle: */
      cancel=".react-resizable-handle"
    >
      <div ref={nodeRef}>
        <ResizableBox
          width={200}
          height={200}
          minConstraints={[100, 100]}
          maxConstraints={[500, 500]}
          resizeHandles={['se']} // change or add more handles if you want (e.g. ['se', 'ne', 'nw', 'sw'])
        >
          <div className="bg-default-gray w-full h-full rounded-xl border border-gray-400">
            Lyrics
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
}