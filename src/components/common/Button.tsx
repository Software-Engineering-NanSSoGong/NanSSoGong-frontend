import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, CSSProperties, PropsWithChildren } from 'react';

interface Props extends ComponentProps<'button'> {
  width?: CSSProperties['width'];
  disabled?: boolean;
}

function Button({ width, children, ...restProps }: PropsWithChildren<Props>) {
  return (
    <Wrapper width={width} {...restProps}>
      {children}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'width' | 'disabled'>;

const Wrapper = styled.button<StyleProps>`
  ${({ disabled, width }) => css`
    width: ${typeof width === 'number' ? width : `${width}px`};
    cursor: ${disabled ? 'default' : 'pointer'};
  `}
`;

export default Button;
