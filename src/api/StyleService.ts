import { ResponseStyleList } from '../@types';
import APIBase from './core';

class StyleService extends APIBase {
  public constructor() {
    super('style');
  }

  public getList(): Promise<ResponseStyleList> {
    return this.baseHTTP.get('list').then(APIBase._handleResponse).catch(APIBase._handleError);
  }
}

export default new StyleService();
