import { atom, selector } from 'recoil';
import { Dinner } from '../@types';

export interface DinnerNameWithId {
  id: Dinner['dinnerId'];
  name: Dinner['dinnerName'];
}

export const dinnerNameAtom = atom<DinnerNameWithId[]>({
  key: 'dinner-list',
  default: [],
});

export const dinnerNameState = selector<DinnerNameWithId[]>({
  key: 'dinner-list-selector',
  get: ({ get }) => {
    return get(dinnerNameAtom);
  },
  set: ({ set }, willUpdatedState) => {
    set(dinnerNameState, willUpdatedState);
  },
});
