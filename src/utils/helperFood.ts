import { Dinner, Food, FoodWithQuantity } from '../@types';
import { ChangeFoodInfo, MyBag } from '../stores';

type AllCaseFoodType = FoodWithQuantity | Food | ChangeFoodInfo;

/**
 * dinnerQuantity가 null이 될 수 있음에 따라 dinnerQuantity를 safe하게 숫자를 얻는 함수
 * 이때 여러 로직의 편의상 최소값은 0이 아닌 1이 나온다.
 * @param dinner dinner
 * @returns dinner의 Quantity, 최소 1
 */
export function guardDinnerQuantity(dinner: Dinner): number {
  return Math.max(Number(dinner.dinnerQuantity), 1);
}

/**
 * 해당 음식이 Dinner의 기본 음식인지 파악하는 함수
 * @param dinner Dinner
 * @param food 파악할 Food
 * @returns Boolean, true(기본 음식)
 */
export function isBasicFoodInDinner(dinner: Dinner, food: AllCaseFoodType): Boolean {
  return dinner.dinnerFoodInfoResponseList.findIndex((item) => item.foodId === food.foodId) !== -1;
}

export function getBasicFoodCountInDinner(dinner: Dinner, food: AllCaseFoodType): number {
  const basicDinnerCount = guardDinnerQuantity(dinner);
  const isOriginFood = isBasicFoodInDinner(dinner, food);
  return isOriginFood ? basicDinnerCount : 0;
}

/**
 * dinner와 비교해서 추가된 음식과 삭제된 음식을 반환하는 함수
 * @param dinner 디너
 * @param foodInfo 푸드 이름에 따른 FoodWithQuantity
 * @param foodState food전체 정보
 * @returns
 */
export function getDifferenceFoodInfoFromDinner(
  dinner: Dinner,
  foodInfo: Record<string, FoodWithQuantity>,
  foodState: FoodWithQuantity[],
) {
  const addedFoodInfos: ChangeFoodInfo[] = [];
  const reducedFoodInfos: ChangeFoodInfo[] = [];

  foodState.forEach((food) => {
    const isOriginFood = isBasicFoodInDinner(dinner, food);
    if (isOriginFood && foodInfo[food.foodName].foodQuantity < guardDinnerQuantity(dinner)) {
      reducedFoodInfos.push({
        foodId: food.foodId,
        price: food.foodSellPrice,
        quantity: foodInfo[food.foodName].foodQuantity,
        foodName: food.foodName,
      });
    } else if (isOriginFood && foodInfo[food.foodName].foodQuantity > guardDinnerQuantity(dinner)) {
      addedFoodInfos.push({
        foodId: food.foodId,
        price: food.foodSellPrice,
        quantity: foodInfo[food.foodName].foodQuantity,
        foodName: food.foodName,
      });
    } else if (!isOriginFood && foodInfo[food.foodName].foodQuantity > 0) {
      addedFoodInfos.push({
        foodId: food.foodId,
        price: food.foodSellPrice,
        quantity: foodInfo[food.foodName].foodQuantity,
        foodName: food.foodName,
      });
    }
  });
  return { addedFoodInfos, reducedFoodInfos };
}

/**
 * 장바구니 내 디너의 가격과, 추가된 음식들의 가격을 모두 더하는 함수
 * 디너의 기본 음식 중 삭제된 음식은 가격에 영향을 끼치지 않는다.
 * @param myBagState 장바구니 배열
 * @returns 장바구니 내 전체 금액
 */
export function getTotalPrice(myBagState: MyBag[]) {
  return myBagState.reduce(
    (acc, item) =>
      acc +
      guardDinnerQuantity(item.dinner) * 50000 +
      (item.selectedStyle.styleSellPrice || 5000) +
      item.addedFoodInfos.reduce(
        (acc2, food) =>
          acc2 + food.price * (food.quantity - getBasicFoodCountInDinner(item.dinner, food)),
        0,
      ),
    0,
  );
}
