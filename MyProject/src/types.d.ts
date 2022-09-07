import { User } from "./db/entity/User";

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
