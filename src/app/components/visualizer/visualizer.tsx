'use client';
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import 'react-resizable/css/styles.css';
import { useTexture } from '@react-three/drei';
import * as THREE from "three"

const Draggable = dynamic(() => import('react-draggable'), { ssr: false });
const ResizableBox = dynamic(
  () =>
    import('react-resizable').then((mod) => mod.ResizableBox),
  { ssr: false }
);

const Scene = ({vertex, fragment}) => {
  const meshRef = useRef();

  console.log(vertex)

  const noiseTexture = useTexture("noise2.png");
  
  useFrame((state) => {
    let time = state.clock.getElapsedTime();
    
    meshRef.current.material.uniforms.iTime.value = time + 20;
  });

  
  const uniforms = useMemo(
    () => ({
      iTime: {
        type: "f",
        value: 1.0,
      },
      iResolution: {
        type: "v2",
        value: new THREE.Vector2(4,3),
      },
      iChannel0: {
        type: "t",
        value: noiseTexture,
      },
    }),
    []
  );


  return(
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 3]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
      />
    </mesh>



  )
}

function Box (props) {
  // This reference gives us direct access to the THREE.Mesh object.
  const ref = useRef()

  // Hold state for hovered and clicked events.
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  // Subscribe this component to the render-loop and rotate the mesh every frame.
  useFrame((state,delta) => (
  
    ref.current.rotation.y += delta,
    ref.current.rotation.x += delta,
    
  ))

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
  const nodeRef = React.useRef(null);

  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");

  useEffect(() => {

    fetch("/vertexShader.glsl").then((res) => res.text())
    .then((text) => {
      setVertex(text)
    });
    fetch("/fragmentShader.glsl").then((res) => res.text())
    .then((text) => {
      setFragment(text)
    });

    
  }, []);

  console.log(vertex);
  console.log(Fragment);
  
  return (
    <Draggable nodeRef={nodeRef} cancel=".react-resizable-handle">
      <div ref={nodeRef}>
        <ResizableBox
          width={200}
          height={200}
          minConstraints={[100, 100]}
          maxConstraints={[500, 500]}
          resizeHandles={['se']}
        >
          <div className="bg-default-gray w-full h-full rounded-xl border border-gray-400">
            <p className='m-1 text-center font-mono text-xs rounded-full bg-gray-400 border'>
                JAMZVisualizer
              </p>
            <Canvas>
              <Scene vertex={vertex} fragment={fragment} />
              {/* <color attach="background" args={['#fff']} />
              <ambientLight intensity={0.5} />      
              <spotLight intensity= {1000} position={[10, 10, 10]} angle={0.15} penumbra={1} />      
              <pointLight intensity= {1000} position={[-10, -10, -10]} />      
              <Box position={[-1.2, 0, 0]} />     
              <Box position={[1.2, 0, 0]} />  */}
            </Canvas>
          </div>


        </ResizableBox>
      </div>
    </Draggable>
  );
}