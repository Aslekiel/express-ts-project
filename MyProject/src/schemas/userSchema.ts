import * as yup from 'yup';

export const userSchema = {
  params: { id: yup.number().required() },
};
