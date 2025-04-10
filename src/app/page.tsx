import Image from "next/image";
import Lyrics from "./components/lyrics/lyrics";
import Vis from "./components/visualizer/visualizer";
import dynamic from 'next/dynamic';
import Albumart from "./components/albumart/albumart";  
const Draggable = dynamic(() => import('react-draggable'), { ssr: false });

export default function Home() {
  //priority is decided by the order of the divs, last item = highest
  //affecting z in div allows to change priority
  const nodeRef = React.useRef(null);

  return (
    <div className="display-flex grid grid-cols-3">
      <Draggable nodeRef={nodeRef} cancel=".react-resizable-handle">
        <div ref={nodeRef} className="z-2 bg-red-200">
          <Lyrics />
        </div>
      </Draggable>
      <div className="z-1 bg-blue-200">
        <Albumart />
      </div>
      <div className="z-3 bg-green-200">
        <Vis />
      </div>
    </div>
  );
}
