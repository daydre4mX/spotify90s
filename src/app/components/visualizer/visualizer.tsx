'use client';
import React, { act, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import 'react-resizable/css/styles.css';

const Draggable = dynamic(() => import('react-draggable'), { ssr: false });
const ResizableBox = dynamic(
  () =>
    import('react-resizable').then((mod) => mod.ResizableBox),
  { ssr: false }
);

function Box(props, audioStream) {
  const meshRef = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (meshRef.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(active)}
      onPointerOver={(events) => setHover(true)}
      onPointerOut={(events) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


export default function Visualizer() {
  const nodeRef = React.useRef(null);

  return (
    <Draggable nodeRef={nodeRef} cancel=".react-resizable-handle">
      <div ref={nodeRef}>
        <ResizableBox
          width={200}
          height={200}
          minConstraints={[150, 150]}
          maxConstraints={[500, 500]}
          resizeHandles={['se']}
        >
          <div className="bg-default-gray w-full h-full rounded-xl border border-gray-400">
            <p className='m-1 text-center font-mono text-xs rounded-full bg-gray-400 border'>
              JAMZVisualizer
            </p>
            <Canvas>
              <color attach="background" args={['#fff']} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Box position={[-1.2, 0, 0]} />
              <Box position={[1.2, 0, 0]} />
            </Canvas>
          </div>


        </ResizableBox>
      </div>
    </Draggable>
  );
}