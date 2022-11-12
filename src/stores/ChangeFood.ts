import { atom } from 'recoil';

export interface ModifyOrder {
  orderId: number;
  styleId: number;
  willChangeOrderIndex: number;
  orderSheetUpdateRequestList: {
    orderSheetId: number;
    styleId: number;
    dinnerId: number;
    foodIdAndDifference: Record<string, number>;
  }[];
}

export const changeFoodState = atom<ModifyOrder>({
  key: 'change-food',
  default: {
    orderId: -1,
    styleId: -1,
    willChangeOrderIndex: -1,
    orderSheetUpdateRequestList: [],
  },
});
