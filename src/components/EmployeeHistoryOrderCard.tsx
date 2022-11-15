import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { History, OrderSheet, OrderStatus } from '../@types';
import { theme } from '../styles';
import { convertToChipTypeFromOrderStatus, formatDateToYYYYMMDD } from '../utils';
import ChangeOrderStatusButton from './ChangeOrderStatusButton';
import { Chip, Typography } from './common';

interface Props {
  status: OrderStatus;
  orderSheetResponseList: OrderSheet[];
  orderTime: string;
  orderId: number;
  address: string;
  setHistories: Dispatch<SetStateAction<History[]>>;
}

function EmployeeHistoryOrderCard({
  status,
  orderSheetResponseList,
  orderTime,
  address,
  orderId,
  setHistories,
}: Props) {
  return (
    <Wrapper>
      {orderSheetResponseList.map((history, index) => {
        const plusFoods = history.foodDifferenceInfoResponseList.filter(
          (food) => food.foodQuantity > 0,
        );
        const minusFoods = history.foodDifferenceInfoResponseList.filter(
          (food) => food.foodQuantity < 0,
        );
        return (
          <CardList key={history.orderSheetId}>
            <BetweenAlignLine>
              <Typography type='h3' color={theme.colors.text.bold}>
                {history.dinnerName}
              </Typography>
              <Chip
                label={status}
                type={convertToChipTypeFromOrderStatus(status)}
                variants='filled'
              />
            </BetweenAlignLine>
            <ButtonWithOrderChangeList>
              <OrderChangeList>
                <OrderChangeLine>
                  <Typography type='h5' color={theme.colors.text.bold}>
                    추가 :
                  </Typography>
                  <Typography type='body4'>
                    {plusFoods.map(
                      (food, idx) =>
                        `${food.foodName} ${food.foodQuantity}개 ${
                          idx !== plusFoods.length - 1 ? ', ' : ''
                        }`,
                    )}
                  </Typography>
                </OrderChangeLine>
                <OrderChangeLine>
                  <Typography type='h5' color={theme.colors.text.bold}>
                    삭제 :
                  </Typography>
                  <Typography type='body4'>
                    {minusFoods.map(
                      (food, idx) =>
                        `${food.foodName} 제외${idx !== minusFoods.length - 1 ? ',' : ''}`,
                    )}
                  </Typography>
                </OrderChangeLine>
              </OrderChangeList>
              {index === 0 && (
                <ChangeOrderStatusButton
                  status={status}
                  orderId={orderId}
                  setHistories={setHistories}
                />
              )}
            </ButtonWithOrderChangeList>
            <BetweenAlignLine>
              <Typography type='body4'>{address}</Typography>
              <Typography type='body5'>{formatDateToYYYYMMDD(new Date(orderTime))}</Typography>
            </BetweenAlignLine>
            {index !== orderSheetResponseList.length - 1 && <Divider />}
          </CardList>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: ${theme.palette.gray300};
  box-sizing: border-box;
  padding: 24px;
  border-radius: 4px;

  & > div:not(:nth-of-type(1)) {
    padding-top: 32px;
  }
`;

const BetweenAlignLine = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWithOrderChangeList = styled.span`
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

const Divider = styled.div`
  width: calc(100% + 46px);
  margin-left: -24px;
  margin-top: 32px;
  content: '';
  border: 1px solid ${theme.palette.gray50};
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;

  & > article:not(:last-of-type) {
    padding-bottom: 0;
  }

  & > article:first-of-type {
    border-radius: 4px 4px 0 0;
  }

  & > article:last-of-type {
    border-radius: 0 0 4px 4px;
  }

  & > article:first-of-type:last-of-type {
    border-radius: 4px;
  }
`;

export default EmployeeHistoryOrderCard;
