import APIBase from './core';

class ChefSerivce extends APIBase {
  public constructor() {
    super('chef');
  }

  public sign() {
    return this.baseHTTP.post('sign').then(APIBase._handleResponse).catch(APIBase._handleError);
  }
}

export default ChefSerivce;
