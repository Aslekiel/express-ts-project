import * as yup from 'yup';

export const authLoginSchema = {
  body: {
    email: yup.string().email('Invalid email').required('Email is a required field'),
    password: yup
      .string()
      .required('Password is a required field')
      .min(5, 'Password must be at least 5 characters'),
  },
};
