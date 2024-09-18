import { NextFunction } from "express";
import { ContiCorrenti } from "./contiCorrenti.entity";
import { TypedRequest } from "../../utils/typed-request.interface";

//TODO: DTO
export const add = async (req: TypedRequest<ContiCorrenti> , res: Response, next: NextFunction) => {
    try {
      //const user = req.user!;
      const { lastName, firstName, openingDate, IBAN  } = req.body;
      
      const newConto: ContiCorrenti = {
        lastName,
        firstName,
        openingDate,
        IBAN
      }
  
      //const saved = await todoService.add(newTodo, user.id!, assignTo);
      
      //res.json(saved).status(201);
      
    } catch(err) {
      next(err);
    }
  }
  