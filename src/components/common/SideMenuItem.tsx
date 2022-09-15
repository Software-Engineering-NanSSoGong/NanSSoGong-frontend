import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Menu } from '../../@types';
import { PalleteValueType } from '../../styles/theme/colors';
import Button from './Button';
import Typography from './Typography';

interface Props {
  color: PalleteValueType;
  menu: Menu;
  showOffMenuContent: () => void;
}

const itemAnimation = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 100, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

function SideMenuItem({ color, menu, showOffMenuContent }: Props) {
  const navigate = useNavigate();

  const handleClickMenuItem = (href: string) => {
    navigate(href);
    showOffMenuContent();
  };

  return (
    <Wrapper
      variants={itemAnimation}
      initial={{ y: 50, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ButtonWrapper onClick={() => handleClickMenuItem(menu.href)}>
        <CircleBullet color={color} />
        <ItemTitle type='body3' color={color} textAlign='center'>
          {menu.title}
        </ItemTitle>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(motion.li)`
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: ${({ theme }) => theme.zIndex.headerItem};
`;

const ButtonWrapper = styled(Button)`
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.size.mobile}px) {
    width: 95%;
  }
`;

const CircleBullet = styled.span`
  border: ${({ color }) => `2px solid ${color}`};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex: 40px 0;
  margin-right: 20px;
  z-index: 100;
`;

const ItemTitle = styled(Typography)`
  border: ${({ color }) => `2px solid ${color}`};
  border-radius: 5px;
  width: 200px;
  flex: 1;
`;

export default SideMenuItem;
