import styled from '@emotion/styled';
import { animate, AnimationOptions, PanInfo, useMotionValue } from 'framer-motion';
import React, {
  ComponentProps,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import CarouselCard from './CarouselCard';
import CarouselNavigation from './CarouselNavigation';

const transition: AnimationOptions<number> = {
  type: 'spring',
  bounce: 0,
};

interface Props extends ComponentProps<'section'> {
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
}

function CarouselCardList({
  autoPlay = true,
  interval = 2000,
  loop = true,
  children,
  ...restProps
}: PropsWithChildren<Props>) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number>(0);
  const childrens = React.Children.toArray(children);

  const moveToNextImage = useCallback(() => {
    const overBoundaryIndex = loop ? 0 : index;
    setIndex(index + 1 === childrens.length ? overBoundaryIndex : index + 1);
  }, [childrens.length, index, loop]);

  const movetoPrevImage = useCallback(() => {
    const overBoundaryIndex = loop ? childrens.length - 1 : 0;
    setIndex(index - 1 < 0 ? overBoundaryIndex : index - 1);
  }, [childrens.length, index, loop]);

  const calculateNextX = useCallback(
    () => -index * (containerRef.current?.clientWidth || 0),
    [index],
  );

  const handleDragEnd = (_: Event, dragProps: PanInfo) => {
    const clientWidth = containerRef.current?.clientWidth || 0;

    const { offset, velocity } = dragProps;

    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, calculateNextX(), transition);
      return;
    }
    if (offset.x > clientWidth / 4) {
      movetoPrevImage();
    } else if (offset.x < -clientWidth / 4) {
      moveToNextImage();
    } else {
      animate(x, calculateNextX(), transition);
    }
  };

  const handleClickNavigationDot = (nextIndex: number) => {
    setIndex(nextIndex);
  };

  useEffect(() => {
    const controls = animate(x, calculateNextX(), transition);
    return controls.stop;
  }, [calculateNextX, index, x]);

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => moveToNextImage(), interval);

      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, moveToNextImage]);

  return (
    <Wrapper {...restProps} ref={containerRef}>
      {childrens.map((child, idx) => (
        <CarouselCard key={idx} x={x} index={idx} onDragEnd={handleDragEnd}>
          {React.cloneElement(child as ReactElement)}
        </CarouselCard>
      ))}
      <CarouselNavigation
        activeIndex={index}
        length={childrens.length}
        onDotClick={handleClickNavigationDot}
      />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: hidden;
`;

export default CarouselCardList;
