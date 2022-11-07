import { atom } from 'recoil';
import { Style } from '../@types';

export const styleState = atom<Style[]>({
  key: 'style',
  default: [],
});
