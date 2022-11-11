export type StyleName = 'simple' | 'deluxe' | 'grande';
export interface Address {
  city: string;
  street: string;
  zipcode: string;
}

export interface Food {
  foodId: number;
  foodName: string;
  foodSellPrice: number;
  foodCategory: string;
  foodOrderable: boolean;
}

export interface FoodWithQuantity extends Food {
  foodQuantity: number;
}

export interface Dinner {
  dinnerId: number;
  dinnerName: string;
  dinnerDescription: string;
  dinnerOrderable: boolean;
  dinnerFoodInfoResponseList: (Pick<Food, 'foodId' | 'foodName'> & { foodQuantity: number })[];
  dinnerImage?: string;
  dinnerQuantity?: number;
  excludedStyleInfoResponseList: {
    excludedStyleId: number;
    excludedStyleName: string;
  }[];
}

export interface AddedDinner extends Dinner {
  selectedStyle: Style;
}

export interface Style {
  styleId: number;
  styleName: string;
  styleSellPrice: number;
  styleOrderable: boolean;
  styleTablewareInfoResponseList: [
    {
      tablewareId: number;
      tablewareName: string;
    },
  ];
}

export interface OrderSheet {
  orderSheetId: number;
  styleId: number;
  styleName: string;
  dinnerId: number;
  dinnerName: string;
  foodDifferenceInfoResponseList: (Pick<Food, 'foodId' | 'foodName'> & {
    foodQuantity: number;
    orderSheetItemId: number;
  })[];
}

export type OrderStatus =
  | 'ORDERED'
  | 'RESERVED'
  | 'ACCEPTED'
  | 'DENIED'
  | 'CANCEL'
  | 'COOKED'
  | 'DELIVERING'
  | 'DELIVERED';

export interface History {
  orderId: number;
  riderId: number | null;
  riderName: string;
  address: Address;
  orderTime: string;
  reservedTime: string | null;
  orderStatus: OrderStatus;
  totalPriceAfterSale: number | null;
  orderSheetResponseList: OrderSheet[];
  clientId: number;
  clientName: string;
}
