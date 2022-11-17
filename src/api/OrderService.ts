import {
  BasePageRequest,
  History,
  Order,
  RequestChangeOrderStatus,
  RequestModifyOrderInfo,
  ResponseOrderHistoryList,
} from '../@types';
import APIBase from './core';

class OrderService extends APIBase {
  public constructor() {
    super('order');
  }

  public getClientHistory({ page, size }: BasePageRequest): Promise<ResponseOrderHistoryList> {
    return this.baseHTTP
      .get(`client/list?page=${page}size=${size}&sort=orderTime,desc`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public orderClient({ ...orderInfo }: Order) {
    return this.baseHTTP
      .post('client', {
        ...orderInfo,
        reservedTime: orderInfo.reservedTime?.toISOString(),
      })
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public orderGuest({ ...orderInfo }: Order) {
    console.log(orderInfo);
    return this.baseHTTP
      .post('guest', {
        ...orderInfo,
        reservedTime: orderInfo.reservedTime?.toISOString(),
      })
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public getGuestHistory({ id }: { id: string }): Promise<History> {
    return this.baseHTTP
      .get(`guest/${id}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public getList({ page, size }: BasePageRequest): Promise<ResponseOrderHistoryList> {
    return this.baseHTTP
      .get(`list?page=${page}&size=${size}&sort=orderTime,desc`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public modifyOrderInfo({ orderId, orderSheetUpdateRequestList }: RequestModifyOrderInfo) {
    return this.baseHTTP
      .put(`${orderId}`, { orderSheetUpdateRequestList })
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public changeOrderStatus({ orderId, orderStatus }: RequestChangeOrderStatus): Promise<string> {
    return this.baseHTTP
      .patch('status', {
        orderId,
        orderStatus,
      })
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public checkMakeOrder({ orderId }: Pick<RequestChangeOrderStatus, 'orderId'>): Promise<boolean> {
    return this.baseHTTP
      .get(`/make/${orderId}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public makeOrder({ orderId }: Pick<RequestChangeOrderStatus, 'orderId'>): Promise<boolean> {
    return this.baseHTTP
      .post(`/make/${orderId}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }
}

export default new OrderService();
