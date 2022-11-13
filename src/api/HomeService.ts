import { OperationHour } from '../@types';
import APIBase from './core';

class HomeService extends APIBase {
  constructor() {
    super('home');
  }

  public getCurrentOperatingHours(): Promise<OperationHour> {
    return this.baseHTTP
      .get('operation-time')
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public changeOperatingHours({ openHour, openMinute, closeHour, closeMinute }: OperationHour) {
    return this.baseHTTP
      .put('operation-time', {
        openHour,
        openMinute,
        closeHour,
        closeMinute,
      })
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }
}

export default new HomeService();
