import styled from '@emotion/styled';
import { useState } from 'react';
import { theme } from '../styles';
import { User } from '../@types';
import { Button, Icon, Typography } from './common';
import { ButtonHierarchy } from './common/Button';
import TitleWithLine from './TitleWithLine';

function SignupBox() {
  const [userType, setUserType] = useState<User | null>(null);

  const handleClickUserTypeButton = (type: User) => {
    setUserType(type);
  };

  return (
    <Wrapper>
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
            className={userType === 'client' ? 'active' : ''}
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
            className={userType === 'employee' ? 'active' : ''}
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
            className={userType === 'rider' ? 'active' : ''}
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
          <Button fullWidth style={{ padding: '12px' }}>
            <Typography type='h4' color={theme.palette.gray50} textAlign='center'>
              계속하기
            </Typography>
          </Button>
        </Lines>
        <LogoImg src='/logo.png' alt='mr-daebak logo' />
      </BoxLayout>
    </Wrapper>
  );
}

const Wrapper = styled.section`
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

export default SignupBox;
