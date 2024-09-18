import { Document } from "mongoose";

export interface ContiCorrenti {
  id?: string;
  lastName: string;
  firstName: string;
  openingDate: Date;
  IBAN: string;
}
