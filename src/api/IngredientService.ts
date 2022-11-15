import { BasePageRequest, ResponseIngredientList } from '../@types';
import APIBase from './core';

class IngredientService extends APIBase {
  public constructor() {
    super('ingredient');
  }

  public getList({ page, size }: BasePageRequest): Promise<ResponseIngredientList> {
    return this.baseHTTP
      .get(`list?page=${page}&size=${size}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }
}

export default new IngredientService();
