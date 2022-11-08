import { Dinner, FoodWithQuantity } from '../@types';

export interface ChangeFoodInfo {
  foodId: number;
  price: number;
  foodName: string;
  quantity: number;
}

export function getDifferenceFoodInfoFromDinner(
  dinner: Dinner,
  foodInfo: Record<string, FoodWithQuantity>,
  foodState: FoodWithQuantity[],
) {
  const addedFoodInfos: ChangeFoodInfo[] = [];
  const reducedFoodInfos: ChangeFoodInfo[] = [];

  foodState.forEach((food) => {
    const isOriginFood =
      dinner.dinnerFoodInfoResponseList.findIndex((item) => item.foodId === food.foodId) !== -1;
    if (isOriginFood && foodInfo[food.foodName].foodQuantity < (dinner.dinnerQuantity || 1)) {
      reducedFoodInfos.push({
        foodId: food.foodId,
        price: food.foodSellPrice,
        quantity: foodInfo[food.foodName].foodQuantity,
        foodName: food.foodName,
      });
    } else if (
      isOriginFood &&
      foodInfo[food.foodName].foodQuantity > (dinner.dinnerQuantity || 1)
    ) {
      addedFoodInfos.push({
        foodId: food.foodId,
        price: food.foodSellPrice * (foodInfo[food.foodName].foodQuantity - 1),
        quantity: foodInfo[food.foodName].foodQuantity,
        foodName: food.foodName,
      });
    } else if (!isOriginFood && foodInfo[food.foodName].foodQuantity > 0) {
      addedFoodInfos.push({
        foodId: food.foodId,
        price: food.foodSellPrice * foodInfo[food.foodName].foodQuantity,
        quantity: foodInfo[food.foodName].foodQuantity,
        foodName: food.foodName,
      });
    }
  });
  return { addedFoodInfos, reducedFoodInfos };
}
