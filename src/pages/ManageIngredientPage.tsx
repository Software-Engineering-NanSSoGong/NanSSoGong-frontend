import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { SideMenuListWithEmployee, Typography } from '../components';
import { theme } from '../styles';

function ManageIngredientPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // client History
    (async () => {
      setIsLoading(true);
    })();
  }, []);

  return (
    <Wrapper>
      <SideMenuListWithEmployee />
      <Spacer>
        <Typography type='h1' color={theme.colors.text.bold} style={{ marginBottom: 40 }}>
          재료 수량 관리
        </Typography>
        {isLoading ? <LoadingGIF src='/loading.gif' alt='loading-component' /> : <></>}
      </Spacer>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
`;

const Spacer = styled.div`
  margin: 80px 120px 0 420px;
`;

const LoadingGIF = styled.img`
  width: 100%;
  height: 100%;
`;

export default ManageIngredientPage;
