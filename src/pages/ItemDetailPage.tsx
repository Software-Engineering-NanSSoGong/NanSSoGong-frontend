import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dinner, Food, Style } from '../@types';
import { FoodBox, FoodQuantityBoxList, Modal, SideMenuList, Typography } from '../components';
import BottomButton from '../components/BottomButton';
import { Foods, FrenchDinner } from '../dummy/dinner';
import { theme } from '../styles';

const initialDummyFoodState = (food: Food[]) => {
  return food.reduce((acc, item) => ({ ...acc, [item.name]: { ...item, quantity: 0 } }), {});
};

function ItemDetailPage() {
  const navigate = useNavigate();
  const [dinner, setDinner] = useState<Dinner>({} as Dinner);
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [foodState, setFoodState] = useState<Record<string, Food>>(initialDummyFoodState(Foods));

  useEffect(() => {
    // TODO: 백엔드로부터 디너 받기 with 리코일 상태관리
    setDinner({ ...FrenchDinner, quantity: 1 });
  }, []);

  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        <FoodBox
          type='beforeOrder'
          dinner={dinner}
          setDinner={setDinner}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />
        <FoodQuantityBoxList
          title='밥 추가'
          foods={Object.values(foodState).filter((item) => item.type === 'rice')}
          setFoodState={setFoodState}
        />
        <FoodQuantityBoxList
          title='고기 추가'
          foods={Object.values(foodState).filter((item) => item.type === 'meat')}
          setFoodState={setFoodState}
        />
        <FoodQuantityBoxList
          title='음료 추가'
          foods={Object.values(foodState).filter((item) => item.type === 'drink')}
          setFoodState={setFoodState}
        />
      </Spacer>
      <Modal
        triggerNode={
          <Modal.triggerButton
            modalType='open'
            as={BottomButton}
            buttonProps={{ disabled: dinner.quantity === 0 || selectedStyle === null }}
            style={{
              position: 'fixed',
              marginLeft: '300px',
              width: 'calc(100% - 300px)',
            }}
          >
            <Typography type='h3' textAlign='center'>
              주문하기
            </Typography>
          </Modal.triggerButton>
        }
        modalNode={
          <Modal.askModal onClickConfirm={() => navigate('/order')}>
            <ModalSpacer>
              <Typography type='h3' textAlign='center' color={theme.colors.text.dark}>
                주문 정보
              </Typography>
              <Line>
                <Typography type='h6' color={theme.colors.text.dark}>
                  프렌치 디너 세트
                </Typography>
                <Typography type='body5' color={theme.colors.text.dark}>
                  1개
                </Typography>
              </Line>
              <Line>
                <Typography type='h6' color={theme.colors.text.dark}>
                  감자 추가
                </Typography>
                <Typography type='body5' color={theme.colors.primary.green}>
                  1개
                </Typography>
              </Line>
              <Line>
                <Typography type='h6' color={theme.colors.text.dark}>
                  감자 제외
                </Typography>
                <Typography type='body5' color={theme.colors.primary.red}>
                  1개
                </Typography>
              </Line>
              <Line>
                <Typography type='h6' color={theme.colors.text.dark}>
                  감자 제외
                </Typography>
                <Typography type='body5' color={theme.colors.primary.red}>
                  1개
                </Typography>
              </Line>
              <Line>
                <Typography type='h6' color={theme.colors.text.dark} textAlign='end'>
                  총 금액
                </Typography>
                <Typography type='body5' color={theme.colors.text.dark} textAlign='end'>
                  150,000원
                </Typography>
              </Line>
            </ModalSpacer>
            <Typography
              type='body4'
              color={theme.colors.text.dark}
              style={{
                borderTop: `1px solid ${theme.palette.gray300}`,
                paddingTop: 16,
                paddingLeft: 16,
              }}
            >
              다음 프렌치 디너 세트를 정말로 주문하시겠습니까?
            </Typography>
          </Modal.askModal>
        }
      ></Modal>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
`;

const Spacer = styled.div`
  padding: 80px 80px 120px 380px;
`;

const ModalSpacer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Line = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default ItemDetailPage;
