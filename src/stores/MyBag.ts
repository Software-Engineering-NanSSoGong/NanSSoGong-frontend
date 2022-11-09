import { atom, selector } from 'recoil';
import { Dinner, Style } from '../@types';
import { storage } from '../utils';

export interface ChangeFoodInfo {
  foodId: number;
  price: number;
  foodName: string;
  quantity: number;
}

export interface MyBag {
  dinner: Dinner;
  addedFoodInfos: ChangeFoodInfo[];
  reducedFoodInfos: ChangeFoodInfo[];
  selectedStyle: Style;
}

export const myBagAtom = atom<MyBag[]>({
  key: 'myBagAtom',
  default: [],
});

export const myBagSelector = selector<MyBag[]>({
  key: 'myBagSelector',
  get: ({ get }) => {
    const recoilStoredData = get(myBagAtom);
    const storageData = storage.get('mybag');
    return recoilStoredData.length === 0 ? storageData : recoilStoredData;
  },
  set: ({ set }, willUpdatedState) => {
    set(myBagAtom, willUpdatedState);
    storage.set('mybag', willUpdatedState);
  },
});
