import mongoose, { Schema } from "mongoose";
import { MovimentiContiCorrenti } from "./movimentiContiCorrenti.entity";

const MovimentiContiCorrentiSchema: Schema = new Schema({
  contoCorrenteId: { type: Schema.Types.ObjectId, ref: "ContiCorrenti" },
  categoriaMovimentoId: {
    type: Schema.Types.ObjectId,
    ref: "CategorieMovimenti",
  },
  data: { type: Date, require: true },
  importo: { type: Number, require: true },
  saldo: { type: Number, require: true },
  descrizione: { type: Number, require: true },
});

MovimentiContiCorrentiSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

MovimentiContiCorrentiSchema.set("toObject", {
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model<MovimentiContiCorrenti>(
  "MovimentoContoCorrente",
  MovimentiContiCorrentiSchema,
  "MovimentiContiCorrenti"
);
