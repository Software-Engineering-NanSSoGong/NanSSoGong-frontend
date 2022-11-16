import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { ChefService, MemberService, RiderService } from '../../api';
import { Button, IconInputLine, TitleWithLine, Typography } from '../../components';
import { signUpState as RecoilSignUpState } from '../../stores/SignUp';
import { theme } from '../../styles';
import { emailRegex } from '../../utils';

function SignUpEmailPage() {
  const navigate = useNavigate();
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordAgain, setPasswordAgain] = React.useState<string>('');
  const [isAlreadyUsedEmail, setIsAlreadyUsedEmail] = React.useState<boolean>(true);
  const [signUpState, setSignUpState] = useRecoilState(RecoilSignUpState);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const resetSignUpState = useResetRecoilState(RecoilSignUpState);
  const isEmailInputFocus = window?.document.activeElement === emailInputRef.current;

  const handleValidIdButton = async () => {
    if (email === '') {
      alert('이메일 칸을 채워주세요.');
      return;
    }
    try {
      const res = await MemberService.checkValidId({ email });
      if (!res) {
        alert('중복된 아이디입니다');
      } else {
        alert('사용 가능한 아이디입니다.');
        setIsAlreadyUsedEmail(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickSignUpEmailButton = async () => {
    let res = {};
    if (signUpState.userType === 'client') {
      setSignUpState((prev) => ({ ...prev, name, email, password }));
      navigate('/signup-client-info');
      return;
    }
    if (signUpState.userType === 'rider') {
      res = await RiderService.signUp({ email, password, name });
    } else if (signUpState.userType === 'employee') {
      res = await ChefService.signUp({ email, password, name });
    }
    if (res.hasOwnProperty('name')) {
      navigate('/');
      resetSignUpState();
      alert(`${name}님 회원가입이 완료되었습니다.`);
    }
  };

  return (
    <Wrapper>
      <SignupBoxLayout>
        <BoxLayout>
          <Title
            title={signUpState.userType !== 'client' ? '직원으로 가입하기' : '회원으로 가입하기'}
            titleFontType='h1'
            textAlign='center'
            titleColor={theme.colors.text.dark}
            borderColor={theme.palette.black}
          />
          <Lines>
            <Typography type='h5' color={theme.palette.gray400} textAlign='left'>
              성명
            </Typography>
            <IconInputLine icon='user' value={name} onChange={(e) => setName(e.target.value)} />
            <Typography type='h5' color={theme.palette.gray400} textAlign='left'>
              아이디
            </Typography>
            <BetweenLine>
              <IconInputLine
                icon='user'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={emailInputRef}
              />
              <CheckButton onClick={handleValidIdButton}>
                <Typography
                  type='h5'
                  color={theme.palette.white}
                  textAlign='center'
                  style={{ padding: '12px' }}
                >
                  중복확인
                </Typography>
              </CheckButton>
            </BetweenLine>
            <MinHeightLine>
              {isEmailInputFocus && !emailRegex.test(email) && (
                <Typography type='body4' textAlign={'end'} color={theme.colors.primary.red}>
                  email의 형태로 입력해 주세요.
                </Typography>
              )}
            </MinHeightLine>
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

          <MinHeightLine>
            <Typography
              type='body3'
              color={theme.palette.coreRed}
              textAlign='end'
              style={{ paddingTop: '12px' }}
            >
              {password !== passwordAgain ? '비밀번호가 다릅니다' : ' '}
            </Typography>
          </MinHeightLine>
          <Lines>
            <Button
              fullWidth
              style={{ padding: '12px' }}
              onClick={handleClickSignUpEmailButton}
              disabled={
                name === '' ||
                email === '' ||
                password === '' ||
                passwordAgain === '' ||
                passwordAgain !== password ||
                isAlreadyUsedEmail
              }
            >
              <Typography type='h4' color={theme.palette.gray50} textAlign='center'>
                {signUpState.userType !== 'client' ? '가입하기' : '계속하기'}
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
  width: 50%;
`;

const BetweenLine = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 80px;
`;

const MinHeightLine = styled.div`
  min-height: 52px;
`;

export default SignUpEmailPage;
