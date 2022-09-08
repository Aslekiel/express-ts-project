import * as yup from "yup";

export const authRegistrationSchema = {
  body: {
    name: yup
      .string()
      .matches(/^[a-z]+$/i, "Name can only contain letters.")
      .required(),
    lastname: yup
      .string()
      .matches(/^[a-z]+$/i, "Lastname can only contain letters.")
      .required(),
    email: yup.string().email("Invalid email").required(),
    password: yup
      .string()
      .required()
      .min(5, "Password must be at least 5 characters"),
    dob: yup
      .date()
      .nullable()
      .min(new Date(1950, 0, 1), "Date of birth must be later than 1949-12-31")
      .max(new Date(), "Date of birth cannot be in the future"),
  },
};