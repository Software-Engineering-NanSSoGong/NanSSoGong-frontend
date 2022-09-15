import { RefObject, useEffect, useRef } from 'react';

interface Size {
  width: number;
  height: number;
}

interface DimensionElement {
  ref: RefObject<HTMLElement>;
}

function useDimensions({ ref }: DimensionElement) {
  const dimensions = useRef<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
}

export default useDimensions;
