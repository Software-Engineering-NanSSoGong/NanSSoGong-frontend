import styled from '@emotion/styled';
import React from 'react';
import { useRecoilState } from 'recoil';
import { Button, LabelWithMultipleInput, TitleWithLine, Typography } from '../../components';
import { ButtonHierarchy } from '../../components/common/Button';
import { signUpState as RecoilSignUpState } from '../../stores/SignUp';
import { theme } from '../../styles';

function SignUpNamePage() {
  const [address, setAddress] = React.useState<Record<string, string>>({
    address_1: '',
    address_2: '',
    address_3: '',
  });
  const [cardnum, setCardNum] = React.useState<Record<string, string>>({
    card_1: '',
    card_2: '',
    card_3: '',
    card_4: '',
  });
  const [signUpState] = useRecoilState(RecoilSignUpState);
  const [accept, setAccept] = React.useState<boolean>(false);

  const handleChangeMultipleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    setCardNum((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickButton = () => {
    console.log(address);
    console.log(cardnum);
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
            <LabelWithMultipleInput
              title='카드 번호'
              placeholders={['', '', '', '']}
              labelColor={theme.colors.background}
              inputBackgroundColor={theme.palette.gray200}
              inputColor={theme.colors.text.bold}
              handleChangeInput={handleChangeMultipleInput}
            />

            <LabelWithMultipleInput
              title='상세 주소'
              // placeholders={['예시) 동대문구', '서울시립대로 163', '국제학사 1001호']}
              placeholders={['예시) 동대문구', '서울시립대로 163', '국제학사']}
              labelColor={theme.colors.background}
              inputBackgroundColor={theme.palette.gray200}
              inputColor={theme.colors.text.bold}
              handleChangeInput={handleChangeMultipleInput}
            />

            <Typography type='h4' color={theme.palette.gray400} textAlign='left'>
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
