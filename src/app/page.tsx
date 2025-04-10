import Image from "next/image";
import Lyrics from "./components/lyrics/lyrics";
import Vis from "./components/visualizer/visualizer";
import Albumart from "./components/albumart/albumart";  
export default function Home() {
  return (
    <div className="grid grid">
      <Lyrics />
      <Vis />
      <Albumart/>
    </div>
  );
}
