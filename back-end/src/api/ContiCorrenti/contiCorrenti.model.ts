import mongoose, { Schema, Types } from "mongoose";
import { ContiCorrenti } from "./contiCorrenti.entity";

export const ContiCorrentiSchema: Schema = new Schema({
  lastName: String,
  firstName: String,
  openingDate:{
    type: Date,
    default: () => new Date()
  },
  IBAN: String,
});

ContiCorrentiSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

ContiCorrentiSchema.set("toObject", {
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const ContoCorrente = mongoose.model<ContiCorrenti>(
  "ContoCorrente",
  ContiCorrentiSchema,
  "ContiCorrenti"
);
