import { Request, Response } from "express";
import MovimentiContiCorrentiService from "./movimentiContiCorrenti.service";

class MovimentiContiCorrentiController {
  private movimentiContiCorrentiService: MovimentiContiCorrentiService;

  constructor() {
    this.movimentiContiCorrentiService = new MovimentiContiCorrentiService();
  }

  public createMovimento = async (req: Request, res: Response) => {
    try {
      const movimentoData = req.body;
      const nuovoMovimento =
        await this.movimentiContiCorrentiService.createMovimento(movimentoData);

      return res.status(201).json(nuovoMovimento);
    } catch (error) {
      const errorMessage = (error as Error).message;
      return res.status(400).json({ error: errorMessage });
    }
  };
}
export default new MovimentiContiCorrentiController();
