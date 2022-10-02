import styled from '@emotion/styled';
import { useState } from 'react';
import { theme } from '../styles';
import { Typography } from './common';
import TitleWithLine from './TitleWithLine';

function OrderComponent() {
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleClickDescription = () => {
    console.log('click');
    setIsCheck((prev) => !prev);
  };

  return (
    <Wrapper>
      <TitleWithLine
        title='프렌치 디너 세트'
        titleFontType='h1'
        titleColor={theme.colors.primary.white}
        borderColor={theme.colors.primary.white}
      />
      <Description type='body4' color={theme.palette.gray50} onClick={handleClickDescription}>
        프렌치 디너는 커피 한잔, 와인 한잔, 샐러드, 스테이크가 제공되며 미스터 대박 디너 서비스의
        인기 세트 중 하나로 프랑스식의 근사한 저녁 식사를 드실 수 있습니다
      </Description>
      <StyleTitle>
        <Typography type='h4'>스타일 선택</Typography>
        {isCheck && (
          <Typography type='body5' color={theme.colors.primary.red}>
            ※ 샴페인 축제 디너는 심플 스타일 선택이 불가합니다
          </Typography>
        )}
      </StyleTitle>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 800px;
`;

const StyleTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Description = styled(Typography)`
  margin-block: 24px;
`;

export default OrderComponent;
