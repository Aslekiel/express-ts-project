import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import config from '../config';
import type { SchemaItemType, SchemaType } from '../schemas/schemaType';
import { getErrorsArray } from '../utils/createErrorsArray';
import { CustomError } from '../utils/CustomError';

export const validateSchema =
  (schema: SchemaType): Handler => async (req, res, next) => {
    try {
      const currentSchema = yup.object().shape(
        Object.entries(schema).reduce((acc, [key, value]) => {
          return {
            ...acc,
            [key]: yup.object().shape(value),
          };
        }, {} as Record<string, yup.ObjectSchema<SchemaItemType>>),
      );
      await currentSchema.validate(req, { abortEarly: false });

      return next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return next(
          // eslint-disable-next-line max-len
          new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, config.errors.validation_err, getErrorsArray(error)),
        );
      }

      return next(error);
    }
  };
