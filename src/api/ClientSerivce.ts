import APIBase from './core';

class ClientService extends APIBase {
  public constructor() {
    super('client');
  }

  public sign() {
    return this.baseHTTP.post('sign').then(APIBase._handleResponse).catch(APIBase._handleError);
  }
}

export default new ClientService();
