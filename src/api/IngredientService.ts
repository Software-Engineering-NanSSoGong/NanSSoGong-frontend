import { BasePageRequest, BaseRequestId, Ingredient, ResponseIngredientList } from '../@types';
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

  public getIngredientInfo({ id }: BaseRequestId): Promise<Ingredient> {
    return this.baseHTTP.get(`${id}`).then(APIBase._handleResponse).catch(APIBase._handleError);
  }

  public changeIngredientQuantity({
    id,
    quantityDiff,
  }: BaseRequestId & { quantityDiff: number }): Promise<Ingredient> {
    return this.baseHTTP
      .patch(`${id}`, {
        quantityDiff,
      })
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public disableOnlyIngredient({ id }: BaseRequestId): Promise<Ingredient> {
    return this.baseHTTP
      .patch(`disable/${id}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public disableCascadeIngredient({ id }: BaseRequestId): Promise<Ingredient> {
    return this.baseHTTP
      .patch(`disable-cascade/${id}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }
}

export default new IngredientService();
