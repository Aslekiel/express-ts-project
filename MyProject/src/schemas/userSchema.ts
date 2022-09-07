import * as yup from "yup";
import { SchemaObjectItemType } from "../middlewares/validateSchema";

export const userSchema: SchemaObjectItemType = {
  params: { id: yup.number().required() }
};
