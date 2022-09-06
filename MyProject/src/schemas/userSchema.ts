import * as yup from "yup";

export const userSchema = yup.object().shape({
  params: yup.object().shape({ id: yup.number().required() }),
});
