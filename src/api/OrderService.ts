import {
  BasePageRequest,
  BaseRequsetId,
  History,
  RequestModifyOrderInfo,
  ResponseFoodList,
  ResponseOrderHistoryList,
} from '../@types';
import APIBase from './core';

class OrderService extends APIBase {
  public constructor() {
    super('order');
  }

  public getClientHistory({ page, size }: BasePageRequest): Promise<ResponseOrderHistoryList> {
    return this.baseHTTP
      .get(`client/list?page=${page}size=${size}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public getGuestHistory({ id }: BaseRequsetId): Promise<History> {
    return this.baseHTTP
      .get(`guest/${id}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public getList({ page, size }: BasePageRequest): Promise<ResponseFoodList> {
    return this.baseHTTP
      .get(`list?page=${page}&size=${size}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public modifyOrderInfo({ orderId, orderSheetUpdateRequestList }: RequestModifyOrderInfo) {
    return this.baseHTTP
      .put(`${orderId}`, { orderSheetUpdateRequestList })
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }
}

export default new OrderService();
