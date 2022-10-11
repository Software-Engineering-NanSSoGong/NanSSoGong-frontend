import { Dinner, Food } from '../@types';

export const FrenchDinner: Dinner = {
  name: '프렌치 디너 세트',
  image: '/Dinner.png',
  description:
    '프렌치 디너는 커피 한잔, 와인 한잔, 샐러드, 스테이크가 제공되며 미스터 대박 디너 서비스의 인기 세트 중 하나로 프랑스식의 근사한 저녁 식사를 드실 수 있습니다',
  price: 10000,
  styles: [
    { name: 'simple', price: 0 },
    { name: 'grande', price: 5000 },
    { name: 'deluxe', price: 10000 },
  ],
};

export const Foods: Food[] = [
  { name: '감자', price: 500, type: 'meat' },
  { name: '고구마', price: 1000, type: 'meat' },
  { name: '스테이크', price: 5000, type: 'meat' },
  { name: '브레드', price: 1500, type: 'meat' },
  { name: '커피', price: 500, type: 'meat' },
  { name: '감자2', price: 500, type: 'rice' },
  { name: '고구마2', price: 1000, type: 'rice' },
  { name: '스테이크2', price: 5000, type: 'rice' },
  { name: '브레드2', price: 1500, type: 'rice' },
  { name: '커피2', price: 500, type: 'rice' },
  { name: '감자3', price: 500, type: 'drink' },
  { name: '고구마3', price: 1000, type: 'drink' },
  { name: '스테이크3', price: 5000, type: 'drink' },
  { name: '브레드3', price: 1500, type: 'drink' },
  { name: '커피3', price: 500, type: 'drink' },
];

export type FoodKeyType = typeof Foods;
