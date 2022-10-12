import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Button, IconInputLine, TitleWithLine, Typography } from '../../components';
import { signUpState as RecoilSignUpState } from '../../stores/SignUp';
import { theme } from '../../styles';

function SignUpEmailPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordAgain, setPasswordAgain] = React.useState<string>('');
  const [signUpState] = useRecoilState(RecoilSignUpState);

  return (
    <Wrapper>
      {signUpState.userType}
      <SignupBoxLayout>
        <BoxLayout>
          <Title
            title='회원가입'
            titleFontType='h1'
            textAlign='center'
            titleColor={theme.colors.text.dark}
            borderColor={theme.palette.black}
          />
          <Lines>
            <Typography type='h5' color={theme.palette.gray400} textAlign='left'>
              아이디
            </Typography>
            <IconInputLine icon='user' value={email} onChange={(e) => setEmail(e.target.value)} />
            <CheckButton>
              <Typography
                type='h5'
                color={theme.palette.white}
                textAlign='center'
                style={{ padding: '12px' }}
              >
                중복확인
              </Typography>
            </CheckButton>
            <Typography type='h5' color={theme.palette.gray400} textAlign='left'>
              비밀번호
            </Typography>
            <IconInputLine
              icon='lock'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography type='h5' color={theme.palette.gray400} textAlign='left'>
              비밀번호 확인
            </Typography>
            <IconInputLine
              icon='lock'
              type='password'
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
          </Lines>

          <Typography type='h5' color={theme.palette.coreRed} textAlign='left'>
            {password !== passwordAgain ? '비밀번호가 다릅니다' : ' '}
          </Typography>
          <Lines>
            <Button
              fullWidth
              style={{ padding: '12px' }}
              onClick={() => navigate('/signup-name')}
              disabled={
                email === '' ||
                password === '' ||
                passwordAgain === '' ||
                passwordAgain !== password
              }
            >
              <Typography type='h4' color={theme.palette.gray50} textAlign='center'>
                계속하기
              </Typography>
            </Button>
          </Lines>
          <LogoImg src='/logo.png' alt='mr-daebak logo' />
        </BoxLayout>
      </SignupBoxLayout>
    </Wrapper>
  );
}
const Wrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupBoxLayout = styled.section`
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

const LogoImg = styled.img`
  width: 150px;
  margin: 64px auto;
  display: flex;
`;

const Lines = styled.section`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const CheckButton = styled(Button)`
  width: 20%;
`;

export default SignUpEmailPage;
