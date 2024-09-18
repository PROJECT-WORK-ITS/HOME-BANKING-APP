import MovimentiContiCorrenteModel from "./movimentiContiCorrenti.model";
import { MovimentiContiCorrenti } from "./movimentiContiCorrenti.entity";
import CategorieMovimentiModel from "../CategorieMovimenti/categorieMovimenti.model";
import { ContoCorrente } from "../ContiCorrenti/contiCorrenti.model";

class MovimentiContiCorrentiService {
  public async createMovimento(
    data: MovimentiContiCorrenti
  ): Promise<MovimentiContiCorrenti> {
    const categoria = await CategorieMovimentiModel.findById(
      data.categoriaMovimentoId
    );

    const contoCorrente = await MovimentiContiCorrenteModel.findById(
      data.contoCorrenteId
    );

    if (!categoria) {
      throw new Error("Categoria di movimento non trovata");
    }
    if (!contoCorrente) {
      data.saldo = 1000;
    }

    let nuovoSaldo = data.saldo;

    if (categoria.tipologia === "Entrata") {
      nuovoSaldo += data.importo;
    } else if (categoria.tipologia === "Uscita") {
      nuovoSaldo -= data.importo;
    } else {
      throw new Error("Tipologia di movimento non valida");
    }

    const movimento = new MovimentiContiCorrenteModel({
      ...data,
      saldo: nuovoSaldo,
    });

    await movimento.save();

    return movimento;
  }
}

export default MovimentiContiCorrentiService;
