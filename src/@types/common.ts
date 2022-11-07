export type StyleName = 'simple' | 'deluxe' | 'grande';

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
