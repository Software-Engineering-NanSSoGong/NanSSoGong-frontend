import { atom } from 'recoil';
import { FoodWithQuantity } from '../@types';

export const foodState = atom<FoodWithQuantity[]>({
  key: 'food',
  default: [],
});
