import { toast } from 'react-toastify';

export const useValidate = (value: string, regex: RegExp, errorMessage: string) => {
  if (!regex.test(value)) {
    toast.warning(errorMessage);
    return false;
  }
  return true;
};
