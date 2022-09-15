import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion, MotionValue, PanInfo } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface Props {
  index: number;
  x: MotionValue;
  onDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
}

function CarouselCard({ x, index, children, onDragEnd }: PropsWithChildren<Props>) {
  return (
    <Wrapper draggable={true} drag='x' onDragEnd={onDragEnd} style={{ x }} index={index}>
      {children}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'index'>;

const Wrapper = styled(motion.div)<StyleProps>`
  ${({ index }) => css`
    max-width: 100%;
    height: 100%;
    left: ${index * 100}%;
    right: ${index * 100}%;
    display: inline-block;
    flex: none;
  `}
`;

export default CarouselCard;
