import Image from "next/image";
import Lyrics from "./components/lyrics/lyrics";
import Vis from "./components/visualizer/visualizer";
import Albumart from "./components/albumart/albumart";  
export default function Home() {
  //priority is decided by the order of the divs, last item = highest
  //affecting z in div allows to change priority
  return (
    <div className="display-fixed grid grid-cols-3">
      <div className="z-2">
        <Lyrics />
      </div>
      <div className="z-1">
        <Albumart />
      </div>
      <div className="z-3">
        <Vis />
      </div>
    </div>
  );
}
