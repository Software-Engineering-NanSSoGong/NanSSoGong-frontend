import { BasePageRequest, BaseRequsetId, ResponseDinnerItem, ResponseDinnerList } from '../@types';
import APIBase from './core';

class DinnerService extends APIBase {
  constructor() {
    super('dinner');
  }

  getDinnerList({ page, size }: BasePageRequest): Promise<ResponseDinnerList> {
    return this.baseHTTP
      .get(`list?page=${page}&size=${size}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  getDinnerItem({ id }: BaseRequsetId): Promise<ResponseDinnerItem> {
    return this.baseHTTP.get(`${id}`).then(APIBase._handleResponse).catch(APIBase._handleError);
  }
}

export default new DinnerService();
