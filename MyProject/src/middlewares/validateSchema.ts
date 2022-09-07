import { Handler } from "express";
import * as yup from "yup";

export type SchemaItemType = Record<string, yup.StringSchema | yup.NumberSchema | yup.DateSchema>

export type SchemaObjectItemType = Record<string, yup.StringSchema | yup.NumberSchema | yup.DateSchema>

export type SchemaType = {
  body?: SchemaObjectItemType;
  params?: SchemaObjectItemType;
  query?: SchemaObjectItemType;
}

export const validateSchema = (schema: SchemaType): Handler =>
  async (req, res, next) => {
    try {
      await schema.validate(req, { abortEarly: false });

      return next();
    } catch (error) {
      next(error);
    }
  };
