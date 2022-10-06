import styled from '@emotion/styled';
import { useState } from 'react';
import {
  FoodQuantityBox,
  NumberInput,
  SideMenuList,
  StyleSelectBoxList,
  TitleWithLine,
  Typography,
} from '../components';
import { theme } from '../styles';

function ItemDetailPage() {
  const [value, setValue] = useState<number>(0);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const isShampain = true;

  const handleClickStyleBox = (style: string) => {
    if (style === selectedStyle) {
      setSelectedStyle(null);
    } else {
      setSelectedStyle(style);
    }
  };

  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        <FoodSection>
          <FoodImage src={'/Dinner.png'} alt='dinner-set image' />
          <FoodDescription>
            <TitleWithLine
              title='프렌치 디너'
              titleFontType='h1'
              titleColor={theme.colors.text.bold}
              borderColor={theme.palette.gray50}
            />
            <Typography type='body5' color={theme.palette.gray50}>
              {
                '프렌치 디너는 커피 한잔, 와인 한잔, 샐러드, 스테이크가 제공되며 미스터 대박 디너 서비스의 인기 세트 중 하나로 프랑스식의 근사한 저녁 식사를 드실 수 있습니다'
              }
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
              styleList={['심플', '그랜드', '디럭스']}
              selectedStyle={selectedStyle}
              handleClickStyle={handleClickStyleBox}
            />
            <QuantitySelectBox>
              <Typography type='h4' color={theme.colors.text.bold}>
                수량 선택
              </Typography>
              <NumberInput
                value={value}
                type={'large'}
                onChange={(e) => setValue(Number(e.target.value))}
                onClickPlusIcon={() => setValue((prev) => prev + 1)}
                onClickMinusIcon={() => setValue((prev) => (prev - 1 < 0 ? 0 : prev - 1))}
              />
            </QuantitySelectBox>
          </FoodDescription>
        </FoodSection>
        <TitleWithLine
          title='음식 추가'
          titleFontType='h3'
          style={{ marginBottom: 24, marginTop: 104 }}
        />
        <List>
          <FoodQuantityBox quantity={value} setQuantity={setValue} name={'감자'} />
          <FoodQuantityBox quantity={value} setQuantity={setValue} name={'감자'} />
          <FoodQuantityBox quantity={value} setQuantity={setValue} name={'감자'} />
          <FoodQuantityBox quantity={value} setQuantity={setValue} name={'감자'} />
          <FoodQuantityBox quantity={value} setQuantity={setValue} name={'감자'} />
        </List>
        <TitleWithLine
          title='음료 추가'
          titleFontType='h3'
          style={{ marginBottom: 24, marginTop: 60 }}
        />
        <List>
          <FoodQuantityBox quantity={value} setQuantity={setValue} name={'감자'} />
          <FoodQuantityBox quantity={value} setQuantity={setValue} name={'감자'} />
          <FoodQuantityBox quantity={value} setQuantity={setValue} name={'감자'} />
          <FoodQuantityBox quantity={value} setQuantity={setValue} name={'감자'} />
          <FoodQuantityBox quantity={value} setQuantity={setValue} name={'감자'} />
        </List>
        <TitleWithLine
          title='재료 제외'
          titleFontType='h3'
          style={{ marginBottom: 24, marginTop: 60 }}
        />
        <List>
          <Food className='active'>치즈 제외</Food>
          <Food>치즈 제외</Food>
          <Food>치즈 제외</Food>
          <Food>치즈 제외</Food>
          <Food>치즈 제외</Food>
          <Food>치즈 제외</Food>
          <Food>치즈 제외</Food>
        </List>
      </Spacer>
    </Wrapper>
  );
}

const Wrapper = styled.main``;

const Spacer = styled.div`
  margin: 80px 80px 0 380px;
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

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Food = styled.div`
  box-sizing: border-box;
  padding: 32px;
  background-color: ${theme.palette.gray300};
  border-radius: 16px;
  transition: all 0.1s ease-in;
  cursor: pointer;
  color: ${theme.palette.gray100};
  margin-bottom: 80px;

  &.active {
    background-color: ${theme.palette.red600};
    color: ${theme.colors.text.bold};
  }

  &:not(.active):hover {
    background-color: ${theme.palette.gray400};
    color: ${theme.palette.gray200};
  }

  &.active:hover {
    background-color: ${theme.colors.primary.red};
  }
`;

export default ItemDetailPage;
