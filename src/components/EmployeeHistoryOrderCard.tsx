import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { History, OrderSheet, OrderStatus } from '../@types';
import { OrderService } from '../api';
import { theme } from '../styles';
import { convertToChipTypeFromOrderStatus, formatDateToYYYYMMDD } from '../utils';
import ChangeOrderStatusButton from './ChangeOrderStatusButton';
import { Chip, Typography } from './common';

export interface DemandOrderInfo {
  ingredientId: string;
  ingredientName: string;
  demandQuantity: number;
  stockQuantity: number;
}

interface Props {
  status: OrderStatus;
  orderSheetResponseList: OrderSheet[];
  orderTime: string;
  orderId: number;
  address: string;
  reservedTime?: Date;
  riderName?: string;
  setHistories: Dispatch<SetStateAction<History[]>>;
}

function EmployeeHistoryOrderCard({
  status,
  orderSheetResponseList,
  orderTime,
  address,
  orderId,
  reservedTime,
  riderName,
  setHistories,
}: Props) {
  const [demandOrderInfo, setDemandOrderInfo] = useState<DemandOrderInfo[]>([]);
  const [isCanMakeOrder, setIsCanMakeOrder] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const res = await OrderService.checkMakeOrder({ orderId });
      setIsCanMakeOrder(res.makeable);
      setDemandOrderInfo(res.ingredientDemandAndStockInfoList);
    })();
  }, [orderId]);

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
              {index === 0 && reservedTime && (
                <Typography type='body4'>예약 시간: {reservedTime.toString()}</Typography>
              )}
              {index === 0 && (
                <Chip
                  label={status}
                  type={convertToChipTypeFromOrderStatus(status)}
                  variants='filled'
                />
              )}
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
                        `${food.foodName} ${Math.abs(food.foodQuantity)}개${
                          idx !== minusFoods.length - 1 ? ',' : ''
                        }`,
                    )}
                  </Typography>
                </OrderChangeLine>
                <OrderChangeLine>
                  <Typography type='h5' color={theme.colors.text.bold}>
                    라이더 :
                  </Typography>
                  <Typography type='body4'>{riderName}</Typography>
                </OrderChangeLine>
              </OrderChangeList>
              {index === 0 && (
                <ChangeOrderStatusButton
                  status={status}
                  orderId={orderId}
                  isCanMakeOrder={isCanMakeOrder}
                  setHistories={setHistories}
                />
              )}
            </ButtonWithOrderChangeList>
            {index === 0 && (
              <BetweenAlignLine>
                <Typography type='body4'>{address}</Typography>
                <Typography type='body5'>{formatDateToYYYYMMDD(new Date(orderTime))}</Typography>
              </BetweenAlignLine>
            )}
            {index === 0 && (status === 'ORDERED' || status === 'RESERVED') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: 32 }}>
                {demandOrderInfo.map((v) => (
                  <span key={v.ingredientId} style={{ display: 'flex', gap: 12 }}>
                    <Typography type='body4' color={theme.colors.primary.yellow}>
                      필요 재료: {v.ingredientName}
                    </Typography>
                    <Typography type='body4' color={theme.colors.primary.green}>
                      필요 수량: {v.demandQuantity}
                    </Typography>
                    <Typography
                      type='body4'
                      color={
                        v.demandQuantity > v.stockQuantity
                          ? theme.colors.primary.red
                          : theme.colors.primary.blue
                      }
                    >
                      현재 수량: {v.stockQuantity}
                    </Typography>
                  </span>
                ))}
              </div>
            )}
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
