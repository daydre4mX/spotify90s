import Image from "next/image";
import Lyrics from "./components/lyrics/lyrics";
export default function Home() {
  return (
    <div className="grid grid">
      <Lyrics />
    </div>
  );
}
