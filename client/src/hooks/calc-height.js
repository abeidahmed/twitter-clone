import { useEffect, useState } from 'react';

export function useCalHeight(value, initialHeight, elRef) {
  const [eleHeight, setHeight] = useState(initialHeight);

  useEffect(() => {
    let calculatedHeight = elRef.current.scrollHeight;
    setHeight(`${calculatedHeight}px`);
  }, [value, elRef]);

  return { eleHeight };
}
