import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Dinner, Style } from '../@types';
import { theme } from '../styles';
import { NumberInput, SwitchCase, Typography } from './common';
import StyleSelectBoxList from './StyleSelectBoxList';
import TitleWithLine from './TitleWithLine';

interface Props {
  type: 'beforeOrder' | 'order';
  dinner: Dinner;
  setDinner: Dispatch<SetStateAction<Dinner>>;
  selectedStyle: Style | null;
  setSelectedStyle: Dispatch<SetStateAction<Style | null>>;
}

const dummyFoodInfo = [
  { name: '감자', quantity: 1 },
  { name: '감자2', quantity: 1 },
  { name: '감자3', quantity: 1 },
];

function FoodBox({ type, dinner, selectedStyle, setDinner, setSelectedStyle }: Props) {
  const isShampain = true;

  const handleClickStyleBox = (style: Style) => {
    if (style === selectedStyle) {
      setSelectedStyle(null);
    } else {
      setSelectedStyle(style);
    }
  };

  return (
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
        <SwitchCase
          value={type}
          caseBy={{
            beforeOrder: (
              <>
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
              </>
            ),
            order: (
              <>
                <TitleWithLine title='선택된 스타일' titleFontType='h4' />
                <StyleSelectBoxList
                  styleList={dinner.styles}
                  selectedStyle={selectedStyle}
                  handleClickStyle={handleClickStyleBox}
                  disabled
                />
              </>
            ),
          }}
        />
        <SwitchCase
          value={type}
          caseBy={{
            beforeOrder: (
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
            ),
            // 1시 30분 어때 딱 1시간
            order: (
              <ExtraInfomationSection>
                <TitleWithLine title='메뉴 추가 및 삭제 정보' titleFontType='h4' />
                {dummyFoodInfo.map((item) => (
                  <InfomationLine key={item.name}>
                    <Typography type='body4'>• {item.name}</Typography>
                    <Typography type='body4' color={theme.colors.primary.blue}>
                      {item.quantity}개 추가
                    </Typography>
                  </InfomationLine>
                ))}
                {dummyFoodInfo.map((item) => (
                  <InfomationLine key={item.name}>
                    <Typography type='body4'>• {item.name}</Typography>
                    <Typography type='body4' color={theme.colors.primary.red}>
                      {item.quantity}개 삭제
                    </Typography>
                  </InfomationLine>
                ))}
              </ExtraInfomationSection>
            ),
          }}
        />
      </FoodDescription>
    </FoodSection>
  );
}

const FoodSection = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 60px;
`;

const FoodImage = styled.img`
  max-width: 40%;
  border-radius: 16px;
  object-fit: full;
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

const ExtraInfomationSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfomationLine = styled.span`
  display: flex;
  justify-content: space-between;
`;

export default FoodBox;
