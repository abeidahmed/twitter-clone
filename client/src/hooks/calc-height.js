import { useEffect, useState } from 'react';

export function useCalHeight(value, initialHeight, elRef) {
  const [eleHeight, setHeight] = useState(initialHeight);

  useEffect(() => {
    setHeight(`${elRef.current.scrollHeight}px`);
  }, [value]);

  return { eleHeight };
}
