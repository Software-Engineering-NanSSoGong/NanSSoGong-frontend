import { atom } from 'recoil';
import { Dinner } from '../@types';

export interface DinnerNameWithId {
  id: Dinner['dinnerId'];
  name: Dinner['dinnerName'];
}

export const dinnerNameState = atom<DinnerNameWithId[]>({
  key: 'dinner-list',
  default: [],
});
