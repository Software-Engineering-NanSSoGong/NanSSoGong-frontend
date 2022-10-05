import styled from '@emotion/styled';
import { theme } from '../styles';
import { Typography } from './common';
import Chip, { ChipType } from './common/Chip';

type OrderStatus = '주문 완료' | '주문 수정' | '배달 중' | '배달 완료';

interface Props {
  userType: 'client' | 'staff';
  orderStatus: OrderStatus;
  dinnerSets: string[];
  address: string;
  plusFoods: string[];
  minusFoods: string[];
  date: string;
}

const convertToChipTypeFromOrderStatus: (orderStatus: OrderStatus) => ChipType = (
  orderStatus: OrderStatus,
) => {
  switch (orderStatus) {
    case '주문 완료':
      return 'warning';
    case '주문 수정':
      return 'primary';
    case '배달 중':
      return 'success';
    case '배달 완료':
      return 'danger';
    default:
      return 'primary';
  }
};

function HistoryOrderCard({
  userType,
  orderStatus,
  dinnerSets,
  address,
  date,
  plusFoods,
  minusFoods,
}: Props) {
  const status = userType === 'staff' && orderStatus === '주문 완료' ? '새 주문' : orderStatus;

  return (
    <Wrapper>
      <BetweenAlignLine>
        <Typography type='h3' color={theme.palette.white}>
          {dinnerSets.map((dinner) => dinner)}
        </Typography>
        <Chip
          label={status}
          type={convertToChipTypeFromOrderStatus(orderStatus)}
          variants='filled'
        />
      </BetweenAlignLine>
      <OrderChangeList>
        <OrderChangeLine>
          <Typography type='h5' color={theme.colors.text.bold}>
            추가 :
          </Typography>
          <Typography type='body4'>
            {plusFoods.map(
              (food, idx) => `${food} 추가${idx !== plusFoods.length - 1 ? ', ' : ''}`,
            )}
          </Typography>
        </OrderChangeLine>
        <OrderChangeLine>
          <Typography type='h5' color={theme.colors.text.bold}>
            삭제 :
          </Typography>
          <Typography type='body4'>
            {minusFoods.map(
              (food, idx) => `${food} 제외${idx !== minusFoods.length - 1 ? ',' : ''}`,
            )}
          </Typography>
        </OrderChangeLine>
      </OrderChangeList>
      <BetweenAlignLine>
        <Typography type='body4'>{address}</Typography>
        <Typography type='body5'>{date}</Typography>
      </BetweenAlignLine>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  background-color: ${theme.palette.gray300};
  box-sizing: border-box;
  padding: 28px;
  border-radius: 4px;
`;

const BetweenAlignLine = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderChangeList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-block: 24px;
`;

const OrderChangeLine = styled.span`
  display: flex;
  gap: 40px;
`;

export default HistoryOrderCard;
