export interface MovimentiContiCorrenti {
  movimentoId?: string;
  contoCorrenteId: string;
  categoriaMovimentoId: string;
  data: Date;
  importo: number;
  saldo: number;
  descrizione: string;
}