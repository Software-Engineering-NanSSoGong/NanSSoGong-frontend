import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Dinner, FoodWithQuantity, FOOD_CATEGORY, Style } from '../@types';
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
import { myBagSelector } from '../stores';
import { foodState as RecoilFoodState } from '../stores/Food';
import { getBasicFoodIndexInDinner, getDifferenceFoodInfoFromDinner } from '../utils';

const transformToNameWithInfoObject = (foodList: FoodWithQuantity[], dinner: Dinner) => {
  return foodList.reduce((acc, item) => {
    const foodIndex = getBasicFoodIndexInDinner(dinner, item);
    return {
      ...acc,
      [item.foodName]: {
        ...item,
        foodQuantity:
          foodIndex === -1 ? 0 : dinner.dinnerFoodInfoResponseList[foodIndex].foodQuantity || 1,
      },
    };
  }, {});
};

function ItemDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const foods = useRecoilValue(RecoilFoodState);
  const setMyBagState = useSetRecoilState(myBagSelector);
  const [dinner, setDinner] = useState<Dinner>({} as Dinner);
  const [foodState, setFoodState] = useState<Record<string, FoodWithQuantity>>({});
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);

  const handleChangeDinnerQuantity = (quantity: number) => {
    const nextDinnerItem = { ...dinner, dinnerQuantity: quantity };
    setDinner(nextDinnerItem);
    setFoodState(transformToNameWithInfoObject(foods, nextDinnerItem));
  };

  const handleClickModalConfirmButton = () => {
    const { addedFoodInfos, reducedFoodInfos } = getDifferenceFoodInfoFromDinner(
      dinner,
      foodState,
      foods,
    );
    setMyBagState((prev) => [
      ...prev,
      { dinner, selectedStyle: selectedStyle as Style, addedFoodInfos, reducedFoodInfos },
    ]);
    alert('장바구니에 성공적으로 담겼습니다.');
    navigate('/main');
  };

  useEffect(() => {
    (async () => {
      const dinnerItem = await DinnerService.getDinnerItem({ id: Number(params?.id) });
      setFoodState(transformToNameWithInfoObject(foods, dinnerItem));
      setDinner({ ...dinnerItem, dinnerQuantity: 1 });
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
        {Object.keys(FOOD_CATEGORY).map((category) => (
          <FoodQuantityBoxList
            key={category}
            title={`${category} 추가`}
            foods={Object.values(foodState).filter((item) => item.foodCategory === category)}
            setFoodState={setFoodState}
          />
        ))}
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
          <Modal.askModal onClickConfirm={handleClickModalConfirmButton}>
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
