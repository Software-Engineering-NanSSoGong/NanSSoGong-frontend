import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, CSSProperties, PropsWithChildren } from 'react';
import { theme } from '../../styles';
import { PalleteValueType } from '../../styles/theme/colors';

export enum ButtonHierarchy {
  Primary = 'Primary',
  Danger = 'Danger',
  Success = 'Success',
  DarkGray = 'DarkGray',
  Gray = 'Gray',
}

interface Props extends ComponentProps<'button'> {
  hierarchy?: ButtonHierarchy;
  width?: CSSProperties['width'];
  fullWidth?: boolean;
  backgroundColor?: PalleteValueType | 'transparent';
  borderRadius?: number;
  disabled?: boolean;
}

function Button({
  width,
  children,
  hierarchy = ButtonHierarchy.Primary,
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
      hierarchy={hierarchy}
      {...restProps}
    >
      {children}
    </Wrapper>
  );
}

type StyleProps = Pick<
  Props,
  'width' | 'disabled' | 'backgroundColor' | 'borderRadius' | 'fullWidth' | 'hierarchy'
>;

const Wrapper = styled.button<StyleProps>`
  ${({ disabled, width, backgroundColor, borderRadius, fullWidth, hierarchy }) => css`
    width: ${fullWidth ? '100%' : typeof width === 'number' ? `${width}px` : width};

    cursor: ${disabled ? 'default' : 'pointer'};
    background-color: ${backgroundColor};
    border-radius: ${borderRadius}px;

    background-color: ${hierarchy === ButtonHierarchy.Primary
      ? theme.colors.primary.blue
      : hierarchy === ButtonHierarchy.Danger
      ? theme.colors.primary.red
      : hierarchy === ButtonHierarchy.Success
      ? theme.colors.primary.green
      : hierarchy === ButtonHierarchy.DarkGray
      ? theme.palette.gray300
      : theme.palette.gray100};
  `}
`;

export default Button;
