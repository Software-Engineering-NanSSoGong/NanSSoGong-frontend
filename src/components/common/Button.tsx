import styled from '@emotion/styled';
import { ComponentPropsWithoutRef, CSSProperties, PropsWithChildren } from 'react';
import { theme } from '../../styles';
import { XOR } from '../../utils';

export enum ButtonHierarchy {
  Primary = 'Primary',
  Danger = 'Danger',
  Success = 'Success',
  DarkGray = 'DarkGray',
  Gray = 'Gray',
  Parent = 'Parent',
  Warning = 'Warning',
}

type FullWidthProps = ComponentPropsWithoutRef<'button'> & {
  hierarchy?: ButtonHierarchy;
  borderRadius?: number | string;
  disabled?: boolean;
  fullWidth?: boolean;
};

type WidthProps = ComponentPropsWithoutRef<'button'> & {
  hierarchy?: ButtonHierarchy;
  borderRadius?: number | string;
  disabled?: boolean;
  width?: CSSProperties['width'];
};

function Button({
  width,
  children,
  disabled = false,
  hierarchy = ButtonHierarchy.Primary,
  fullWidth = false,
  borderRadius = 10,
  ...restProps
}: PropsWithChildren<XOR<WidthProps, FullWidthProps>>) {
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

type StyleProps = Pick<
  XOR<WidthProps, FullWidthProps>,
  'width' | 'disabled' | 'borderRadius' | 'fullWidth' | 'hierarchy'
>;

const Wrapper = styled.button<StyleProps>`
  width: ${({ fullWidth, width }) => {
    if (fullWidth) {
      return '100%';
    }
    if (typeof width === 'number') {
      return `${width}px`;
    }
    return width;
  }};
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
