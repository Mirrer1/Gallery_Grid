import { toast } from 'react-toastify';

export const useValidate = (value: any, regex: any, errorMessage: any) => {
  if (!regex.test(value)) {
    toast.warning(errorMessage);
    return false;
  }
  return true;
};
