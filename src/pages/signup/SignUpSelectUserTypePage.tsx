import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserType } from '../../@types';
import { Icon, TitleWithLine, Typography } from '../../components';
import Button, { ButtonHierarchy } from '../../components/common/Button';
import { signUpState as RecoilSignUpState } from '../../stores/SignUp';
import { theme } from '../../styles';

function SignUpSelectUserTypePage() {
  const navigate = useNavigate();
  const [signUpState, setSignUpState] = useRecoilState(RecoilSignUpState);

  const handleClickUserTypeButton = (type: UserType) => {
    if (signUpState.userType === type) {
      setSignUpState((prev) => ({ ...prev, userType: null }));
    } else {
      setSignUpState((prev) => ({ ...prev, userType: type }));
    }
  };

  return (
    <Wrapper>
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
            <UserTypeButton
              fullWidth
              hierarchy={ButtonHierarchy.DarkGray}
              className={signUpState.userType === 'client' ? 'active' : ''}
              onClick={() => handleClickUserTypeButton('client')}
            >
              <Line>
                <Typography type='h3' color={theme.palette.gray50} textAlign='left'>
                  고객으로 가입하기
                </Typography>
                <Icon type='people' />
              </Line>
            </UserTypeButton>
            <UserTypeButton
              fullWidth
              hierarchy={ButtonHierarchy.DarkGray}
              className={signUpState.userType === 'employee' ? 'active' : ''}
              onClick={() => handleClickUserTypeButton('employee')}
            >
              <Line>
                <Typography type='h3' color={theme.palette.gray50} textAlign='left'>
                  직원으로 가입하기
                </Typography>
                <Icon type='employee' />
              </Line>
            </UserTypeButton>
            <UserTypeButton
              fullWidth
              hierarchy={ButtonHierarchy.DarkGray}
              className={signUpState.userType === 'rider' ? 'active' : ''}
              onClick={() => handleClickUserTypeButton('rider')}
            >
              <Line>
                <Typography type='h3' color={theme.palette.gray50} textAlign='left'>
                  라이더로 가입하기
                </Typography>
                <Icon type='rider' />
              </Line>
            </UserTypeButton>
          </Lines>
          <Lines>
            <Button
              fullWidth
              style={{ padding: '12px' }}
              onClick={() => navigate('/signup-email')}
              disabled={signUpState.userType === null}
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

const Lines = styled.section`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Line = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 150px;
  margin: 64px auto;
  display: flex;
`;

const UserTypeButton = styled(Button)`
  padding: 20px;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: ${theme.palette.gray400};
  }

  &.active {
    background-color: ${theme.colors.primary.green};
  }
`;

export default SignUpSelectUserTypePage;
