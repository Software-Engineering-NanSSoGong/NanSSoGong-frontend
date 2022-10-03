import APIBase from './core';

class MemberService extends APIBase {
  public constructor() {
    super('mebmer');
  }

  public login() {
    return this.baseHTTP.post('login').then(APIBase._handleResponse).catch(APIBase._handleError);
  }
}

export default MemberService;
