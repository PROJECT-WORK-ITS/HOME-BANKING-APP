export interface MovimentiContiCorrenti {
  id?: string;
  contoCorrenteId: string;
  categoriaMovimentoId: string;
  data: Date;
  importo: number;
  saldo: number;
  descrizione: string;
}