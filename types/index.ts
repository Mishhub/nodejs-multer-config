import { Request } from "express";
import { JwtUserPayload } from "./user";

export interface MulterRequest extends Request {
  files: any;
  user: JwtUserPayload;
}
