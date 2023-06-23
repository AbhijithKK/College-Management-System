import { useState } from 'react';

export const useForm = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return [values, handleChange];
};


