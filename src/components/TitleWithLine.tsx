import styled from '@emotion/styled';
import { ComponentPropsWithoutRef, CSSProperties, Dispatch, SetStateAction } from 'react';
import { PalleteValueType } from '../styles/theme/colors';
import { FontKeyType } from '../styles/theme/fonts';
import ClickableSpeechIcon from './ClickableSpeechIcon';
import { Typography } from './common';

type Type = 'normal' | 'mic-icon';

interface Props extends ComponentPropsWithoutRef<'div'> {
  title: string;
  titleFontType: FontKeyType;
  type?: Type;
  titleColor?: PalleteValueType;
  borderColor?: PalleteValueType;
  textAlign?: CSSProperties['textAlign'];
  setValue?: Dispatch<SetStateAction<string>>;
}

function TitleWithLine({
  title,
  titleFontType,
  type = 'normal',
  titleColor,
  textAlign,
  borderColor,
  setValue,
  ...restProps
}: Props) {
  return (
    <Wrapper type={type} borderColor={borderColor} textAlign={textAlign} {...restProps}>
      <Typography type={titleFontType} color={titleColor} textAlign={textAlign}>
        {title}
      </Typography>
      {type === 'mic-icon' && <ClickableSpeechIcon setValue={setValue!} />}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'textAlign' | 'borderColor' | 'type'>;

const Wrapper = styled.div<StyleProps>`
  display: ${({ type }) => (type === 'mic-icon' ? 'flex' : 'block')};
  justify-content: ${({ type }) => type === 'mic-icon' && 'space-between'};
  align-items: ${({ type }) => type === 'mic-icon' && 'center'};
  text-align: ${({ textAlign }) => textAlign};
  border-bottom: 2px solid ${({ borderColor }) => borderColor};
`;

export default TitleWithLine;
