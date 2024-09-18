import CategorieMovimentiModel from "./categorieMovimenti.model";
import { CategoriaMovimento } from "./categorieMovimenti.entity";

class CategorieMovimentiService {
  public async getCategorieMovimenti(): Promise<CategoriaMovimento[]> {
    return await CategorieMovimentiModel.find();
  }

  public async createCategoriaMovimento(
    data: CategoriaMovimento
  ): Promise<CategoriaMovimento> {
    const categoria = new CategorieMovimentiModel(data);
    return await categoria.save();
  }

  public async updateCategoriaMovimento(
    id: string,
    data: CategoriaMovimento
  ): Promise<CategoriaMovimento | null> {
    return await CategorieMovimentiModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  public async deleteCategoriaMovimento(
    id: string
  ): Promise<CategoriaMovimento | null> {
    return await CategorieMovimentiModel.findByIdAndDelete(id);
  }
}

export default new CategorieMovimentiService();
