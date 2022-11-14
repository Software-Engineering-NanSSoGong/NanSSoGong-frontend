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

/**
 * 해당 음식이 Dinner의 기본 음식 인덱스를 가져오는 함수
 * @param dinner Dinner
 * @param food 파악할 Food
 * @returns index, 기본 음식이 아니면 -1
 */
export function getBasicFoodIndexInDinner(dinner: Dinner, food: AllCaseFoodType): number {
  return dinner.dinnerFoodInfoResponseList.findIndex((item) => item.foodId === food.foodId);
}

/**
 * 해당 dinner의 기본 가격 측정
 * @param dinner 파악할 dinner
 * @param foodList recoil에 저장된 전체 foodList
 * @returns 총 가격
 */
export function getBasicDinnerPrice(dinner: Dinner, foodList: FoodWithQuantity[]) {
  return dinner.dinnerFoodInfoResponseList.reduce((acc, food) => {
    const targetFood = foodList?.find(
      (existFood) => existFood.foodId === food.foodId,
    ) as FoodWithQuantity;
    return acc + food.foodQuantity * targetFood?.foodSellPrice;
  }, 0);
}

/**
 * Dinner와 비교한 음식 카운트
 * @param dinner Dinner
 * @param food 파악할 Food
 * @returns 카운트, 기본 음식이 아니면 0
 */
export function getBasicFoodCountInDinner(dinner: Dinner, food: AllCaseFoodType): number {
  const isOriginFood = isBasicFoodInDinner(dinner, food);
  const foodIndex = getBasicFoodIndexInDinner(dinner, food);
  if (isOriginFood) {
    return dinner.dinnerFoodInfoResponseList[foodIndex].foodQuantity;
  }
  return 0;
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
    const basicFoodCount = getBasicFoodCountInDinner(dinner, food);
    if (isOriginFood && foodInfo[food.foodName].foodQuantity < basicFoodCount) {
      reducedFoodInfos.push({
        foodId: food.foodId,
        price: food.foodSellPrice,
        quantity: basicFoodCount - foodInfo[food.foodName].foodQuantity,
        foodName: food.foodName,
      });
    } else if (isOriginFood && foodInfo[food.foodName].foodQuantity > basicFoodCount) {
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
 * @param foodList 리코일에 들어있는 전체 푸드 리스트
 * @returns 장바구니 내 전체 금액
 */
export function getTotalPrice(myBagState: MyBag[], foodList: FoodWithQuantity[]) {
  return myBagState.reduce(
    (acc, item) =>
      acc +
      getBasicDinnerPrice(item.dinner, foodList) +
      item.selectedStyle.styleSellPrice +
      item.addedFoodInfos.reduce(
        (acc2, food) =>
          acc2 + food.price * (food.quantity - getBasicFoodCountInDinner(item.dinner, food)),
        0,
      ) -
      item.reducedFoodInfos.reduce((acc3, food) => acc3 + food.price * food.quantity, 0),
    0,
  );
}

/**
 * 전체 가격에 세일된 가격을 제외한 가격을 반환하는 함수
 * @param totalPrice
 * @param saleRate
 * @returns totalPrice * ((100 - saleRate) / 100)
 */
export const getPriceAfterSale = (totalPrice: number, saleRate: number): number => {
  return totalPrice * ((100 - saleRate) / 100);
};

type Sign = 'plus' | 'minus';
/**
 * changeFood 정보를 가지고 { "foodId": "foodQuantity" }와 같은 오브젝트를 만들어 주는 함수
 * sign에 따라서 +로 할 지, -로 할 지 결정 된다.
 * @param foodInfos changeFoodInfo
 * @param sign string (plus면 양수, minus면 음수)
 * @returns Record<foodId, foodQuantity>
 */
export const transformNameWithQuantity = (foodInfos: ChangeFoodInfo[], sign: Sign = 'plus') => {
  return foodInfos.reduce(
    (acc, food) => ({
      ...acc,
      [food.foodId]: sign === 'plus' ? food.quantity : -food.quantity,
    }),
    {},
  );
};
