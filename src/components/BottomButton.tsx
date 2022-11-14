import styled from '@emotion/styled';
import { CSSProperties, PropsWithChildren } from 'react';
import { Button } from './common';
import { FullWidthProps } from './common/Button';

interface Props {
  position: CSSProperties['position'];
  buttonProps?: FullWidthProps;
  style?: CSSProperties;
}

function BottomButton({ position, buttonProps, children, ...restProps }: PropsWithChildren<Props>) {
  return (
    <Wrapper fullWidth position={position} borderRadius={'0px'} {...buttonProps} {...restProps}>
      {children}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'position'>;

const Wrapper = styled(Button)<StyleProps>`
  padding: 16px;
  box-sizing: border-box;
  position: ${({ position }) => position};
  bottom: 0;
  left: 0;
`;

export default BottomButton;
