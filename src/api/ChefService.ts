import { RequestSignUpInfo, ResponseSignUpInfo } from '../@types';
import APIBase from './core';

class ChefSerivce extends APIBase {
  public constructor() {
    super('chef');
  }

  public signUp({ email, password, name }: RequestSignUpInfo): Promise<ResponseSignUpInfo> {
    return this.baseHTTP
      .post('sign', {
        loginId: email,
        password,
        name,
      })
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }
}

export default new ChefSerivce();
