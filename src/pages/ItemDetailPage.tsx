import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Dinner, FoodWithQuantity, Style } from '../@types';
import { DinnerService } from '../api';
import {
  FoodBox,
  FoodQuantityBoxList,
  Modal,
  OrderConfirmBox,
  SideMenuList,
  Typography,
} from '../components';
import BottomButton from '../components/BottomButton';
import { foodState as RecoilFoodState } from '../stores/Food';

const transformToNameWithInfoObject = (foodList: FoodWithQuantity[], dinner: Dinner) => {
  return foodList.reduce(
    (acc, item) => ({
      ...acc,
      [item.foodName]: {
        ...item,
        foodQuantity:
          dinner.dinnerFoodInfoResponseList?.findIndex((food) => food.foodId === item.foodId) === -1
            ? 0
            : dinner.dinnerQuantity || 1,
      },
    }),
    {},
  );
};

function ItemDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const foods = useRecoilValue(RecoilFoodState);
  const [dinner, setDinner] = useState<Dinner>({} as Dinner);
  const [foodState, setFoodState] = useState<Record<string, FoodWithQuantity>>({});
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);

  const handleChangeDinnerQuantity = (quantity: number) => {
    const nextDinnerItem = { ...dinner, dinnerQuantity: quantity };
    setDinner(nextDinnerItem);
    setFoodState(transformToNameWithInfoObject(foods, nextDinnerItem));
  };

  useEffect(() => {
    (async () => {
      const dinnerItem = await DinnerService.getDinnerItem({ id: Number(params?.id) });
      setDinner({ ...dinnerItem, dinnerQuantity: 1 });
      setFoodState(transformToNameWithInfoObject(foods, dinnerItem));
    })();
  }, [foods, params?.id]);

  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        <FoodBox
          type='beforeOrder'
          dinner={dinner}
          handleChangeDinnerQuantity={handleChangeDinnerQuantity}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />
        <FoodQuantityBoxList
          title='밥 추가'
          foods={Object.values(foodState).filter((item) => item.foodCategory === 'rice')}
          setFoodState={setFoodState}
        />
        <FoodQuantityBoxList
          title='고기 추가'
          foods={Object.values(foodState).filter((item) => item.foodCategory === 'MEAT')}
          setFoodState={setFoodState}
        />
        <FoodQuantityBoxList
          title='음료 추가'
          foods={Object.values(foodState).filter((item) => item.foodCategory === 'drink')}
          setFoodState={setFoodState}
        />
      </Spacer>
      <Modal
        triggerNode={
          <Modal.triggerButton
            modalType='open'
            as={BottomButton}
            buttonProps={{ disabled: dinner.dinnerQuantity === 0 || selectedStyle === null }}
            style={{
              position: 'fixed',
              marginLeft: '300px',
              width: 'calc(100% - 300px)',
            }}
          >
            <Typography type='h3' textAlign='center'>
              주문하기
            </Typography>
          </Modal.triggerButton>
        }
        modalNode={
          <Modal.askModal onClickConfirm={() => navigate('/order')}>
            <OrderConfirmBox
              dinner={dinner}
              orderedFoodInfo={foodState}
              selectedStyle={selectedStyle!}
            />
          </Modal.askModal>
        }
      ></Modal>
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
