import { useState } from 'react';

export function useCharTracker(initialState, limit) {
  const [field, setField] = useState(initialState);

  function validator(e) {
    const value = e.target.value;

    if (value.length > limit) return;
    setField(value);
  }

  const clearField = () => setField('');

  return [field, validator, clearField];
}
