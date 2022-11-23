import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { ChefService, MemberService, RiderService } from '../api';
import { userState } from '../stores';

import { theme } from '../styles';
import { storage } from '../utils';
import { Button, Typography } from './common';
import { ButtonHierarchy } from './common/Button';

function SideMenuListWithEmployee() {
  const navigate = useNavigate();
  const me = useRecoilValue(userState);
  const resetUserState = useResetRecoilState(userState);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (me.memberType === 'loginRider') {
        const res = await RiderService.getInfo();
        setName(res.name);
      } else if (me.memberType === 'loginChef') {
        const res = await ChefService.getInfo();
        setName(res.name);
      } else {
        setName('테스트');
      }
    })();
  }, [me.memberType]);

  return (
    <SideMenu>
      <LogoImg src='/logo.png' alt='mr-daebak logo' />
      <Spacer>
        {/* 상단 버튼 리스트 */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Typography type='h6' color={theme.colors.text.dark}>
            {me.memberType === 'loginChef' ? '쉐프' : '라이더'}
          </Typography>
          <Typography type='h6' color={theme.colors.primary.blue} style={{ fontWeight: 700 }}>
            {name}님 안녕하세요
          </Typography>
        </div>
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
          <ButtonWrapper
            fullWidth
            borderRadius={10}
            hierarchy={ButtonHierarchy.DarkGray}
            onClick={() => navigate('/update-grade')}
          >
            <Typography type='body5' color={theme.colors.text.bold} textAlign='center'>
              고객 등급 관리
            </Typography>
          </ButtonWrapper>
          <ButtonWrapper
            fullWidth
            borderRadius={10}
            hierarchy={ButtonHierarchy.DarkGray}
            onClick={() => navigate('/manage-request-signup')}
          >
            <Typography type='body5' color={theme.colors.text.bold} textAlign='center'>
              가입 요청 관리
            </Typography>
          </ButtonWrapper>
        </ButtonList>
        {/* 하단 버튼 리스트 */}
        <ButtonList>
          <ButtonWrapper
            fullWidth
            borderRadius={10}
            hierarchy={ButtonHierarchy.Gray}
            onClick={async () => {
              await MemberService.logOut();
              resetUserState();
              navigate('/');
              storage.removeAll();
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
