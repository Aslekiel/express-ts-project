import * as yup from 'yup';

export const userEditPasswordSchema = {
  body: {
    oldPassword: yup.string().required('Enter your password'),
    newPassword: yup.string().required('Enter your password').min(6, 'Password has to be longer than 6 characters').oneOf([yup.ref('confirmPassword'), null], 'Passwords do not match'),
    confirmPassword: yup.string().required('Repeat your password without errors')
      .oneOf([yup.ref('newPassword'), null], 'Passwords do not match'),
  },
};
