import APIBase from './core';

class RiderService extends APIBase {
  public constructor() {
    super('rider');
  }

  public sign() {
    return this.baseHTTP.post('sign').then(APIBase._handleResponse).catch(APIBase._handleError);
  }
}

export default RiderService;
