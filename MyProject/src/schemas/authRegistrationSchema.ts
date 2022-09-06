import * as yup from "yup";

export const authRegistrationSchema = yup.object().shape({
  body: yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z]+$/, "Name can only contain letters.")
      .required(),
    lastname: yup
      .string()
      .matches(/^[A-Za-z]+$/, "Lastname can only contain letters.")
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
  }),
});

///////////////

type ErrObj = {
  path: string; //body
  fieldName: string; // name
  inputValue: string; // asd
  message: string; // Password must be more then 3 symbols
};

const result: ErrObj[] = [
  { path: "a", fieldName: "321", inputValue: "321321", message: "321312" },
];
