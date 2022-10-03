import { atom } from 'recoil';

export interface MyBag {}

export const myBagState = atom<MyBag>({
  key: 'myBag',
  default: {},
});
