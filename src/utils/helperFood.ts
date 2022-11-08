import { Dinner, FoodWithQuantity } from '../@types';
import { ChangeFoodInfo, MyBag } from '../stores';

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

export function getTotalPrice(myBagState: MyBag[]) {
  return myBagState.reduce(
    (acc, item) =>
      acc +
      (item.dinner.dinnerQuantity || 1) * 50000 +
      (item.selectedStyle.styleSellPrice || 5000) +
      item.addedFoodInfos.reduce(
        (acc2, food) => acc2 + food.price * (food.quantity - (item.dinner.dinnerQuantity || 1)),
        0,
      ),
    0,
  );
}
