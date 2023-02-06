import { useEffect, useState } from 'react';

export const useValidation = (value: any, validations: any): any => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [containsDigitAndLatin, setContainsDigitAndLatin] = useState(false);
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
          break;
        case 'isEmpty':
          typeof value === 'string' && value !== '' ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case 'containsDigitAndLatin':
          /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\][{}|';:/.,?><]*$/.test(value) ? setContainsDigitAndLatin(false) : setContainsDigitAndLatin(true);
      }
    }
  }, [value]);
  return {
    isEmpty,
    minLengthError,
    containsDigitAndLatin
  };
};
