import { RequestSignUpInfo } from '../@types';
import APIBase from './core';

class MemberService extends APIBase {
  public constructor() {
    super('member');
  }

  public login() {
    return this.baseHTTP.post('login').then(APIBase._handleResponse).catch(APIBase._handleError);
  }

  public checkValidId({ email }: Pick<RequestSignUpInfo, 'email'>) {
    return this.baseHTTP
      .get(`valid-id?loginId=${email}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }
}

export default new MemberService();
