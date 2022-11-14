import { BaseRequestId, RequestSignUpInfo, ResponseClientInfo } from '../@types';
import APIBase from './core';

class ClientService extends APIBase {
  public constructor() {
    super('client');
  }

  public signUp({ ...signUpInfo }: RequestSignUpInfo): Promise<ResponseClientInfo> {
    return this.baseHTTP
      .post('sign', {
        ...signUpInfo,
        loginId: signUpInfo.email,
      })
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public getClientInfo({ id }: Partial<BaseRequestId>): Promise<ResponseClientInfo> {
    return this.baseHTTP
      .get(`${id ? `/${id}` : ''}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }
}

export default new ClientService();
