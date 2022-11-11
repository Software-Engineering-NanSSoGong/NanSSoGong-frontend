import styled from '@emotion/styled';
import { ButtonHierarchy } from '../components/common/Button';
import { OrderSheet, OrderStatus } from '../@types';
import { theme } from '../styles';
import { Typography } from './common';
import Chip, { ChipType } from './common/Chip';
import { Modal } from './modal';
import { formatDateToYYYYMMDD } from '../utils';
import { useSetRecoilState } from 'recoil';
import { changeFoodState } from '../stores';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Props {
  orderStatus: OrderStatus;
  orderId: number;
  address: string;
  date: string;
  orderSheetResponseList: OrderSheet[];
}

const convertToChipTypeFromOrderStatus: (orderStatus: OrderStatus) => ChipType = (
  orderStatus: OrderStatus,
) => {
  switch (orderStatus) {
    case 'ORDERED':
    case 'RESERVED':
      return 'warning';
    case 'COOKED':
    case 'ACCEPTED':
      return 'primary';
    case 'DELIVERING':
      return 'success';
    case 'DELIVERED':
    case 'DENIED':
    case 'CANCEL':
      return 'danger';
    default:
      return 'primary';
  }
};

function ClickableHistoryOrderCard({
  orderId,
  orderStatus,
  address,
  date,
  orderSheetResponseList,
}: Props) {
  const navigate = useNavigate();
  const setChangeFoodState = useSetRecoilState(changeFoodState);
  const [changeOrderInfo, setChangeOrderInfo] = useState<{
    dinnerId: number;
    orderSheetIndex: number;
  }>({ dinnerId: -1, orderSheetIndex: -1 });

  const handleClickModalConfirmButton = () => {
    if (changeOrderInfo.orderSheetIndex !== -1 && changeOrderInfo.dinnerId !== -1) {
      setChangeFoodState({
        orderId,
        styleId: orderSheetResponseList[changeOrderInfo.orderSheetIndex].styleId,
        willChangeOrderIndex: changeOrderInfo.orderSheetIndex,
        orderSheetUpdateRequestList: orderSheetResponseList.map((item) => ({
          dinnerId: item.dinnerId,
          styleId: item.styleId,
          orderSheetId: item.orderSheetId,
          foodIdAndDifference: item.foodDifferenceInfoResponseList.reduce(
            (acc, food) => ({ ...acc, [food.foodId]: food.foodQuantity }),
            {},
          ),
        })),
      });
      navigate(`/modify/${changeOrderInfo.dinnerId}`);
    }
  };

  return (
    <Modal
      triggerNode={
        <Modal.triggerButton
          modalType='open'
          buttonProps={{
            hierarchy: ButtonHierarchy.DarkGray,
          }}
          disabled={orderStatus !== 'ORDERED'}
        >
          <CardList>
            {orderSheetResponseList.map((history, index) => {
              const plusFoods = history.foodDifferenceInfoResponseList.filter(
                (food) => food.foodQuantity > 0,
              );
              const minusFoods = history.foodDifferenceInfoResponseList.filter(
                (food) => food.foodQuantity < 0,
              );
              return (
                <Wrapper
                  key={history.orderSheetId}
                  onClick={() =>
                    setChangeOrderInfo({ dinnerId: history.dinnerId, orderSheetIndex: index })
                  }
                >
                  <BetweenAlignLine>
                    <Typography type='h3' color={theme.colors.text.bold}>
                      {history.dinnerName}
                    </Typography>
                    <Chip
                      label={orderStatus}
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
                          (food, idx) =>
                            `${food.foodName} 추가${idx !== plusFoods.length - 1 ? ', ' : ''}`,
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
                  <BetweenAlignLine>
                    <Typography type='body4'>{address}</Typography>
                    <Typography type='body5'>{formatDateToYYYYMMDD(new Date(date))}</Typography>
                  </BetweenAlignLine>
                </Wrapper>
              );
            })}
          </CardList>
        </Modal.triggerButton>
      }
      modalNode={
        <Modal.askModal onClickConfirm={handleClickModalConfirmButton}>
          <ModalBody>
            <Typography type='h4' color={theme.colors.text.dark} textAlign='center'>
              해당 주문을 수정하시겠습니까?
            </Typography>
          </ModalBody>
        </Modal.askModal>
      }
    />
  );
}

const Wrapper = styled.article`
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

const ModalBody = styled.div`
  width: 500px;
  height: 100px;
  padding: 16px;
  box-sizing: border-box;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default ClickableHistoryOrderCard;
