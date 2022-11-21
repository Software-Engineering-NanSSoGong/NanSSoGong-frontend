import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { ButtonHierarchy } from '../components/common/Button';
import {
  BottomButton,
  FoodBox,
  LabelWithMultipleInput,
  Modal,
  PriceBox,
  SideMenuList,
  TitleWithLine,
  Typography,
} from '../components';
import { theme } from '../styles';
import { myBagSelector, userState } from '../stores';
import { getPriceAfterSale, getTotalPrice, storage, transformNameWithQuantity } from '../utils';
import { foodState } from '../stores/Food';
import { useEffect, useState } from 'react';
import { Address, Card, GRADE, GRADE_INFO } from '../@types';
import { ClientService, OrderService } from '../api';
import ReservationTimeCard from '../components/ReservationTimeCard';

function OrderPage() {
  const navigate = useNavigate();
  const foodList = useRecoilValue(foodState);
  const [myBagState, setMyBagState] = useRecoilState(myBagSelector);
  const [me, setMe] = useRecoilState(userState);
  const totalPrice = getTotalPrice(myBagState, foodList);
  const [grade, setGrade] = useState<GRADE>('BRONZE');
  const [ordererName, setOrdererName] = useState<string>('');
  const [checkReservation, setCheckReservation] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>({ city: '', street: '', zipcode: '' });
  const [cardNumber, setCardNumber] = useState<Card>({
    card1: null,
    card2: null,
    card3: null,
    card4: null,
  });
  const [reservationTime, handleReservatedTime] = useState<Date>(new Date());
  const [hourAndMinute, setHourAndMinute] = useState<{ hour: number; minute: number }>({
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
  });

  const handleClickDeleteIcon = (idx: number) => {
    const nextMyBagList = myBagState.filter((_, i) => idx !== i);
    storage.set('mybag', nextMyBagList);
    setMyBagState(nextMyBagList);
    alert('해당 디너가 삭제되었습니다.');
  };

  const handleClickModalConfirmButton = async () => {
    let res = { uuid: '' };
    const reservedTime = new Date(
      reservationTime.getFullYear(),
      reservationTime.getMonth(),
      reservationTime.getDate(),
      hourAndMinute.hour,
      hourAndMinute.minute,
    );
    if (me.memberType === 'loginClient') {
      res = await OrderService.orderClient({
        address,
        totalPriceAfterSale: getPriceAfterSale(totalPrice, GRADE_INFO[grade].saleRate),
        orderSheetCreateRequestList: myBagState.map((myBag) => ({
          styleId: myBag.selectedStyle.styleId,
          dinnerId: myBag.dinner.dinnerId,
          foodIdAndDifference: {
            ...transformNameWithQuantity(myBag.addedFoodInfos),
            ...transformNameWithQuantity(myBag.reducedFoodInfos, 'minus'),
          },
        })),
        orderStatus: checkReservation ? 'RESERVED' : 'ORDERED',
        reservedTime,
      });
    } else if (me.memberType === 'guest') {
      res = await OrderService.orderGuest({
        address,
        totalPriceAfterSale: getPriceAfterSale(totalPrice, GRADE_INFO[grade].saleRate),
        orderSheetCreateRequestList: myBagState.map((myBag) => ({
          styleId: myBag.selectedStyle.styleId,
          dinnerId: myBag.dinner.dinnerId,
          foodIdAndDifference: {
            ...transformNameWithQuantity(myBag.addedFoodInfos),
            ...transformNameWithQuantity(myBag.reducedFoodInfos, 'minus'),
          },
        })),
        name: ordererName,
        cardNumber: `${cardNumber.card1}${cardNumber.card2}${cardNumber.card3}${cardNumber.card4}`,
        orderStatus: checkReservation ? 'RESERVED' : 'ORDERED',
        reservedTime,
      });
    }
    if (res?.hasOwnProperty('orderId')) {
      storage.removeAll();
      setMyBagState([]);
      navigate('/main');
      alert('성공적으로 구매했습니다.');
      setMe((prev) => ({ ...prev, uuid: String(res.uuid) }));
    } else {
      alert('주문을 할 수 없습니다.');
    }
  };

  const handleChangeMultipleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { maxLength, name, value } = e.currentTarget;
    if (name.includes('card')) {
      setCardNumber((prev) => ({ ...prev, [name]: value.slice(0, maxLength) }));
    } else if (name.includes('city') || name.includes('street') || name.includes('zipcode')) {
      setAddress((prev) => ({ ...prev, [name]: value }));
    } else {
      setHourAndMinute((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await ClientService.getClientInfo({ id: me.memberId as number });
        if (!res.hasOwnProperty('exceptionType')) {
          setCardNumber({
            card1: Number(res.cardNumber.slice(0, 4)),
            card2: Number(res.cardNumber.slice(4, 8)),
            card3: Number(res.cardNumber.slice(8, 12)),
            card4: Number(res.cardNumber.slice(12)),
          });
          setAddress(res.address);
          setOrdererName(res.name);
          setGrade(res.clientGrade);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [me.memberId]);

  return (
    <Wrapper>
      <SideMenuList />
      {myBagState.length !== 0 ? (
        <>
          <Spacer>
            <TitleWithLine title='주문하기' titleFontType='h1' />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography type='h3'>예약하실건가요?</Typography>
              <input type='checkbox' id='toggle' hidden />
              <ToggleSwitch
                htmlFor='toggle'
                className={checkReservation ? 'toggle' : ''}
                onClick={() => setCheckReservation((prev) => !prev)}
              >
                <ToggleButton />
              </ToggleSwitch>
            </div>
            {checkReservation && (
              <ReservationTimeCard
                reservationTime={reservationTime}
                onChangeTime={handleReservatedTime}
                hourAndMinute={hourAndMinute}
                handleChangeHourTime={handleChangeMultipleInput}
              />
            )}
            {myBagState?.map((item, idx) => (
              <FoodBox
                key={idx}
                type='order'
                dinner={item.dinner}
                selectedStyle={item.selectedStyle}
                addedFoodInfos={item.addedFoodInfos}
                reducedFoodInfos={item.reducedFoodInfos}
                handleClickDeleteIcon={() => handleClickDeleteIcon(idx)}
              />
            ))}
            <OrderInfomationBox>
              <Typography type='h3' color={theme.colors.text.bold}>
                배달 정보
              </Typography>
              <LabelWithInput>
                <Typography type='h4' color={theme.colors.text.bold}>
                  주문자 이름
                </Typography>
                <Inputs>
                  <Input
                    style={{ width: '20%' }}
                    value={ordererName}
                    onChange={(e) => setOrdererName(e.target.value)}
                  />
                </Inputs>
              </LabelWithInput>

              <LabelWithMultipleInput
                title='상세 주소'
                type='text'
                values={[address.city, address.street, address.zipcode]}
                placeholders={['city', 'street', 'zipcode']}
                labelColor={theme.palette.white}
                inputBackgroundColor={theme.palette.gray50}
                inputColor={theme.colors.text.dark}
                handleChangeInput={handleChangeMultipleInput}
              />
            </OrderInfomationBox>
            <OrderInfomationBox>
              <Typography type='h3' color={theme.colors.text.bold}>
                결제 수단
              </Typography>
              <LabelWithInput>
                <Typography type='h4' color={theme.colors.text.bold}>
                  카드 회사
                </Typography>
                <Inputs>
                  <Input style={{ width: '20%' }} />
                </Inputs>
              </LabelWithInput>

              <LabelWithMultipleInput
                title='카드 번호'
                type='number'
                pattern='\d*'
                values={[cardNumber.card1, cardNumber.card2, cardNumber.card3, cardNumber.card4]}
                placeholders={['card1', 'card2', 'card3', 'card4']}
                labelColor={theme.palette.white}
                inputBackgroundColor={theme.palette.gray50}
                inputColor={theme.colors.text.dark}
                maxLength={4}
                handleChangeInput={handleChangeMultipleInput}
              />
            </OrderInfomationBox>
            <OrderInfomationBox>
              <PriceBox totalPrice={totalPrice} clientGrade={grade} />
            </OrderInfomationBox>
          </Spacer>
          <Modal
            triggerNode={
              <Modal.triggerButton
                modalType='open'
                style={{
                  position: 'fixed',
                  marginLeft: '300px',
                  width: 'calc(100% - 300px)',
                }}
                buttonProps={{
                  hierarchy: ButtonHierarchy.Danger,
                  disabled:
                    myBagState.length === 0 ||
                    address.city === '' ||
                    address.street === '' ||
                    address.zipcode === '' ||
                    cardNumber.card1?.toString().length !== 4 ||
                    cardNumber.card2?.toString().length !== 4 ||
                    cardNumber.card3?.toString().length !== 4 ||
                    cardNumber.card4?.toString().length !== 4,
                }}
                as={BottomButton}
              >
                <Typography type='h3' textAlign='center'>
                  주문하기
                </Typography>
              </Modal.triggerButton>
            }
            modalNode={
              <Modal.askModal onClickConfirm={handleClickModalConfirmButton}>
                <ModalBody>
                  <Typography type='h3' color={theme.colors.text.dark} textAlign='center'>
                    구매 확정
                  </Typography>
                  <Typography type='body4' color={theme.colors.text.dark} style={{ marginTop: 32 }}>
                    총 {totalPrice.toLocaleString()} 원입니다.정말로 구매하시겠습니까?
                  </Typography>
                </ModalBody>
              </Modal.askModal>
            }
          />
        </>
      ) : (
        <Spacer>
          <Typography type='h3' color={theme.colors.primary.red} textAlign='center'>
            장바구니에 디너를 담아 주세요.
          </Typography>
        </Spacer>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main``;

const Spacer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding: 120px 104px 120px 424px;
`;

const OrderInfomationBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  border-radius: 8px;
  background-color: ${theme.palette.gray300};
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: 10px;
  height: 50px;
  background-color: ${theme.palette.gray50};
  padding-left: 16px;
  color: ${theme.colors.text.dark};
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const LabelWithInput = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Inputs = styled.section`
  display: flex;
  gap: 40px;
`;

const ModalBody = styled.div`
  width: 500px;
  height: 200px;
  padding: 16px;
  box-sizing: border-box;
`;

const ToggleSwitch = styled.label`
  width: 6rem;
  height: 3rem;
  display: block;
  position: relative;
  border-radius: 2rem;
  background-color: #fff;
  box-shadow: 0 0 1rem 3px rgba(0 0 0 / 15%);
  cursor: pointer;

  &.toggle {
    background: #f03d3d;
  }

  &.toggle span {
    left: calc(100% - 2.8rem);
    background: #fff;
  }
`;

const ToggleButton = styled.span`
  width: 2.6rem;
  height: 2.6rem;
  position: absolute;
  top: 50%;
  left: 0.2rem;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #f03d3d;
  transition: all 0.2s ease-in;
`;

export default OrderPage;
