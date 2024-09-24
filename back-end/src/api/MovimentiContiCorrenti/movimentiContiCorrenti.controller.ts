import { Request, Response } from "express";
import MovimentiContiCorrentiService from "./movimentiContiCorrenti.service";

class MovimentiContiCorrentiController {
  // Gestione della richiesta di bonifico (POST)
  public async effettuaBonifico(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      // Estrai i dati dal corpo della richiesta
      const { ibanMittente, ibanDestinatario, importo, descrizione } = req.body;
      console.log(req.body);

      // Verifica che tutti i campi necessari siano presenti
      if (!ibanMittente || !ibanDestinatario || !importo || isNaN(importo)) {
        return res.status(400).json({ message: "Dati mancanti o non validi." });
      }

      // Usa il service per eseguire il bonifico
      const result = await MovimentiContiCorrentiService.effettuaBonifico({
        ibanMittente,
        ibanDestinatario,
        importo: parseFloat(importo), // Assicurati che sia un numero
        descrizione,
      });

      // Restituisci il risultato della transazione
      return res.status(200).json(result);
    } catch (error) {
      // Gestione degli errori
      console.error("Errore nell'effettuare il bonifico: ", error);
      return res.status(500).json({
        message: "Errore nel server. Impossibile completare il bonifico.",
      });
    }
  }
}
export default new MovimentiContiCorrentiController();
