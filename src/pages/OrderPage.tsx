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
import { myBagSelector } from '../stores';
import { getTotalPrice, storage } from '../utils';
import { foodState } from '../stores/Food';

function OrderPage() {
  const navigate = useNavigate();
  const foodList = useRecoilValue(foodState);
  const [myBagState, setMyBagState] = useRecoilState(myBagSelector);
  const totalPrice = getTotalPrice(myBagState, foodList);

  const handleClickModalConfirmButton = () => {
    // TODO: 백엔드로 정보 보내기
    storage.removeAll();
    setMyBagState([]);
    alert('성공적으로 구매했습니다.');
    navigate('/main');
  };

  const handleChangeMultipleInput = () => {};

  return (
    <Wrapper>
      <SideMenuList />
      {myBagState.length !== 0 ? (
        <>
          <Spacer>
            <TitleWithLine title='주문하기' titleFontType='h1' />
            {myBagState?.map((item, idx) => (
              <FoodBox
                key={idx}
                type='order'
                dinner={item.dinner}
                selectedStyle={item.selectedStyle}
                addedFoodInfos={item.addedFoodInfos}
                reducedFoodInfos={item.reducedFoodInfos}
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
                  <Input style={{ width: '20%' }} />
                </Inputs>
              </LabelWithInput>

              <LabelWithMultipleInput
                title='상세 주소'
                placeholders={['예시) 동대문구', '서울시립대로 163', '국제 학사']}
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
                placeholders={[' ', ' ', ' ', ' ']}
                labelColor={theme.palette.white}
                inputBackgroundColor={theme.palette.gray50}
                inputColor={theme.colors.text.dark}
                handleChangeInput={handleChangeMultipleInput}
              />
            </OrderInfomationBox>
            <OrderInfomationBox>
              <PriceBox totalPrice={totalPrice} />
            </OrderInfomationBox>
          </Spacer>
          <Modal
            triggerNode={
              <Modal.triggerButton
                modalType='open'
                onClick={handleClickModalConfirmButton}
                style={{
                  position: 'fixed',
                  marginLeft: '300px',
                  width: 'calc(100% - 300px)',
                }}
                buttonProps={{
                  hierarchy: ButtonHierarchy.Danger,
                  disabled: myBagState.length === 0,
                }}
                as={BottomButton}
              >
                <Typography type='h3' textAlign='center'>
                  주문하기
                </Typography>
              </Modal.triggerButton>
            }
            modalNode={
              <Modal.askModal>
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

export default OrderPage;
