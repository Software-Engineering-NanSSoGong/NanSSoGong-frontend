import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconInputLine, TitleWithLine, Typography } from '../components';
import { ButtonHierarchy } from '../components/common/Button';
import { theme } from '../styles';

function ProfilePage() {
  const navigate = useNavigate();
  const [name, setName] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const [accept, setAccept] = React.useState<boolean>(false);

  return (
    <Wrapper>
      <SignupBoxLayout>
        <BoxLayout>
          <Title
            title='내 정보 수정'
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
              주소
            </Typography>
            <IconInputLine
              icon='lock'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Typography type='h5' color={theme.palette.gray400} textAlign='left'>
              개인정보 이용 동의
            </Typography>
            <AcceptButton
              fullWidth
              style={{ padding: '12px' }  }
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
              onClick={() => navigate('/main')}
              disabled={name === '' || address === ''}
            >
              <Typography type='h4' color={theme.palette.gray50} textAlign='center'>
                수정하기
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

export default ProfilePage;