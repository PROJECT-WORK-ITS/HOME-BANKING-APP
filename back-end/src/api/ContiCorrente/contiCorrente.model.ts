import  mongoose, { Schema, Types } from 'mongoose';
import { contiCorrente } from './contiCorrente.entity';

export const userSchema = new mongoose.Schema<contiCorrente>({
  cognome: String,
  nome: String,
  openingDate: Date,
  IBAN: String
});

userSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

userSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const contoCorrente = mongoose.model<contiCorrente>('contoCorrente', userSchema);
