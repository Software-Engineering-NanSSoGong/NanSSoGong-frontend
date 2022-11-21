import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { RequestSignUpEmployee } from '../@types';
import { ChefService, RiderService } from '../api';
import { Button, SideMenuListWithEmployee, TitleWithLine, Typography } from '../components';
import { ButtonHierarchy } from '../components/common/Button';
import { theme } from '../styles';

type Employee = 'rider' | 'chef';

function ManageRequestSignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [list, setList] = useState<(RequestSignUpEmployee & { id: number; type: Employee })[]>([]);

  const handleClickAcceptButton = async (type: Employee, id: number) => {
    if (type === 'chef') {
      await ChefService.acceptSignUp({ id });
    } else if (type === 'rider') {
      await RiderService.acceptSignUp({ id });
    }
    alert('수락하였습니다.');
  };

  const handleClickDenyButton = async (type: Employee, id: number) => {
    if (type === 'chef') {
      await ChefService.denySignUp({ id });
    } else if (type === 'rider') {
      await RiderService.denySignUp({ id });
    }
    alert('거절하였습니다.');
  };

  useEffect(() => {
    // client History
    (async () => {
      setIsLoading(true);
      const riderList = await RiderService.getRequestSignUpList({ page: 0, size: 50 });
      const chefList = await ChefService.getRequestSignUpList({ page: 0, size: 50 });
      const riders = riderList.content.map((info) => ({
        ...info,
        id: info.riderSignId,
        type: 'rider' as Employee,
      }));
      const chefs = chefList.content.map((info) => ({
        ...info,
        id: info.chefSignId,
        type: 'chef' as Employee,
      }));
      const nextList = [...riders, ...chefs];
      setList(nextList);
      setIsLoading(false);
    })();
  }, []);

  return (
    <Wrapper>
      <SideMenuListWithEmployee />
      <Spacer>
        <TitleWithLine title='회원 가입 관리' titleFontType='h1' />
        {isLoading ? (
          <LoadingContainer>
            <LoadingGIF src='/loading.gif' alt='loading-component' />
          </LoadingContainer>
        ) : (
          <BoxList>
            {list.map((info) => (
              <RequestInfoBox key={info.loginId}>
                <StaffInfoBox>
                  <Typography type='h4'>이름: {info.name}</Typography>
                  <Typography type='h4'>아이디: {info.loginId}</Typography>
                </StaffInfoBox>
                <div style={{ display: 'flex', gap: 16 }}>
                  <Button
                    onClick={() => handleClickAcceptButton(info.type, info.id)}
                    style={{ padding: 16 }}
                  >
                    <Typography type='h5'>수락</Typography>
                  </Button>
                  <Button
                    hierarchy={ButtonHierarchy.Danger}
                    onClick={() => handleClickDenyButton(info.type, info.id)}
                    style={{ padding: 16 }}
                  >
                    <Typography type='h5'>거절</Typography>
                  </Button>
                </div>
              </RequestInfoBox>
            ))}
          </BoxList>
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
  max-width: 50%;
  height: 100%;
`;

const BoxList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RequestInfoBox = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.palette.gray300};
  box-sizing: border-box;
  border-radius: 8px;
  padding: 24px;
`;

const StaffInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export default ManageRequestSignUpPage;
