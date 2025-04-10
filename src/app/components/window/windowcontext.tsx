'use client'
import { useState } from 'react';

export default function ZIndexStack() {
  const [highestZ, setHighestZ] = useState(1);
  const [zIndices, setZIndices] = useState({ Lyrics: 1, div2: 1, div3: 1 });

  const bringToFront = (divName) => {
    setHighestZ(prev => prev + 1);
    setZIndices(prev => ({
      ...prev,
      [divName]: highestZ + 1
    }));
  };
}