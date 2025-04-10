'use client';
import React from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const visualizer = () => {
  return (
    <ResizableBox
      width={200}
      height={200}
      minConstraints={[100, 100]}
      maxConstraints={[500, 500]}
      resizeHandles={['se']}
    >
      <div className='bg-default-gray w-full h-full rounded-xl border border-gray-400'>
        Visualizer
      </div>
    </ResizableBox>
  );
}
// This is a comment
//lolxdedd
export default visualizer;
