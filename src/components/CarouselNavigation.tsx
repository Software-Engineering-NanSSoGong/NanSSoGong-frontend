import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface Props {
  activeIndex: number;
  length: number;
  onDotClick: (nextIndex: number) => void;
}

// const dotAnimation = {

// }

function CarouselNavigation({ activeIndex, length, onDotClick }: Props) {
  const navigations = Array.from({ length });
  return (
    <Wrapper>
      {navigations.map((_, index) => (
        <DotNavigation
          key={index}
          isActive={index === activeIndex}
          onClick={() => onDotClick(index)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
`;

type DotStyleProps = {
  isActive: boolean;
};

const DotNavigation = styled(motion.span)<DotStyleProps>`
  ${({ theme, isActive }) => css`
    background-color: ${isActive ? theme.colors.primary.black : theme.colors.primary.white};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0 10px;
    display: inline-block;
    cursor: pointer;
  `}
`;

export default CarouselNavigation;
