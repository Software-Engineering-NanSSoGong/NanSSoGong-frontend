import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { MemberService } from '../api';

import { theme } from '../styles';
import { Button, Typography } from './common';
import { ButtonHierarchy } from './common/Button';

function SideMenuListWithEmployee() {
  const navigate = useNavigate();

  return (
    <SideMenu>
      <LogoImg src='/logo.png' alt='mr-daebak logo' />
      <Spacer>
        {/* 상단 버튼 리스트 */}
        <ButtonList>
          <ButtonWrapper fullWidth borderRadius={10} onClick={() => navigate('/manage-order')}>
            <Typography type='body5' color={theme.colors.text.bold} textAlign='center'>
              주문 내역
            </Typography>
          </ButtonWrapper>
          <ButtonWrapper
            fullWidth
            borderRadius={10}
            hierarchy={ButtonHierarchy.Warning}
            onClick={() => navigate('/manage-ingredient')}
          >
            <Typography type='body5' color={theme.colors.text.bold} textAlign='center'>
              재료 수량 관리
            </Typography>
          </ButtonWrapper>
          <ButtonWrapper
            fullWidth
            borderRadius={10}
            hierarchy={ButtonHierarchy.DarkGray}
            onClick={() => navigate('/manage-time')}
          >
            <Typography type='body5' color={theme.colors.text.bold} textAlign='center'>
              운영 시간 관리
            </Typography>
          </ButtonWrapper>
        </ButtonList>
        {/* 하단 버튼 리스트 */}
        <ButtonList>
          <ButtonWrapper
            fullWidth
            borderRadius={10}
            hierarchy={ButtonHierarchy.Gray}
            onClick={() => {
              MemberService.logOut();
              navigate('/');
              alert('로그아웃이 완료되었습니다.');
            }}
          >
            <Typography type='body5' color={theme.colors.text.bold} textAlign='center'>
              로그아웃
            </Typography>
          </ButtonWrapper>
        </ButtonList>
      </Spacer>
    </SideMenu>
  );
}

const SideMenu = styled.section`
  width: 220px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding-inline: 40px;
  display: flex;
  flex-direction: column;
  background-color: ${theme.palette.gray50};
  z-index: ${theme.zIndex.header};
`;

const LogoImg = styled.img`
  width: 150px;
  margin: 40px auto;
  display: flex;
`;

const Spacer = styled.div`
  height: 100%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonWrapper = styled(Button)`
  padding: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export default SideMenuListWithEmployee;
