import {
  BasePageRequest,
  BaseRequestId,
  RequestSignUpInfo,
  ResponseSignUpEmployeeList,
  ResponseSignUpInfo,
} from '../@types';
import APIBase from './core';

class RiderService extends APIBase {
  public constructor() {
    super('rider');
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

  public getRequestSignUpList({
    page,
    size,
  }: BasePageRequest): Promise<ResponseSignUpEmployeeList> {
    return this.baseHTTP
      .get(`sign-allow/list?page=${page}&size=${size}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public acceptSignUp({ id }: BaseRequestId) {
    return this.baseHTTP
      .post(`sign-allow/${id}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }

  public denySignUp({ id }: BaseRequestId) {
    return this.baseHTTP
      .post(`sign-deny/${id}`)
      .then(APIBase._handleResponse)
      .catch(APIBase._handleError);
  }
}

export default new RiderService();
