import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, CSSProperties, PropsWithChildren } from 'react';
import { theme } from '../../styles';
import { PalleteValueType } from '../../styles/theme/colors';

interface Props extends ComponentProps<'button'> {
  width?: CSSProperties['width'];
  fullWidth?: boolean;
  backgroundColor?: PalleteValueType | 'transparent';
  borderRadius?: number;
  disabled?: boolean;
}

function Button({
  width,
  children,
  fullWidth = false,
  backgroundColor = theme.palette.blue600,
  borderRadius = 10,
  ...restProps
}: PropsWithChildren<Props>) {
  return (
    <Wrapper
      width={width}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      fullWidth={fullWidth}
      {...restProps}
    >
      {children}
    </Wrapper>
  );
}

type StyleProps = Pick<
  Props,
  'width' | 'disabled' | 'backgroundColor' | 'borderRadius' | 'fullWidth'
>;

const Wrapper = styled.button<StyleProps>`
  ${({ disabled, width, backgroundColor, borderRadius, fullWidth }) => css`
    width: ${fullWidth
      ? '100%'
      : typeof width === 'number'
      ? `${width}px`
      : width};

    cursor: ${disabled ? 'default' : 'pointer'};
    background-color: ${backgroundColor};
    border-radius: ${borderRadius}px;
  `}
`;

export default Button;
