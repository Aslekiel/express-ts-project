import * as yup from "yup";

type ErrObjType = {
  path: string;
  fieldName: string;
  inputValue: string;
  message: string;
};

export const getErrorsArray = (err: yup.ValidationError) => {
  const errorsArray: ErrObjType[] = [];

  err.inner.forEach((item) => {
    const error: ErrObjType = {
      path: item.path.split(".")[0],
      fieldName: item.path.split(".")[1],
      inputValue: item.value,
      message: item.message,
    };

    errorsArray.push(error);
  });

  return errorsArray;
};
