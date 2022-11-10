import styled from '@emotion/styled';
import { ButtonHierarchy } from '../components/common/Button';
import { Food, OrderStatus } from '../@types';
import { theme } from '../styles';
import { Typography } from './common';
import Chip, { ChipType } from './common/Chip';
import { Modal } from './modal';

interface Props {
  userType: 'client' | 'staff';
  orderStatus: OrderStatus;
  dinnerName: string;
  address: string;
  differenceFoodList: (Pick<Food, 'foodId' | 'foodName'> & {
    foodQuantity: number;
    orderSheetItemId: number;
  })[];
  date: Date;
}

const convertToChipTypeFromOrderStatus: (orderStatus: OrderStatus) => ChipType = (
  orderStatus: OrderStatus,
) => {
  switch (orderStatus) {
    case 'ORDERED':
      return 'warning';
    // case '주문 수정':
    //   return 'primary';
    // case '배달 중':
    //   return 'success';
    // case '배달 완료':
    //   return 'danger';
    default:
      return 'primary';
  }
};

function ClickableHistoryOrderCard({ userType, orderStatus, dinnerName, address, date }: Props) {
  // TODO: plus, minus되는 food 계산하기
  const plusFoods = [] as unknown[];
  const minusFoods = [] as unknown[];
  const status = userType === 'staff' && orderStatus === 'ORDERED' ? '새 주문' : orderStatus;

  return (
    <Modal
      triggerNode={
        <Modal.triggerButton
          modalType='open'
          buttonProps={{
            hierarchy: ButtonHierarchy.DarkGray,
          }}
          disabled={(userType === 'client' && orderStatus !== 'ORDERED') || userType === 'staff'}
        >
          <Wrapper>
            <BetweenAlignLine>
              <Typography type='h3' color={theme.colors.text.bold}>
                {dinnerName}
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
              <Typography type='body5'>{date.toDateString()}</Typography>
            </BetweenAlignLine>
          </Wrapper>
        </Modal.triggerButton>
      }
      modalNode={
        <Modal.askModal>
          <ModalBody>
            <Typography type='h4' color={theme.colors.text.dark} textAlign='center'>
              해당 주문을 삭제하시겠습니까?
            </Typography>
          </ModalBody>
        </Modal.askModal>
      }
    />
  );
}

const Wrapper = styled.div`
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

export default ClickableHistoryOrderCard;
