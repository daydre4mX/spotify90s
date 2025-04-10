import Image from "next/image";
import Lyrics from "./components/lyrics/lyrics";
import Vis from "./components/visualizer/visualizer";
import Albumart from "./components/albumart/albumart";  
export default function Home() {
  //priority is decided by the order of the divs, last item = highest
  return (
    <div className="grid grid-cols-2">
      <Lyrics />
      <Albumart/>
      <Vis />
    </div>
  );
}
