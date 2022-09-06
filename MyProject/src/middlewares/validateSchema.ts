import { NextFunction, Request, Response } from "express";
import { authLoginSchema } from "../schemas/authLoginSchema";
import { authRegistrationSchema } from "../schemas/authRegistrationSchema";
import { userSchema } from "../schemas/userSchema";

type SchemaType =
  | typeof authRegistrationSchema
  | typeof authLoginSchema
  | typeof userSchema;

export const validateSchema =
  (schema: SchemaType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req, { abortEarly: false });
      return next();
    } catch (error) {
      // next(error)
      return res.status(500).json({ message: error.message });
    }
  };
