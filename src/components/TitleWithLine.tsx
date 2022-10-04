import styled from '@emotion/styled';
import { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { PalleteValueType } from '../styles/theme/colors';
import { FontKeyType } from '../styles/theme/fonts';
import { Icon, Typography } from './common';

type Type = 'normal' | 'icon';

interface Props extends ComponentPropsWithoutRef<'div'> {
  title: string;
  titleFontType: FontKeyType;
  type?: Type;
  titleColor?: PalleteValueType;
  borderColor?: PalleteValueType;
  textAlign?: CSSProperties['textAlign'];
}

function TitleWithLine({
  title,
  titleFontType,
  type = 'normal',
  titleColor,
  textAlign,
  borderColor,
  ...restProps
}: Props) {
  return (
    <Wrapper type={type} borderColor={borderColor} textAlign={textAlign} {...restProps}>
      <Typography type={titleFontType} color={titleColor} textAlign={textAlign}>
        {title}
      </Typography>
      {type === 'icon' && <Icon type='mic' style={{ cursor: 'pointer' }} />}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'textAlign' | 'borderColor' | 'type'>;

const Wrapper = styled.div<StyleProps>`
  display: ${({ type }) => (type === 'icon' ? 'flex' : 'block')};
  justify-content: ${({ type }) => type === 'icon' && 'space-between'};
  align-items: ${({ type }) => type === 'icon' && 'center'};
  text-align: ${({ textAlign }) => textAlign};
  border-bottom: 2px solid ${({ borderColor }) => borderColor};
`;

export default TitleWithLine;
