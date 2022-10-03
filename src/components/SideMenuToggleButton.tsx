import styled from '@emotion/styled';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './common';
import { theme } from '../styles';

interface Props {
  isShowContent: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MotionPath = (props: any) => (
  <motion.path
    fill='transparent'
    strokeWidth='3'
    stroke='hsl(0, 0%, 18%)'
    strokeLinecap='round'
    {...props}
  />
);

function SideMenuToggleButton({ onClick }: Props) {
  return (
    <Wrapper onClick={onClick} backgroundColor={'transparent'}>
      <Lines width='23' height='23' viewBox='0 0 23 23'>
        <MotionPath
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <MotionPath
          d='M 2 9.423 L 20 9.423'
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <MotionPath
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </Lines>
    </Wrapper>
  );
}

const Wrapper = styled(Button)`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: ${theme.zIndex.header};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Lines = styled.svg`
  position: absolute;
  left: 30%;
  top: 32%;
`;

export default SideMenuToggleButton;
