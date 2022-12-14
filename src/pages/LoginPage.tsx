import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { MemberService } from '../api';
import { Button, IconInputLine, TitleWithLine, Typography } from '../components';
import { ButtonHierarchy } from '../components/common/Button';
import { userState } from '../stores';
import { theme } from '../styles';

function LoginPage() {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleClickLoginButton = async () => {
    try {
      const res = await MemberService.logIn({ email, password });
      if (res.hasOwnProperty('sessionId')) {
        setUserState({ ...res });
        alert(`${email}님 로그인을 환영합니다.`);
        if (res.memberType === 'loginClient') {
          navigate('/main');
        } else {
          navigate('/manage-order');
        }
      }
    } catch (err) {
      alert('입력하신 정보를 확인해 주세요.');
    }
  };

  return (
    <Wrapper>
      <LoginBox>
        <BoxLayout>
          <Title
            title='로그인'
            titleFontType='h1'
            titleColor={theme.colors.text.dark}
            textAlign='center'
            borderColor={theme.palette.black}
          />
          <Lines>
            <IconInputLine icon='user' value={email} onChange={(e) => setEmail(e.target.value)} />
            <IconInputLine
              icon='lock'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleClickLoginButton();
                }
              }}
            />
          </Lines>
          <Lines>
            <Button fullWidth style={{ padding: '12px' }} onClick={handleClickLoginButton}>
              <Typography type='h4' textAlign='center'>
                로그인
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ padding: '12px' }}
              onClick={() => navigate('/signup-type')}
              hierarchy={ButtonHierarchy.DarkGray}
            >
              <Typography type='h4' textAlign='center'>
                회원가입
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ padding: '12px' }}
              onClick={() => navigate('/main')}
              hierarchy={ButtonHierarchy.DarkGray}
            >
              <Typography type='h4' textAlign='center'>
                비회원으로 주문하기
              </Typography>
            </Button>
          </Lines>
          <LogoImg src='/logo.png' alt='mr-daebak logo' />
        </BoxLayout>
      </LoginBox>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.section`
  width: 50%;
  margin-block: 120px;
  background-color: ${theme.palette.gray50};
  border-radius: 16px;
`;

const BoxLayout = styled.div`
  margin-inline: 72px;
`;

const Title = styled(TitleWithLine)`
  padding-top: 56px;
`;

const Lines = styled.section`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const LogoImg = styled.img`
  width: 150px;
  margin: 64px auto;
  display: flex;
`;

export default LoginPage;
