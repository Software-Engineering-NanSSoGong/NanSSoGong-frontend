import styled from '@emotion/styled';
import { useState } from 'react';
import { AddedDinner } from '../@types';
import { ButtonHierarchy } from '../components/common/Button';
import { BottomButton, FoodBox, SideMenuList, TitleWithLine, Typography } from '../components';
import { FrenchDinner } from '../dummy/dinner';
import { theme } from '../styles';

function OrderPage() {
  const [addedDinner] = useState<AddedDinner>({
    ...FrenchDinner,
    selectedStyle: { name: 'simple', price: 0 },
  } as AddedDinner);

  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        <TitleWithLine title='주문하기' titleFontType='h1' />
        <FoodBox type='order' dinner={addedDinner} selectedStyle={addedDinner.selectedStyle} />
        <FoodBox type='order' dinner={addedDinner} selectedStyle={addedDinner.selectedStyle} />
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
          <LabelWithInput>
            <Typography type='h4' color={theme.colors.text.bold}>
              상세 주소
            </Typography>
            <Inputs>
              <Input />
              <Input />
              <Input />
            </Inputs>
          </LabelWithInput>
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
          <LabelWithInput>
            <Typography type='h4' color={theme.colors.text.bold}>
              카드 번호
            </Typography>
            <Inputs>
              <Input />
              <Input />
              <Input />
              <Input />
            </Inputs>
          </LabelWithInput>
        </OrderInfomationBox>
        <OrderInfomationBox>
          <Typography type='h3' color={theme.colors.text.bold}>
            결제 금액
          </Typography>
          {[
            { name: '프렌치 디너 세트', price: 50000 },
            { name: '잉글리시 디너 세트', price: 50000 },
            { name: '감자 제외', price: -500 },
            { name: '감자 제외2', price: -500 },
          ].map((item) => (
            <BetweenLine key={item.name}>
              <Typography type='h4' color={theme.colors.text.bold}>
                {item.name}
              </Typography>
              <Typography
                type='body4'
                color={item.price > 0 ? theme.colors.primary.yellow : theme.colors.primary.red}
              >
                {item.price > 0 ? '+' : ''}
                {item.price.toLocaleString()} 원
              </Typography>
            </BetweenLine>
          ))}
          <Divider />
          <BetweenLine>
            <Typography type='h4' color={theme.colors.text.bold}>
              총 금액
            </Typography>
            <Typography type='h4'>{Number(150000).toLocaleString()} 원</Typography>
          </BetweenLine>
        </OrderInfomationBox>
      </Spacer>
      <BottomButton
        buttonProps={{ hierarchy: ButtonHierarchy.Danger }}
        style={{
          marginLeft: '300px',
          width: 'calc(100% - 300px)',
        }}
      >
        <Typography type='h3' textAlign='center'>
          주문하기
        </Typography>
      </BottomButton>
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

const BetweenLine = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Divider = styled.div`
  width: calc(100% + 46px);
  margin-left: -24px;
  content: '';
  border: 1px solid ${theme.palette.gray50};
`;

export default OrderPage;
