export type StyleName = 'simple' | 'deluxe' | 'grande';

export interface Address {
  city: string;
  street: string;
  zipcode: string;
}

export interface Card {
  card1: number | null;
  card2: number | null;
  card3: number | null;
  card4: number | null;
}

export const FOOD_CATEGORY = {
  WINE: 'WINE',
  BREAD: 'BREAD',
  MEAT: 'MEAT',
  SALAD: 'SALAD',
  COFFEE: 'COFFEE',
  SIDE: 'SIDE',
} as const;

export interface Food {
  foodId: number;
  foodName: string;
  foodSellPrice: number;
  foodCategory: keyof typeof FOOD_CATEGORY;
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
  dinnerImageAbsolutePath?: string;
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
  reservedTime?: Date;
  orderStatus: OrderStatus;
  totalPriceAfterSale: number | null;
  orderSheetResponseList: OrderSheet[];
  clientId: number;
  clientName: string;
}

export interface Order {
  address: Address;
  orderStatus?: OrderStatus;
  reservedTime?: Date;
  totalPriceAfterSale: number;
  orderSheetCreateRequestList: {
    styleId: number;
    dinnerId: number;
    foodIdAndDifference: Record<string, number>;
  }[];
  name?: string;
  cardNumber?: string;
}

export interface Ingredient {
  ingredientId: number;
  ingredientName: string;
  stockQuantity: number;
  ingredientRecipeInfoList: (Pick<Food, 'foodId' | 'foodName'> & { ingredientQuantity: number })[];
}

export interface RequestSignUpEmployee {
  chefSignId: number;
  riderSignId: number;
  name: string;
  loginId: string;
}
