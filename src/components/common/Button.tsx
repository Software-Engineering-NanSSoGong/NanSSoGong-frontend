import styled from '@emotion/styled';
import { ComponentProps, CSSProperties, PropsWithChildren } from 'react';
import { theme } from '../../styles';

export enum ButtonHierarchy {
  Primary = 'Primary',
  Danger = 'Danger',
  Success = 'Success',
  DarkGray = 'DarkGray',
  Gray = 'Gray',
  Parent = 'Parent',
  Warning = 'Warning',
}

interface Props extends ComponentProps<'button'> {
  hierarchy?: ButtonHierarchy;
  width?: CSSProperties['width'];
  fullWidth?: boolean;
  borderRadius?: number | string;
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
  border-radius: ${({ borderRadius }) =>
    typeof borderRadius === 'string' ? borderRadius : `${borderRadius}px`};
  transition: all 0.2s ease-in;

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
      case ButtonHierarchy.Gray:
        return theme.palette.gray100;
      case ButtonHierarchy.Warning:
        return theme.colors.primary.yellow;
      case ButtonHierarchy.Parent:
      default:
        return 'transparent';
    }
  }};
  border: none;
  outline: none;

  &:disabled {
    background-color: ${theme.palette.gray200};
  }
`;

export default Button;
