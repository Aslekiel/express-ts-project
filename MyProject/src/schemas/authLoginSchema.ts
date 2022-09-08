import * as yup from "yup";


export const authLoginSchema = {
  body: {
    email: yup.string().email("Invalid email").required(),
    password: yup
      .string()
      .required()
      .min(5, "Password must be at least 5 characters"),
  },
};