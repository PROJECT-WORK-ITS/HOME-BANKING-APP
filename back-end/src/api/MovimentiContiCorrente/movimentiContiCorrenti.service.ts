import MovimentiContiCorrenteModel from "./movimentiContiCorrenti.model";
import { MovimentiContiCorrenti } from "./movimentiContiCorrenti.entity";
import CategorieMovimentiModel from "../CategorieMovimenti/categorieMovimenti.model";

class MovimentiContiCorrentiService {
  public async createMovimento(
    data: MovimentiContiCorrenti
  ): Promise<MovimentiContiCorrenti> {
    const movimento = new MovimentiContiCorrenteModel(data);
    await movimento.save();

    const categoria = await CategorieMovimentiModel.findById(
      movimento.categoriaMovimentoId
    );
    if (!categoria) {
      throw new Error("Categoria di movimento non trovata");
    }
    if (categoria.tipologia === "Entrata") {
      contoCorrente.saldo += movimento.importo;
    } else if (categoria.tipologia === "Uscita") {
      contoCorrente.saldo -= movimento.importo;
    } else {
      throw new Error("Tipologia di movimento non valida");
    }

    await contoCorrente.save();

    return movimento;
  }
}

export default MovimentiContiCorrentiService;
