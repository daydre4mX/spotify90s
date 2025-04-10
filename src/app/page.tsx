import Image from "next/image";
import Lyrics from "./components/lyrics/lyrics";
import Vis from "./components/visualizer/visualizer";
import albumart from "./components/albumart/albumart";  
export default function Home() {
  return (
    <div className="grid grid">
      <Lyrics />
      <Vis />
      <albumart/>
    </div>
  );
}
