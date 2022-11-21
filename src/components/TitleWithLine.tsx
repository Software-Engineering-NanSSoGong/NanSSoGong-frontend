import styled from '@emotion/styled';
import { ComponentPropsWithoutRef, CSSProperties, Dispatch, SetStateAction } from 'react';
import { PalleteValueType } from '../styles/theme/colors';
import { FontKeyType } from '../styles/theme/fonts';
import ClickableIcon from './ClickableIcon';
import ClickableSpeechIcon from './ClickableSpeechIcon';
import { Typography } from './common';

type Type = 'normal' | 'mic-icon' | 'close';

interface Props extends ComponentPropsWithoutRef<'div'> {
  title: string;
  titleFontType: FontKeyType;
  type?: Type;
  titleColor?: PalleteValueType;
  borderColor?: PalleteValueType;
  textAlign?: CSSProperties['textAlign'];
  setValue?: Dispatch<SetStateAction<string>>;
  handleClickIcon?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function TitleWithLine({
  title,
  titleFontType,
  type = 'normal',
  titleColor,
  textAlign,
  borderColor,
  setValue,
  handleClickIcon,
  ...restProps
}: Props) {
  return (
    <Wrapper type={type} borderColor={borderColor} textAlign={textAlign} {...restProps}>
      <Typography type={titleFontType} color={titleColor} textAlign={textAlign}>
        {title}
      </Typography>
      {type === 'mic-icon' && <ClickableSpeechIcon setValue={setValue!} />}
      {type === 'close' && (
        <ClickableIcon iconProps={{ type: 'close' }} onClick={handleClickIcon!} />
      )}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'textAlign' | 'borderColor' | 'type'>;

const Wrapper = styled.div<StyleProps>`
  display: ${({ type }) => (type === 'normal' ? 'block' : 'flex')};
  justify-content: ${({ type }) => (type === 'normal' ? 'initial' : 'space-between')};
  align-items: center;
  text-align: ${({ textAlign }) => textAlign};
  border-bottom: 2px solid ${({ borderColor }) => borderColor};
`;

export default TitleWithLine;
