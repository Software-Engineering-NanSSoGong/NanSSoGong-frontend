import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Dinner, Food, Style } from '../@types';
import {
  FoodQuantityBoxList,
  NumberInput,
  SideMenuList,
  StyleSelectBoxList,
  TitleWithLine,
  Typography,
} from '../components';
import BottomButton from '../components/BottomButton';
import { Foods, FrenchDinner } from '../dummy/dinner';
import { theme } from '../styles';

const initialDummyFoodState = (food: Food[]) => {
  return food.reduce((acc, item) => ({ ...acc, [item.name]: { ...item, quantity: 0 } }), {});
};

function ItemDetailPage() {
  const [dinner, setDinner] = useState<Dinner>({} as Dinner);
  const [foodState, setFoodState] = useState<Record<string, Food>>(initialDummyFoodState(Foods));
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  console.log(selectedStyle);
  const isShampain = true;

  const handleClickStyleBox = (style: Style) => {
    if (style === selectedStyle) {
      setSelectedStyle(null);
    } else {
      setSelectedStyle(style);
    }
  };

  useEffect(() => {
    // TODO: 백엔드로부터 디너 받기 with 리코일 상태관리
    setDinner({ ...FrenchDinner, quantity: 1 });
  }, []);

  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        <FoodSection>
          <FoodImage src={dinner.image} alt='dinner-set image' />
          <FoodDescription>
            <TitleWithLine
              title={dinner.name as string}
              titleFontType='h1'
              titleColor={theme.colors.text.bold}
              borderColor={theme.palette.gray50}
            />
            <Typography type='body5' color={theme.palette.gray50}>
              {dinner.description}
            </Typography>
            <TextLine>
              <Typography type='h4' color={theme.colors.text.bold}>
                스타일 선택
              </Typography>
              {isShampain && (
                <Typography type='body6' color={theme.colors.primary.red}>
                  ※ 샴페인 축제 디너는 심플 스타일 선택이 불가합니다
                </Typography>
              )}
            </TextLine>
            <StyleSelectBoxList
              styleList={dinner.styles}
              selectedStyle={selectedStyle}
              handleClickStyle={handleClickStyleBox}
            />
            <QuantitySelectBox>
              <Typography type='h4' color={theme.colors.text.bold}>
                수량 선택
              </Typography>
              <NumberInput
                value={dinner.quantity ?? 0}
                type={'large'}
                onChange={(e) =>
                  setDinner((prev) => ({ ...prev, quantity: Number(e.target.value) }))
                }
                onClickPlusIcon={() =>
                  setDinner((prev) => ({ ...prev, quantity: Number(prev.quantity) + 1 }))
                }
                onClickMinusIcon={() =>
                  setDinner((prev) => ({
                    ...prev,
                    quantity: Number(prev.quantity) - 1 < 0 ? 0 : Number(prev.quantity) - 1,
                  }))
                }
              />
            </QuantitySelectBox>
          </FoodDescription>
        </FoodSection>
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
      <BottomButton
        buttonProps={{ disabled: dinner.quantity === 0 || selectedStyle === null }}
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

const Wrapper = styled.main`
  width: 100%;
`;

const Spacer = styled.div`
  padding: 80px 80px 120px 380px;
`;

const FoodSection = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 60px;
`;

const FoodImage = styled.img`
  max-width: 40%;
  border-radius: 16px;
  object-fit: cover;
`;

const FoodDescription = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 1;
`;

const TextLine = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuantitySelectBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default ItemDetailPage;
