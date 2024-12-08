import { useState, useCallback, ChangeEvent } from 'react';

type ReturnTypes<T> = [
  T,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  React.Dispatch<React.SetStateAction<T>>
];

const useInput = <T>(initialValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState<T>(initialValue);

  const handler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    let newValue: T;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      newValue = target.checked as unknown as T;
    } else if (target instanceof HTMLTextAreaElement) {
      newValue = target.value.replace(/\n/g, '\\n').replace(/ /g, '␣') as T;
    } else {
      newValue = target.value as unknown as T;
    }

    setValue(newValue);
  }, []);

  return [value, handler, setValue];
};

export default useInput;
