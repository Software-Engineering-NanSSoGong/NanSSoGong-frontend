import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import { PalleteValueType } from '../styles/theme/colors';
import { FontKeyType } from '../styles/theme/fonts';
import { Typography } from './common';

interface Props {
  title: string;
  titleFontType: FontKeyType;
  titleColor?: PalleteValueType;
  borderColor?: PalleteValueType;
  textAlign?: CSSProperties['textAlign'];
}

function TitleWithLine({
  title,
  titleFontType,
  titleColor,
  textAlign,
  borderColor,
  ...restProps
}: Props) {
  return (
    <Wrapper borderColor={borderColor} textAlign={textAlign} {...restProps}>
      <Typography type={titleFontType} color={titleColor} textAlign={textAlign}>
        {title}
      </Typography>
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'textAlign' | 'borderColor'>;

const Wrapper = styled.div<StyleProps>`
  width: 100%;
  text-align: ${({ textAlign }) => textAlign};

  border-bottom: 2px solid ${({ borderColor }) => borderColor};
`;

export default TitleWithLine;
