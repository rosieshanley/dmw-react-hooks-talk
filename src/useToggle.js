import { useState, useCallback } from 'react';

const useToggle = intitalValue => {
  const [toggleValue, setToggleValue] = useState(intitalValue);

  // useCallback will return a memoized version of the callback that only changes if one of the inputs has changed.
  const toggler = useCallback(() => setToggleValue(!toggleValue));

  return [toggleValue, toggler];
};

export default useToggle;
