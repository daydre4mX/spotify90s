'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import 'react-resizable/css/styles.css';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const ResizableBox = dynamic(
  () =>
    import('react-resizable').then((mod) => mod.ResizableBox),
  { ssr: false }
);

function returnAudioAsImage(audioStream: any) {
  return audioStream;
}

const Scene = ({ vertex, fragment }: { vertex: string; fragment: string }) => {
  const meshRef = useRef<any>(null);

  let noiseTexture = useTexture('noise2.png');

  const width = 8;
  const height = 8;

  useFrame((state) => {
    let time = state.clock.getElapsedTime();
    meshRef.current.material.uniforms.iTime.value = time;
    meshRef.current.material.uniforms.iChannel0.value = returnAudioAsImage(null);
  });

  const uniforms = useMemo(
    () => ({
      iTime: { type: 'f', value: 1.0 },
      iResolution: { type: 'v2', value: new THREE.Vector2(width, height) },
      iChannel0: { type: 't', value: null },
      iMouse: { type: 'v4', value: new THREE.Vector4(0, 0, 0, 0) },
    }),
    []
  );

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

function Box(props: any) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
    ref.current.rotation.x += delta;
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => setClicked(!clicked)}
      onPointerOver={(event) => setHovered(true)}
      onPointerOut={(event) => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default function Visualizer() {
  const [vertex, setVertex] = useState('');
  const [fragment, setFragment] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleVisualizer = () => {
    setIsOpen(!isOpen);
  };

  const fragShaderSelect = 4;

  useEffect(() => {
    fetch('/vertexShader.glsl')
      .then((res) => res.text())
      .then((text) => setVertex(text));
    fetch(`/fragmentShader${fragShaderSelect}.glsl`)
      .then((res) => res.text())
      .then((text) => setFragment(text));
  }, []);

  return (
    <div>
      {!isOpen && (
        <button
          className="transform translate-x-10 translate-y-1"
          onClick={toggleVisualizer}
        >
          Open Visualizer
        </button>
      )}
      {isOpen && (
        <div className="relative inline-block">
          <ResizableBox
            width={200}
            height={200}
            minConstraints={[150, 150]}
            maxConstraints={[500, 500]}
            resizeHandles={['se']}
          >
            <div className="bg-default-gray w-full h-full rounded-xl border-3 border-gray-400 overflow-hidden">
              <p className="m-1 text-center font-mono text-xs border-b border-gray-400">
                JAMZ.Visualizer
              </p>
              <Canvas>
                <Scene vertex={vertex} fragment={fragment} />
                <color attach="background" args={['#fff']} />
                {/* You can include additional scene components here */}
              </Canvas>
            </div>
          </ResizableBox>
          <button
            className="absolute top-0 right-2 z-10 p-1 flex row-auto "
            onClick={toggleVisualizer}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}