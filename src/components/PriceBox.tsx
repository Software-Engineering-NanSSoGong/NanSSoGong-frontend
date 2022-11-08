import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { myBagSelector } from '../stores';
import { theme } from '../styles';
import { Typography } from './common';

interface Props {
  totalPrice: number;
}

function PriceBox({ totalPrice }: Props) {
  const myBagState = useRecoilValue(myBagSelector);

  return (
    <Wrapper>
      <Typography type='h3' color={theme.colors.text.bold}>
        결제 금액
      </Typography>
      {myBagState.map((item, idx) => (
        <ItemPriceBox key={idx}>
          <BetweenLine>
            <Typography type='h4' color={theme.colors.text.bold}>
              {item.dinner.dinnerName}
            </Typography>
            <Typography type='body4' color={theme.colors.primary.yellow}>
              + {((item.dinner.dinnerQuantity || 1) * 50000).toLocaleString()} 원
            </Typography>
          </BetweenLine>

          <BetweenLine>
            <Typography type='h4' color={theme.colors.text.bold}>
              {item.selectedStyle.styleName}
            </Typography>
            <Typography type='body4' color={theme.colors.primary.yellow}>
              + {(item.selectedStyle.styleSellPrice || 5000).toLocaleString()} 원
            </Typography>
          </BetweenLine>

          {item.addedFoodInfos?.map((food) => (
            <BetweenLine key={food.foodId}>
              <Typography type='h4' color={theme.colors.text.bold}>
                {food.foodName}
              </Typography>
              <Typography type='body4' color={theme.colors.primary.yellow}>
                +
                {(
                  (food.quantity - (item.dinner.dinnerQuantity || 1)) *
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
          총 금액
        </Typography>
        <Typography type='h4'>{totalPrice.toLocaleString()} 원</Typography>
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

export default PriceBox;
