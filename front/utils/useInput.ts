import { useState, useCallback, ChangeEvent } from 'react';

type ReturnTypes<T extends string | boolean> = [T, (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void];

const useInput = <T extends string | boolean>(initialValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState<T>(initialValue);

  const handler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    let newValue: string | boolean;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      newValue = target.checked;
    } else {
      newValue = target.value;
    }

    setValue(newValue as T);
  }, []);

  return [value, handler];
};

export default useInput;
