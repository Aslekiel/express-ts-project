import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Name can only contain letters.")
    .required(),
  lastname: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Lastname can only contain letters.")
    .required(),
  email: yup.string().email("Invalid email"),
  password: yup.string().required().min(5),
  dob: yup.date().nullable().min(new Date(1900, 0, 1)),
});
