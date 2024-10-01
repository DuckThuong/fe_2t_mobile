import { useEffect, useState } from 'react';
import { PC_SIZE } from '../ThemeSetting';

export type Size = {
  width: number;
  height: number;
};

const useSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: window.innerWidth ?? PC_SIZE,
    height: window.innerHeight ?? PC_SIZE,
  });

  useEffect(() => {
    const windowSizeHandler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', windowSizeHandler);
    window.addEventListener('load', windowSizeHandler);

    return () => {
      window.removeEventListener('resize', windowSizeHandler);
      window.removeEventListener('load', windowSizeHandler);
    };
  }, []);
  return windowSize;
};

export default useSize;
