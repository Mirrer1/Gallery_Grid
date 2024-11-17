import { toast } from 'react-toastify';

export const useValidate = (
  fields: { value: string; regex: RegExp | null; fieldName: string; required?: boolean }[],
  customValidations?: { isValid: boolean; errorMessage: string }[]
): boolean => {
  for (const field of fields) {
    const isRequired = field.required ?? true;

    if (isRequired && !field.value.trim()) {
      toast.warning(`${field.fieldName}을(를) 입력해주세요.`);
      return false;
    }

    if (field.value.trim() && field.regex && !field.regex.test(field.value)) {
      toast.warning(`${field.fieldName} 형식이 올바르지 않습니다.`);
      return false;
    }
  }

  if (customValidations) {
    for (const validation of customValidations) {
      if (!validation.isValid) {
        toast.warning(validation.errorMessage);
        return false;
      }
    }
  }

  return true;
};
