import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface Props {
  isShowContent: boolean;
}

function SideMenuList({ isShowContent, children }: PropsWithChildren<Props>) {
  return (
    <SideMenuUl
      variants={{
        open: {
          transition: { staggerChildren: 0.07, delayChildren: 0.2 },
        },
        closed: {
          transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
      }}
      isShowContent={isShowContent}
    >
      {children}
    </SideMenuUl>
  );
}

type StyleProps = Pick<Props, 'isShowContent'>;

const SideMenuUl = styled(motion.ul)<StyleProps>`
  ${({ theme, isShowContent }) => css`
    position: sticky;
    top: 100px;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    gap: ${theme.padding.lg}px;
    z-index: ${theme.zIndex.header};
    pointer-events: ${isShowContent ? 'default' : 'none'};
  `}
`;

export default SideMenuList;
