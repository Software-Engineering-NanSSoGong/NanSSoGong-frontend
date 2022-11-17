import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import { History, OrderStatus } from '../@types';
import { OrderService } from '../api';
import { userState } from '../stores';
import { Button, Typography } from './common';
import { ButtonHierarchy } from './common/Button';

interface Props {
  orderId: number;
  status: OrderStatus;
  setHistories: Dispatch<SetStateAction<History[]>>;
}

const changeStatusToButtonText = (status: OrderStatus) => {
  switch (status) {
    case 'ACCEPTED':
      return '요리 완료';
    case 'COOKED':
      return '배달 시작';
    case 'CANCEL':
    case 'DENIED':
      return '취소된 배달';
    case 'DELIVERING':
      return '배달 완료';
    case 'DELIVERED':
      return '완료된 배달';
    case 'ORDERED':
    case 'RESERVED':
      return '접수 하기';
    default:
      return '접수하기';
  }
};

const changeStatusToButtonHierarchy = (status: OrderStatus): ButtonHierarchy => {
  switch (status) {
    case 'ACCEPTED':
    case 'COOKED':
      return ButtonHierarchy.Success;
    case 'CANCEL':
    case 'DENIED':
    case 'DELIVERED':
      return ButtonHierarchy.DarkGray;
    case 'DELIVERING':
      return ButtonHierarchy.Warning;
    case 'ORDERED':
    case 'RESERVED':
      return ButtonHierarchy.Primary;
    default:
      return ButtonHierarchy.Primary;
  }
};

const getNextOrderStatus = (status: OrderStatus): OrderStatus => {
  switch (status) {
    case 'ACCEPTED':
      return 'COOKED';
    case 'COOKED':
      return 'DELIVERING';
    case 'DELIVERING':
      return 'DELIVERED';
    case 'ORDERED':
    case 'RESERVED':
      return 'ACCEPTED';
    default:
      return 'ORDERED';
  }
};

function ChangeOrderStatusButton({ status, orderId, setHistories }: Props) {
  const me = useRecoilValue(userState);
  const isRider = me.memberType === 'loginRider';
  const isChef = me.memberType === 'loginChef';

  const handleClickButton = async () => {
    const nextStatus = getNextOrderStatus(status);
    await OrderService.changeOrderStatus({ orderId, orderStatus: nextStatus });
    setHistories((prev) => {
      const nextHistories = [...prev];
      const willUpdateIndex = nextHistories.findIndex((history) => history.orderId === orderId);
      nextHistories[willUpdateIndex].orderStatus = nextStatus;
      return nextHistories;
    });
    alert('변경이 완료되었습니다.');
  };

  const handleClickDenyButton = async () => {
    const nextStatus = 'DENIED';
    await OrderService.changeOrderStatus({ orderId, orderStatus: nextStatus });
    setHistories((prev) => {
      const nextHistories = [...prev];
      const willUpdateIndex = nextHistories.findIndex((history) => history.orderId === orderId);
      nextHistories[willUpdateIndex].orderStatus = nextStatus;
      return nextHistories;
    });
    alert('해당 주문을 거절하였습니다.');
  };

  return status === 'ORDERED' || status === 'RESERVED' ? (
    <ButtonList>
      <Wrapper onClick={handleClickButton} disabled={isRider}>
        <Typography type='body3'>{changeStatusToButtonText(status)}</Typography>
      </Wrapper>
      <Wrapper
        hierarchy={ButtonHierarchy.Danger}
        onClick={handleClickDenyButton}
        disabled={isRider}
      >
        <Typography type='body3'>거절하기</Typography>
      </Wrapper>
    </ButtonList>
  ) : (
    <Wrapper
      onClick={handleClickButton}
      disabled={
        status === 'CANCEL' ||
        status === 'DENIED' ||
        status === 'DELIVERED' ||
        (isChef && status === 'COOKED') ||
        (isChef && status === 'DELIVERING')
      }
      hierarchy={changeStatusToButtonHierarchy(status)}
    >
      <Typography type='body3'>{changeStatusToButtonText(status)}</Typography>
    </Wrapper>
  );
}

const Wrapper = styled(Button)`
  padding: 24px 32px;
  box-sizing: border-box;
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default ChangeOrderStatusButton;
