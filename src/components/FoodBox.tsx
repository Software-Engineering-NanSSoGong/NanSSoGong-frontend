import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Dinner, Style } from '../@types';
import { ChangeFoodInfo } from '../stores';
import { theme } from '../styles';
import { getBasicFoodCountInDinner } from '../utils';
import { NumberInput, SwitchCase, Typography } from './common';
import StyleSelectBoxList from './StyleSelectBoxList';
import TitleWithLine from './TitleWithLine';

interface Props {
  type: 'beforeOrder' | 'order';
  dinner: Dinner;
  selectedStyle: Style | null;
  addedFoodInfos?: ChangeFoodInfo[];
  reducedFoodInfos?: ChangeFoodInfo[];
  setSelectedStyle?: Dispatch<SetStateAction<Style | null>>;
  handleChangeDinnerQuantity?: (quantity: number) => void;
  handleClickDeleteIcon?: () => void;
}

function FoodBox({
  type,
  dinner,
  selectedStyle,
  addedFoodInfos,
  reducedFoodInfos,
  setSelectedStyle,
  handleChangeDinnerQuantity,
  handleClickDeleteIcon,
}: Props) {
  const isShampain = dinner.dinnerName?.split(' ').join('') === '샴페인축제디너';

  const handleClickStyleBox = (style: Style) => {
    if (style === selectedStyle) {
      setSelectedStyle?.(null);
    } else {
      setSelectedStyle?.(style);
    }
  };

  return (
    <FoodSection>
      <FoodImage src={dinner.dinnerImageAbsolutePath || '/Dinner.png'} alt='dinner-set image' />
      <FoodDescription>
        <TitleWithLine
          title={dinner.dinnerName}
          titleFontType='h1'
          titleColor={theme.colors.text.bold}
          borderColor={theme.palette.gray50}
          type={type === 'order' ? 'close' : 'normal'}
          onClick={handleClickDeleteIcon}
        />
        <Typography type='body5' color={theme.palette.gray50}>
          {dinner.dinnerDescription || '프렌치 디너는 어쩌구저쩌구 입니다.'}
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
                  excludedStyleList={dinner.excludedStyleInfoResponseList}
                  selectedStyle={selectedStyle}
                  handleClickStyle={handleClickStyleBox}
                />
                <StyleDescription>
                  {selectedStyle?.styleTablewareInfoResponseList.map((tableware) => (
                    <Typography type='body3' key={tableware.tablewareId}>
                      {tableware.tablewareName}
                    </Typography>
                  ))}
                </StyleDescription>

                <QuantitySelectBox>
                  <Typography type='h4' color={theme.colors.text.bold}>
                    수량
                  </Typography>
                  <NumberInput
                    value={dinner.dinnerQuantity ?? 0}
                    type={'large'}
                    onChange={(e) => handleChangeDinnerQuantity?.(Number(e.target.value))}
                    onClickPlusIcon={() =>
                      handleChangeDinnerQuantity?.(Number(dinner.dinnerQuantity || 0) + 1)
                    }
                    onClickMinusIcon={() =>
                      handleChangeDinnerQuantity?.(
                        Number(dinner.dinnerQuantity) - 1 < 0
                          ? 0
                          : Number(dinner.dinnerQuantity) - 1,
                      )
                    }
                  />
                </QuantitySelectBox>
              </>
            ),
            order: (
              <>
                <TitleWithLine title='선택된 스타일' titleFontType='h4' />
                <StyleSelectBoxList
                  excludedStyleList={dinner.excludedStyleInfoResponseList}
                  selectedStyle={selectedStyle}
                  handleClickStyle={handleClickStyleBox}
                  disabled
                />
                <ExtraInfomationSection>
                  <TitleWithLine title='메뉴 변경 정보' titleFontType='h4' />
                  {addedFoodInfos?.map((item) => (
                    <InfomationLine key={item.foodId}>
                      <Typography type='body4'>• {item.foodName}</Typography>
                      <Typography type='body4' color={theme.colors.primary.blue}>
                        {item.quantity}개 추가
                      </Typography>
                    </InfomationLine>
                  ))}
                  {reducedFoodInfos?.map((item) => (
                    <InfomationLine key={item.foodId}>
                      <Typography type='body4'>• {item.foodName}</Typography>
                      <Typography type='body4' color={theme.colors.primary.red}>
                        {getBasicFoodCountInDinner(dinner, item) - item.quantity}개 삭제
                      </Typography>
                    </InfomationLine>
                  ))}
                </ExtraInfomationSection>
              </>
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
  width: 50%;
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

const StyleDescription = styled.div`
  min-height: 126px;
  content: '';
`;

export default FoodBox;
