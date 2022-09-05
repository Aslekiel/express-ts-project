import { NextFunction, Request, Response } from "express";

export const validateSchema =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
      });
      return next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
