import { BasePageRequest, ResponseFoodList } from '../@types';
import APIBase from './core';

class FoodService extends APIBase {
  public constructor() {
    super('food');
  }

  public getList({ page, size }: BasePageRequest): Promise<ResponseFoodList> {
    return this.baseHTTP
      .get(`list?page=${page}&size=${size}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }
}

export default new FoodService();
