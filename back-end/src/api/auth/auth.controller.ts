import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddUserDTO } from "./auth.dto";
import { omit, pick } from 'lodash';
import { UserExistsError } from "../../errors/user-exists";
import contiCorrentiService from "../ContiCorrenti/contiCorrenti.service";

export const add = async (
  req: TypedRequest<AddUserDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = omit(req.body, 'email', 'password');
    const credentials = pick(req.body, 'email', 'password');
    const newUser = await contiCorrentiService.add(userData, credentials);
    res.send(newUser);
    
  } catch (err) {
    if (err instanceof UserExistsError) {
      res.status(400);
      res.send(err.message);
    } else {
      next(err);
    }
  }
}
