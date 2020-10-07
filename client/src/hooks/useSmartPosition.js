import { useState, useEffect } from 'react';

export function useSmartPosition(element, isActivePopover) {
  const [hasTopSpace, setHasTopSpace] = useState();

  useEffect(() => {
    if (!element.current) return;

    const dropdownRect = element.current.getBoundingClientRect();
    const menuHeight = element.current.clientHeight;
    if (!menuHeight) return;

    const spaceAtTop = dropdownRect.top;
    if (spaceAtTop + menuHeight >= document.documentElement.clientHeight) {
      setHasTopSpace(true);
    }
  }, [element, isActivePopover]);

  return { hasTopSpace };
}
