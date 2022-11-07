import { RequestDinnerList } from '../@types';
import APIBase from './core';

class DinnerService extends APIBase {
  constructor() {
    super('dinner');
  }

  getDinnerList({ page, size }: RequestDinnerList): Promise<any> {
    return this.baseHTTP
      .get(`list?page=${page}&size=${size}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }
}

export default new DinnerService();
