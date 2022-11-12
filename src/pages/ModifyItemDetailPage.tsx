import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { Dinner, FoodWithQuantity, FOOD_CATEGORY, Style } from '../@types';
import { DinnerService, OrderService } from '../api';
import {
  FoodBox,
  FoodQuantityBoxList,
  Modal,
  OrderConfirmBox,
  SideMenuList,
  Typography,
} from '../components';
import BottomButton from '../components/BottomButton';
import { changeFoodState, styleState } from '../stores';
import { foodState as RecoilFoodState } from '../stores/Food';
import {
  getBasicFoodCountInDinner,
  getBasicFoodIndexInDinner,
  getDifferenceFoodInfoFromDinner,
  transformNameWithQuantity,
} from '../utils';

const transformToNameWithInfoObject = (
  foodList: FoodWithQuantity[],
  dinner: Dinner,
  modifiedFoodList: Record<string, number>,
) => {
  return foodList.reduce((acc, item) => {
    const foodIndex = getBasicFoodIndexInDinner(dinner, item);
    let quantity = foodIndex === -1 ? 0 : dinner.dinnerFoodInfoResponseList[foodIndex].foodQuantity;
    if (modifiedFoodList?.hasOwnProperty(item.foodId)) {
      quantity =
        foodIndex === -1
          ? modifiedFoodList[item.foodId]
          : getBasicFoodCountInDinner(dinner, item) + modifiedFoodList[item.foodId];
    }
    return {
      ...acc,
      [item.foodName]: {
        ...item,
        foodQuantity: quantity,
      },
    };
  }, {});
};

function ModifyItemDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const foodList = useRecoilValue(RecoilFoodState);
  const styleList = useRecoilValue(styleState);
  const changeFood = useRecoilValue(changeFoodState);
  const resetChangeFood = useResetRecoilState(changeFoodState);
  const [dinner, setDinner] = useState<Dinner>({} as Dinner);
  const [foodState, setFoodState] = useState<Record<string, FoodWithQuantity>>({});
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);

  const handleClickModalConfirmButton = async () => {
    const { addedFoodInfos, reducedFoodInfos } = getDifferenceFoodInfoFromDinner(
      dinner,
      foodState,
      foodList,
    );
    const addedNameWithQuantityObject = transformNameWithQuantity(addedFoodInfos);
    const reducedNameWithQuantityObject = Object.entries(
      transformNameWithQuantity(reducedFoodInfos),
    ).reduce((acc, [key, value]) => ({ ...acc, [key]: -Number(value) }), {});
    const nextOrderSheetUpdateRequestList = [...changeFood.orderSheetUpdateRequestList].map(
      (info, idx) => {
        if (idx === changeFood.willChangeOrderIndex) {
          return {
            ...info,
            styleId: Number(selectedStyle?.styleId),
            foodIdAndDifference: {
              ...addedNameWithQuantityObject,
              ...reducedNameWithQuantityObject,
            },
          };
        }
        return { ...info };
      },
    );
    await OrderService.modifyOrderInfo({
      orderId: changeFood.orderId,
      orderSheetUpdateRequestList: nextOrderSheetUpdateRequestList,
    });
    resetChangeFood();
    alert('주문을 수정하였습니다.');
    navigate('/history');
  };

  useEffect(() => {
    (async () => {
      if (changeFood.willChangeOrderIndex !== -1) {
        const dinnerItem = await DinnerService.getDinnerItem({ id: Number(params?.id) });
        setFoodState(
          transformToNameWithInfoObject(
            foodList,
            dinnerItem,
            changeFood.orderSheetUpdateRequestList[changeFood.willChangeOrderIndex]
              ?.foodIdAndDifference,
          ),
        );
        setDinner({ ...dinnerItem, dinnerQuantity: 1 });
        setSelectedStyle(styleList.find((st) => st.styleId === changeFood.styleId) as Style);
      }
    })();
  }, [
    changeFood.orderSheetUpdateRequestList,
    changeFood.styleId,
    changeFood.willChangeOrderIndex,
    foodList,
    params?.id,
    styleList,
  ]);

  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        <FoodBox
          type='beforeOrder'
          dinner={dinner}
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
              수정하기
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

export default ModifyItemDetailPage;
