import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Dinner, Food, Style } from '../@types';
import { FoodBox, FoodQuantityBoxList, SideMenuList, Typography } from '../components';
import BottomButton from '../components/BottomButton';
import { Foods, FrenchDinner } from '../dummy/dinner';

const initialDummyFoodState = (food: Food[]) => {
  return food.reduce((acc, item) => ({ ...acc, [item.name]: { ...item, quantity: 0 } }), {});
};

function ItemDetailPage() {
  const [dinner, setDinner] = useState<Dinner>({} as Dinner);
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [foodState, setFoodState] = useState<Record<string, Food>>(initialDummyFoodState(Foods));

  useEffect(() => {
    // TODO: 백엔드로부터 디너 받기 with 리코일 상태관리
    setDinner({ ...FrenchDinner, quantity: 1 });
  }, []);

  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        <FoodBox
          type='beforeOrder'
          dinner={dinner}
          setDinner={setDinner}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />
        <FoodQuantityBoxList
          title='밥 추가'
          foods={Object.values(foodState).filter((item) => item.type === 'rice')}
          setFoodState={setFoodState}
        />
        <FoodQuantityBoxList
          title='고기 추가'
          foods={Object.values(foodState).filter((item) => item.type === 'meat')}
          setFoodState={setFoodState}
        />
        <FoodQuantityBoxList
          title='음료 추가'
          foods={Object.values(foodState).filter((item) => item.type === 'drink')}
          setFoodState={setFoodState}
        />
      </Spacer>
      <BottomButton
        buttonProps={{ disabled: dinner.quantity === 0 || selectedStyle === null }}
        style={{
          marginLeft: '300px',
          width: 'calc(100% - 300px)',
        }}
      >
        <Typography type='h3' textAlign='center'>
          주문하기
        </Typography>
      </BottomButton>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
`;

const Spacer = styled.div`
  padding: 80px 80px 120px 380px;
`;

export default ItemDetailPage;
