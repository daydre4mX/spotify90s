'use client';
import { ResizableBox } from "react-resizable";


export default function Playlist() {
    return (
        <ResizableBox
            width={200}
            height={200}
            minConstraints={[150, 150]}
            maxConstraints={[500, 500]}
            resizeHandles={['se']}
        >
              <p className='m-1 text-center font-mono text-xs rounded-full bg-gray-400 border'>
                Playlist
              </p>
        </ResizableBox>
    );
}
//   ); 
