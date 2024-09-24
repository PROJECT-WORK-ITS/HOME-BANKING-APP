import MovimentiContiCorrenteModel from "./movimentiContiCorrenti.model";
import { ContoCorrente } from "../ContiCorrenti/contiCorrenti.model";

export class MovimentiContiCorrentiService {
  // Funzione per ottenere il saldo attuale basato sui movimenti
  async getSaldoCorrente(contoCorrenteId: string): Promise<number> {
    // Trova il movimento più recente in base alla data
    const ultimoMovimento = await MovimentiContiCorrenteModel.findOne({
      contoCorrenteId,
    })
      .sort({ data: -1 }) // Ordina per data in ordine decrescente (il più recente per primo)
      .exec();

    if (!ultimoMovimento) {
      throw new Error("Nessun movimento trovato per questo conto corrente");
    }

    console.log("Ultimo movimento:", ultimoMovimento);

    // Restituisci il saldo associato all'ultimo movimento
    return ultimoMovimento.saldo;
  }

  // Funzione per gestire il bonifico
  async effettuaBonifico(data: {
    ibanMittente: string;
    ibanDestinatario: string;
    importo: number;
    descrizione: string;
  }) {
    const { ibanMittente, ibanDestinatario, importo, descrizione } = data;
    console.log(data);
    // Trova i conti correnti del mittente e del destinatario
    const contoMittente = await ContoCorrente.findOne({ IBAN: ibanMittente });
    const contoDestinatario = await ContoCorrente.findOne({
      IBAN: ibanDestinatario,
    });
    console.log(contoMittente, contoDestinatario);

    if (!contoMittente || !contoDestinatario) {
      throw new Error("Conto corrente non trovato");
    }

    // Calcola il saldo corrente del mittente
    const saldoMittente = await this.getSaldoCorrente(
      contoMittente._id.toString()
    );

    // Verifica che il mittente abbia fondi sufficienti
    if (saldoMittente < importo) {
      throw new Error("Fondi insufficienti nel conto del mittente");
    }

    // Crea un movimento di uscita per il mittente
    const movimentoMittente = new MovimentiContiCorrenteModel({
      contoCorrenteId: contoMittente._id,
      categoriaMovimentoId: "66eaa3fbef2937be4c47a3f3", // gestisci correttamente questa categoria
      importo,
      saldo: saldoMittente - importo, // Il nuovo saldo dopo il movimento
      descrizione,
    });
    await movimentoMittente.save();

    // Calcola il saldo corrente del destinatario
    const saldoDestinatario = await this.getSaldoCorrente(
      contoDestinatario._id.toString()
    );

    // Crea un movimento di entrata per il destinatario
    const movimentoDestinatario = new MovimentiContiCorrenteModel({
      contoCorrenteId: contoDestinatario._id,
      categoriaMovimentoId: "66eaa3587641b3a851ba60c7", // gestisci correttamente questa categoria
      importo,
      saldo: saldoDestinatario + importo, // Il nuovo saldo dopo il movimento
      descrizione,
    });
    await movimentoDestinatario.save();

    return { success: true, message: "Bonifico eseguito con successo" };
  }
}

export default new MovimentiContiCorrentiService();
