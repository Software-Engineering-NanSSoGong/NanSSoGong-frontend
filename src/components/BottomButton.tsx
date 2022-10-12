import styled from '@emotion/styled';
import { ComponentPropsWithoutRef, CSSProperties, PropsWithChildren } from 'react';
import { Button } from './common';

interface Props {
  buttonProps?: ComponentPropsWithoutRef<typeof Button>;
  style?: CSSProperties;
}

function BottomButton({ buttonProps, children, ...restProps }: PropsWithChildren<Props>) {
  return (
    <Wrapper fullWidth borderRadius={'0px'} {...buttonProps} {...restProps}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled(Button)`
  padding: 16px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
`;

export default BottomButton;
