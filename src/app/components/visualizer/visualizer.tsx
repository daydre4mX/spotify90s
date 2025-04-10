'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import 'react-resizable/css/styles.css';

const ResizableBox = dynamic(
  () =>
    import('react-resizable').then((mod) => mod.ResizableBox),
  { ssr: false }
);

function audioReactiveScene(audioStream){
  console.log(1+1);
}


export default function Visualizer() {

  return (
    <div>
        <ResizableBox
          width={200}
          height={200}
          minConstraints={[150, 150]}
          maxConstraints={[500, 500]}
          resizeHandles={['se']}
        >
          <div className="bg-default-gray w-full h-full rounded-xl border-3 border-gray-400 overflow-hidden">
            <p className='m-1 text-center font-mono text-xs border-b border-gray-400'>
                JAMZ.Visualizer
              </p>
            <Canvas>
              <color attach="background" args={['#fff']}/>
              <ambientLight intensity ={0.5}/>
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
              <pointLight position={[-1.2, 0, 0]}/>
            </Canvas>
          </div>


        </ResizableBox>
    </div>
  );
}