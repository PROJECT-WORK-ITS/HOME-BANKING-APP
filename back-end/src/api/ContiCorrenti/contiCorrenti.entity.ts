import { Document } from "mongoose";

export interface ContiCorrenti extends Document {
  id?: string;
  lastName: string;
  firstName: string;
  openingDate: Date;
  IBAN: string;
}
