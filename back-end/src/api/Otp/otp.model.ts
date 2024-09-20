import mongoose, { Schema, Types } from "mongoose";
import { Otp as OtpEntity } from "./otp.entity";

export const OtpSchema: Schema = new Schema({
  email: String,
  otp: String,
  createdAt: {
    type: Date,
    default: () => new Date(), // Assegna l'orario corrente al campo createdAt
    index: { expires: '5m' } // Questo fa sì che il record venga eliminato automaticamente dopo la scadenza
  },
  validate: {
    type: Boolean,
    default: false
  }
});

OtpSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

OtpSchema.set("toObject", {
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const OtpModel = mongoose.model<OtpEntity>(
  "OtpModel",
  OtpSchema,
  "OtpCodes"
);
