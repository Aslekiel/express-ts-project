import * as yup from 'yup';

export const authRegistrationSchema = {
  body: {
    name: yup
      .string()
      .matches(/^[a-z]+$/i, 'Name can only contain letters.'),
    lastname: yup
      .string()
      .matches(/^[a-z]+$/i, 'Lastname can only contain letters.'),
    email: yup.string().email('Invalid email').required('Email is a required field'),
    password: yup
      .string()
      .required('Password is a required field')
      .min(5, 'Password must be at least 5 characters'),
    dob: yup
      .date()
      .nullable()
      .min(new Date(1950, 0, 1), 'Date of birth must be later than 1949-12-31')
      .max(new Date(Date.now()), 'Date of birth cannot be in the future'),
  },
};
