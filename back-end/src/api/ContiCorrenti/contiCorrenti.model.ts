import  mongoose, { Schema, Types } from 'mongoose';
import { contiCorrenti } from './contiCorrenti.entity';

export const contiCorrentiSchema = new mongoose.Schema<contiCorrenti>({
  lastName: String,
  firstName: String,
  openingDate: Date,
  IBAN: String
});

contiCorrentiSchema.set('toJSON', {
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

contiCorrentiSchema.set('toObject', {
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const contoCorrente = mongoose.model<contiCorrenti>('contoCorrente', contiCorrentiSchema, 'ContiCorrenti');
