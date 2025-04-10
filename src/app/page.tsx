import Image from "next/image";
import Lyrics from "./components/lyrics/lyrics";
import Vis from "./components/visualizer/visualizer";
import Album from "./components/albumart/albumart";  
import Equalizer from "./components/equalizer/equalizer";
export default function Home() {
  return (
    <div className="grid grid">
      <Lyrics />
      <Vis />
      <Album/>
      <Equalizer />
    </div>
  );
}
