import styled from '@emotion/styled';
import { useState } from 'react';
import { ClientService } from '../api';
import { Button, SideMenuListWithEmployee, TitleWithLine, Typography } from '../components';

function UpdateClientGradePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickUpdateButton = async () => {
    setIsLoading(true);
    await ClientService.updateClientGrade();
    setIsLoading(false);
    alert('반영이 완료되었습니다.');
  };

  return (
    <Wrapper>
      <SideMenuListWithEmployee />
      <Spacer>
        <TitleWithLine title='고객 등급 업데이트' titleFontType='h1' />
        {isLoading ? (
          <LoadingContainer>
            <LoadingGIF src='/loading.gif' alt='loading-component' />
          </LoadingContainer>
        ) : (
          <>
            <Typography type='h3' textAlign='center' style={{ marginTop: 80 }}>
              고객의 등급을 업데이트 하시겠습니까?
            </Typography>
            <Button
              style={{ padding: 12, marginTop: 40 }}
              onClick={handleClickUpdateButton}
              fullWidth
            >
              <Typography type='h4' textAlign='center'>
                업데이트
              </Typography>
            </Button>
          </>
        )}
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

const LoadingContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const LoadingGIF = styled.img`
  width: 100%;
  height: 100%;
`;

export default UpdateClientGradePage;
