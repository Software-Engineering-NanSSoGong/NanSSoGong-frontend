import { RequestLogInInfo, RequestSignUpInfo } from '../@types';
import { LoginedUser } from '../stores';
import APIBase from './core';

class MemberService extends APIBase {
  public constructor() {
    super('member');
  }

  public logIn({ email, password }: RequestLogInInfo): Promise<LoginedUser> {
    return this.baseHTTP
      .post('login', {
        loginId: email,
        password,
      })
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public logOut(): Promise<string> {
    return this.baseHTTP.post('logout').then(APIBase._handleResponse).catch(APIBase._handleError);
  }

  public checkValidId({ email }: Pick<RequestSignUpInfo, 'email'>) {
    return this.baseHTTP
      .get(`valid-id?loginId=${email}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }
}

export default new MemberService();
