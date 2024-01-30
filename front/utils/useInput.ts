import { useState, useCallback, ChangeEvent } from 'react';

type ReturnTypes<T = string> = [T, (e: ChangeEvent<HTMLInputElement>) => void];

const useInput = <T extends string | boolean>(initialValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState<T>(initialValue);

  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const newValue = target.type === 'checkbox' ? target.checked : target.value;
    setValue(newValue as T);
  }, []);

  return [value, handler];
};

export default useInput;
