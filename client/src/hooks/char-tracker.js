import { useState } from 'react';

export function useCharTrackerState(initialState, limit) {
  const [field, setField] = useState(initialState);

  return [
    field,
    function (e) {
      const value = e.target.value;
      if (value.length <= limit) {
        setField(value);
      } else {
        return;
      }
    },
  ];
}
