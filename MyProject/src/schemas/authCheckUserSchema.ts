import * as yup from 'yup';

export const authCheckUserSchema = {
  body: {
    id: yup.number().required(),
  },
};
