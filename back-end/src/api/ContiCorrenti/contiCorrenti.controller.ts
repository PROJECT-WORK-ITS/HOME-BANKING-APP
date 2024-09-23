import { NextFunction, Request, Response } from "express";
import { ContiCorrenti } from "./contiCorrenti.entity";
import { TypedRequest } from "../../utils/typed-request.interface";
import contiCorrentiService from "./contiCorrenti.service";
import { updateIBAN } from "./contiCorrenti.dto";


export const updIBAN = async (req: TypedRequest<updateIBAN>, res: Response, next: NextFunction) => {
    try {
        const { id, IBAN } = req.body;
        
        const json = await contiCorrentiService.updIBAN(id, IBAN);
        res.json(json);

    } catch(err) {
      next(err);
    }
  }