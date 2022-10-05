import styled from '@emotion/styled';
import { ComponentProps, CSSProperties, PropsWithChildren } from 'react';
import { theme } from '../../styles';

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
  borderRadius?: number;
  disabled?: boolean;
}

function Button({
  width,
  children,
  disabled = false,
  hierarchy = ButtonHierarchy.Primary,
  fullWidth = false,
  borderRadius = 10,
  ...restProps
}: PropsWithChildren<Props>) {
  return (
    <Wrapper
      width={width}
      borderRadius={borderRadius}
      fullWidth={fullWidth}
      hierarchy={hierarchy}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'width' | 'disabled' | 'borderRadius' | 'fullWidth' | 'hierarchy'>;

const Wrapper = styled.button<StyleProps>`
  width: ${({ fullWidth, width }) =>
    fullWidth ? '100%' : typeof width === 'number' ? `${width}px` : width};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  border-radius: ${({ borderRadius }) => borderRadius}px;

  background-color: ${({ hierarchy }) => {
    switch (hierarchy) {
      case ButtonHierarchy.Primary:
        return theme.colors.primary.blue;
      case ButtonHierarchy.Danger:
        return theme.colors.primary.red;
      case ButtonHierarchy.Success:
        return theme.colors.primary.green;
      case ButtonHierarchy.DarkGray:
        return theme.palette.gray300;
      default:
        return theme.palette.gray100;
    }
  }};
  border: none;
  outline: none;
`;

export default Button;
