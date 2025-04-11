'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import 'react-resizable/css/styles.css';
import { useTexture } from '@react-three/drei';
import * as THREE from "three"

const ResizableBox = dynamic(
  () =>
    import('react-resizable').then((mod) => mod.ResizableBox),
  { ssr: false }
);

function returnAudioAsImage(audioStream){

  return audioStream
}

const Scene = ({vertex, fragment}: {vertex: string, fragment: string}) => {
  const meshRef = useRef(null!);

  console.log(vertex)
  
  let noiseTexture = useTexture("noise2.png");
  
  const width = 8;
  const height = 8;
  
  
  useFrame((state) => {
    let time = state.clock.getElapsedTime();
    
    meshRef.current.material.uniforms.iTime.value = time; 
    meshRef.current.material.uniforms.iChannel0.value = returnAudioAsImage(null);

  });
  
  const uniforms = useMemo(
    () => ({
      iTime: {
        type: "f",
        value: 1.0,
      },
      iResolution: {
        type: "v2",
        value: new THREE.Vector2(width,height),
      },
      iChannel0: {
        type: "t",
        value: null,
      },
      iMouse: {
        type: "v4",
        value: new THREE.Vector4(0,0,0,0),
      },
    }),
    []
  );
  

  return(
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
      />
    </mesh>



  )
}

function Box (props: any) {
  // This reference gives us direct access to the THREE.Mesh object.
  const ref = useRef<THREE.Mesh>(null!)

  // Hold state for hovered and clicked events.
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  // Subscribe this component to the render-loop and rotate the mesh every frame.
  useFrame((state,delta) => (
  
    ref.current.rotation.y += delta,
    ref.current.rotation.x += delta
  ));

  // Return the view.
  // These are regular three.js elements expressed in JSX.
  return (
    <mesh      
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    > 
      <boxGeometry args={[1, 1, 1]} />      
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange' } />    
    </mesh>
  )
}

export default function Visualizer() {

  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");

  const fragShaderSelect = 4

  useEffect(() => {

    fetch("/vertexShader.glsl").then((res) => res.text())
    .then((text) => {
      setVertex(text)
    });
    fetch(`/fragmentShader${fragShaderSelect}.glsl`).then((res) => res.text())
    .then((text) => {
      setFragment(text)
    });

    
  }, []);
  
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
              <Scene vertex={vertex} fragment={fragment} />
              {/* 
              <ambientLight intensity={0.5} />      
              <spotLight intensity= {1000} position={[10, 10, 10]} angle={0.15} penumbra={1} />      
              <pointLight intensity= {1000} position={[-10, -10, -10]} />      
              <Box position={[-1.2, 0, 0]} />     
              <Box position={[1.2, 0, 0]} />  */}
            </Canvas>
          </div>


        </ResizableBox>
    </div>
  );
}