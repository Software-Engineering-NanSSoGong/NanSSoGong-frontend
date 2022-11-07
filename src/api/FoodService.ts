import { ResponseFoodList } from '../@types';
import APIBase from './core';

class FoodService extends APIBase {
  public constructor() {
    super('food');
  }

  public getList(): Promise<ResponseFoodList> {
    return this.baseHTTP.get('list').then(APIBase._handleResponse).catch(APIBase._handleError);
  }
}

export default new FoodService();
