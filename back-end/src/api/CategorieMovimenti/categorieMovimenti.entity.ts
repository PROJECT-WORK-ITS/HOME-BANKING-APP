import { Document } from "mongoose";

export interface CategoriaMovimento extends Document {
  nomeCategoria: string;
  tipologia: string;
}
