import * as yup from 'yup';

export const userEditInfoSchema = {
  body: {
    fullname: yup.string(),
    email: yup.string().email('Invalid email'),
  },
};
