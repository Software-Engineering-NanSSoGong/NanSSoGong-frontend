import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from '../components';
import { theme as Theme } from '../styles';

function MainPage() {
  return (
    <Layout>
      <Typography type='h5' color={Theme.palette.gray50}>
        hi
      </Typography>
    </Layout>
  );
}

const Layout = styled.main`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.background};

    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

export default MainPage;
