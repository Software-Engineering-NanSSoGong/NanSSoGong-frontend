import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Menu } from '../@types';
import { useDimensions } from '../hooks';
import { theme } from '../styles';
import { SideMenuItem, SideMenuList } from './common';
import SideMenuToggleButton from './SideMenuToggleButton';

const sideAnimation = {
  open: (SideMenuHeight = 1000) => ({
    clipPath: `circle(${SideMenuHeight * 2 + 200}px at 37px 37px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 37px 37px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const MENUS: Menu[] = [
  { title: 'Home', href: '/' },
  { title: 'Carousel', href: '/carousel' },
  { title: 'Home3', href: '/3' },
  { title: 'Home4', href: '/4 ' },
];
const COLORS = [
  theme.colors.primary.red,
  theme.colors.primary.yellow,
  theme.colors.primary.green,
  theme.colors.primary.blue,
] as const;

function SideMenuWithToggleButton() {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const sideMenuRef = useRef<HTMLElement>(null);
  const { height: SideMenuHeight } = useDimensions({ ref: sideMenuRef });

  const handleClickToggleButton = () => {
    setIsShowContent((prev) => !prev);
  };

  const showOffMenuContent = () => {
    setIsShowContent(false);
  };

  return (
    <Wrapper
      initial={true}
      animate={isShowContent ? 'open' : 'closed'}
      custom={SideMenuHeight}
      ref={sideMenuRef}
    >
      <AnimationBackground variants={sideAnimation} />
      <SideMenuToggleButton
        isShowContent={isShowContent}
        onClick={handleClickToggleButton}
      />
      <SideMenuList isShowContent={isShowContent}>
        {MENUS.map((menu, idx) => (
          <SideMenuItem
            key={menu.title}
            color={COLORS[idx % COLORS.length]}
            menu={menu}
            showOffMenuContent={showOffMenuContent}
          />
        ))}
      </SideMenuList>
    </Wrapper>
  );
}

const Wrapper = styled(motion.section)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  @media (max-width: ${theme.size.mobile}px) {
    width: 100%;
  }
`;

const AnimationBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  z-index: 50;
  background: ${theme.palette.gray50};

  @media (max-width: ${theme.size.mobile}px) {
    width: 100%;
  }
`;

export default SideMenuWithToggleButton;
