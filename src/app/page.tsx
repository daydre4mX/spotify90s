'use client';
import React from "react";
import Image from "next/image";
import Lyrics from "./components/lyrics/lyrics";
import Vis from "./components/visualizer/visualizer";
import dynamic from 'next/dynamic';
import Albumart from "./components/albumart/albumart"; 
import Runtime from "./components/runtime/runtime"; 
const Draggable = dynamic(() => import('react-draggable'), { ssr: false });

export default function Home() {
  //priority is decided by the order of the divs, last item = highest
  //affecting z in div allows to change priority
  const nodeRef = React.useRef(null!);

  return (
    <div className="bg-blue-300 min-h-screen h-screen display-flex grid grid-cols-1">
      <Draggable nodeRef={nodeRef} cancel=".react-resizable-handle">
        <div ref={nodeRef} className="z-2">
          <Lyrics />
        </div>
      </Draggable>
      <Draggable nodeRef={nodeRef} cancel=".react-resizable-handle">
        <div ref={nodeRef} className="z-1 ">
          <Albumart />
        </div>
      </Draggable>
      <Draggable nodeRef={nodeRef} cancel=".react-resizable-handle">
        <div ref={nodeRef} className="z-3">
          <Vis />
        </div>
      </Draggable>
      <Draggable nodeRef={nodeRef} cancel=".react-resizable-handle">
        <div ref={nodeRef} className="z-3 ">
          <Runtime />
        </div>
      </Draggable>
    </div>

  );
}
