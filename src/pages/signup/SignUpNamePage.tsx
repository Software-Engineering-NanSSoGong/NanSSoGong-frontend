import styled from '@emotion/styled';
import React from 'react';
import { useRecoilState } from 'recoil';
import {
  Button,
  IconInputLine,
  LabelWithMultipleInput,
  TitleWithLine,
  Typography,
} from '../../components';
import { ButtonHierarchy } from '../../components/common/Button';
import { signUpState as RecoilSignUpState } from '../../stores/SignUp';
import { theme } from '../../styles';

function SignUpNamePage() {
  const [nickname, setNickname] = React.useState<string>('');
  const [address, setAddress] = React.useState<Record<string, string>>({
    abc: '',
    bcd: '',
    edf: '',
  });
  const [signUpState] = useRecoilState(RecoilSignUpState);
  const [accept, setAccept] = React.useState<boolean>(false);

  const handleChangeMultipleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickButton = () => {
    console.log(address);
  };

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
              성명
            </Typography>
            <IconInputLine
              icon='user'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            {/* <Typography type='h5' color={theme.palette.gray400} textAlign='left'>
              주소
            </Typography>
            <IconInputLine
              icon='lock'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            /> */}
            <LabelWithMultipleInput
              title='상세 주소'
              // placeholders={['예시) 동대문구', '서울시립대로 163', '국제학사 1001호']}
              placeholders={['abc', 'bcd', 'edf']}
              labelColor={theme.colors.background}
              inputBackgroundColor={theme.palette.gray300}
              inputColor={theme.colors.text.bold}
              handleChangeInput={handleChangeMultipleInput}
            />

            <Typography type='h5' color={theme.palette.gray400} textAlign='left'>
              개인정보 이용 동의
            </Typography>
            <AcceptButton
              fullWidth
              style={{ padding: '12px' }}
              onClick={() => setAccept((prev) => !prev)}
              hierarchy={ButtonHierarchy.DarkGray}
              className={accept === true ? 'active' : ''}
            >
              <Typography type='h4' color={theme.palette.white} textAlign='center'>
                동의합니다
              </Typography>
            </AcceptButton>
          </Lines>
          <Lines>
            <Button
              fullWidth
              style={{ padding: '12px' }}
              // onClick={() => navigate('/main')}
              onClick={handleClickButton}
              // disabled={name === '' || address === ''}
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

const AcceptButton = styled(Button)`
  padding: 20px;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: ${theme.palette.gray400};
  }

  &.active {
    background-color: ${theme.colors.primary.green};
  }
`;

export default SignUpNamePage;
