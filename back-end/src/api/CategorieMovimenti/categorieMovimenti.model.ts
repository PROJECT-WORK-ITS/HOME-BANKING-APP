import mongoose, { Schema } from "mongoose";
import { CategoriaMovimento } from "./categorieMovimenti.entity";

const CategorieMovimentiSchema: Schema = new Schema({
  nomeCategoria: { type: String, required: true },
  tipologia: { type: String, required: true, enum: ["Entrata", "Uscita"] },
});

export default mongoose.model<CategoriaMovimento>(
  "CategoriaMovimenti",
  CategorieMovimentiSchema,
  "CategorieMovimenti"
);
