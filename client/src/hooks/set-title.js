import { useEffect } from 'react';

export function useSetTitle({ title, description, func }) {
  let meta = {
    title,
    description,
  };

  useEffect(() => {
    func(meta);
  }, [title, description, func, meta]);
}
