export interface MovimentiContiCorrenti {
  id?: string;
  contoCorrenteId: string;
  categoriaMovimentoId: CategoriaMovimento;
  data: Date;
  importo: number;
  saldo: number;
  descrizione: string;
}

interface CategoriaMovimento {
  id?: string;
  nomeCategoria: string;
  tipologia: string;
}