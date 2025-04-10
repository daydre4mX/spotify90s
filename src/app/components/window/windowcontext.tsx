'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface WindowContextProps {
  bringToFront: () => number;
}

const WindowContext = createContext<WindowContextProps>({
  bringToFront: () => 1,
});

export function WindowProvider({ children }: { children: ReactNode }) {
  const [highest, setHighest] = useState(1);

  const bringToFront = () => {
    setHighest(prev => prev + 1);
    return highest + 1;
  };

  return (
    <WindowContext.Provider value={{ bringToFront }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindowContext() {
  return useContext(WindowContext);
}