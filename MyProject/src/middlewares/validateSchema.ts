import { Handler } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { SchemaItemType, SchemaType } from "../schemas/schemaType";
import { getErrorsArray } from "../utils/createErrorsArray";
import { getError } from "../utils/getCustomError";

export const validateSchema =
  (schema: SchemaType): Handler =>
    async (req, res, next) => {
      try {
        const currentSchema = yup.object().shape(
          Object.entries(schema).reduce((acc, [key, value]) => {
            return {
              ...acc,
              [key]: yup.object().shape(value)
            }
          }, {} as Record<string, yup.ObjectSchema<SchemaItemType>>)
        );
        await currentSchema.validate({ body: req.body, params: req.params, query: req.query }, { abortEarly: false }
        );

        return next();
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const yupErrors = getErrorsArray(error);
          return next(
            getError(
              StatusCodes.INTERNAL_SERVER_ERROR,
              "Validation error!",
              yupErrors
            )
          );
        }

        return next(error);
      }
    };
