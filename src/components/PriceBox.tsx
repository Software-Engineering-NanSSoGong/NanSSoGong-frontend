import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { GRADE, GRADE_INFO } from '../@types';
import { myBagSelector } from '../stores';
import { foodState } from '../stores/Food';
import { theme } from '../styles';
import { getBasicDinnerPrice, getBasicFoodCountInDinner, getPriceAfterSale, guardDinnerQuantity } from '../utils';
import { Typography } from './common';

interface Props {
  totalPrice: number;
  clientGrade: GRADE;
}

function PriceBox({ totalPrice, clientGrade }: Props) {
  const foodList = useRecoilValue(foodState);
  const myBagState = useRecoilValue(myBagSelector);

  return (
    <Wrapper>
      <Typography type='h3' color={theme.colors.text.bold}>
        결제 금액
      </Typography>
      {myBagState.map((item, idx) => (
        <ItemPriceBox key={idx}>
          <BetweenLine>
            <NameWithQuantity>
              <Typography type='h4' color={theme.colors.text.bold}>
                {item.dinner.dinnerName}
              </Typography>
              <Typography type='h5' color={theme.colors.primary.red}>
                ({guardDinnerQuantity(item.dinner)} 개)
              </Typography>
            </NameWithQuantity>
            <Typography type='body4' color={theme.colors.primary.yellow}>
              + {getBasicDinnerPrice(item.dinner, foodList).toLocaleString()} 원
            </Typography>
          </BetweenLine>

          <BetweenLine>
            <Typography type='h4' color={theme.colors.text.bold}>
              {item.selectedStyle.styleName}
            </Typography>
            <Typography type='body4' color={theme.colors.primary.yellow}>
              + {item.selectedStyle.styleSellPrice?.toLocaleString()} 원
            </Typography>
          </BetweenLine>

          {item.addedFoodInfos?.map((food) => (
            <BetweenLine key={food.foodId}>
              <NameWithQuantity>
                <Typography type='h4' color={theme.colors.text.bold}>
                  {food.foodName}
                </Typography>
                <Typography type='h5' color={theme.colors.primary.red}>
                  ({food.quantity - getBasicFoodCountInDinner(item.dinner, food)} 개 추가)
                </Typography>
              </NameWithQuantity>
              <Typography type='body4' color={theme.colors.primary.yellow}>
                +{' '}
                {(
                  (food.quantity - getBasicFoodCountInDinner(item.dinner, food)) *
                  food.price
                ).toLocaleString()}
                원
              </Typography>
            </BetweenLine>
          ))}
          <Divider />
        </ItemPriceBox>
      ))}
      <BetweenLine style={{ marginTop: '32px' }}>
        <Typography type='h4' color={theme.colors.text.bold}>
          {clientGrade} 등급
        </Typography>
        <Typography type='body4' color={theme.colors.primary.yellow}>
          {GRADE_INFO[clientGrade].saleRate} % 할인
        </Typography>
      </BetweenLine>
      <Divider />
      <BetweenLine style={{ marginTop: '32px' }}>
        <Typography type='h4' color={theme.colors.text.bold}>
          총 금액
        </Typography>
        <Typography type='h4'>
          {getPriceAfterSale(totalPrice, GRADE_INFO[clientGrade].saleRate).toLocaleString()} 원
        </Typography>
      </BetweenLine>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const BetweenLine = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ItemPriceBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 32px;
`;

const Divider = styled.div`
  width: calc(100% + 46px);
  margin-left: -24px;
  margin-top: 32px;
  content: '';
  border: 1px solid ${theme.palette.gray50};
`;

const NameWithQuantity = styled.span`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export default PriceBox;
