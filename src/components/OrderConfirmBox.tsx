import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { Dinner, FoodWithQuantity, Style } from '../@types';
import { foodState } from '../stores/Food';
import { theme } from '../styles';
import {
  getBasicFoodCountInDinner,
  getDifferenceFoodInfoFromDinner,
  getTotalPrice,
} from '../utils';
import { Typography } from './common';

interface Props {
  dinner: Dinner;
  orderedFoodInfo: Record<string, FoodWithQuantity>;
  selectedStyle: Style;
}

function OrderConfirmBox({ dinner, orderedFoodInfo, selectedStyle }: Props) {
  const foodList = useRecoilValue(foodState);
  const { addedFoodInfos, reducedFoodInfos } = getDifferenceFoodInfoFromDinner(
    dinner,
    orderedFoodInfo,
    foodList,
  );
  const totalPrice = getTotalPrice(
    [
      {
        dinner,
        addedFoodInfos,
        reducedFoodInfos,
        selectedStyle,
      },
    ],
    foodList,
  );

  return (
    <Wrapper>
      <ModalSpacer>
        <Typography type='h3' textAlign='center' color={theme.colors.text.dark}>
          주문 정보
        </Typography>
        <Line>
          <Typography type='h6' color={theme.colors.text.dark}>
            {dinner?.dinnerName}
          </Typography>
          <Typography type='body5' color={theme.colors.text.dark}>
            {dinner?.dinnerQuantity}개
          </Typography>
        </Line>
        <Line>
          <Typography type='h6' color={theme.colors.text.dark}>
            스타일
          </Typography>
          <Typography type='body5' color={theme.colors.text.dark}>
            {selectedStyle.styleName}
          </Typography>
        </Line>
        {addedFoodInfos?.map((food) => (
          <Line key={food.foodId}>
            <Typography type='h6' color={theme.colors.text.dark}>
              {food.foodName} 추가
            </Typography>
            <Typography type='body5' color={theme.colors.primary.green}>
              {food.quantity - getBasicFoodCountInDinner(dinner, food)}개
            </Typography>
          </Line>
        ))}
        {reducedFoodInfos?.map((food) => (
          <Line key={food.foodId}>
            <Typography type='h6' color={theme.colors.text.dark}>
              {food.foodName} 제외
            </Typography>
            <Typography type='body5' color={theme.colors.primary.red}>
              {food.quantity}개
            </Typography>
          </Line>
        ))}
        <Line>
          <Typography type='h6' color={theme.colors.text.dark} textAlign='end'>
            총 금액
          </Typography>
          <Typography type='body5' color={theme.colors.text.dark} textAlign='end'>
            {totalPrice.toLocaleString()}원
          </Typography>
        </Line>
      </ModalSpacer>
      <Typography
        type='body4'
        color={theme.colors.text.dark}
        style={{
          borderTop: `1px solid ${theme.palette.gray300}`,
          paddingTop: 16,
          paddingLeft: 16,
        }}
      >
        다음 {dinner?.dinnerName}를 정말로 주문하시겠습니까?
      </Typography>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ModalSpacer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Line = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default OrderConfirmBox;
