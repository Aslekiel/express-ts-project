import * as yup from 'yup';

export const userEditPasswordSchema = {
  body: {
    password: yup.string().required('Enter your password').oneOf([yup.ref('password'), null], 'Passwords do not match'),
    newPassword: yup.string().required('Enter your password').min(6, 'Password has to be longer than 6 characters'),
    confirmPassword: yup.string().required('Repeat your password without errors')
      .oneOf([yup.ref('password'), null], 'Passwords do not match'),
  },
};
