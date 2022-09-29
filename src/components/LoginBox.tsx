import styled from '@emotion/styled';
import { theme } from '../styles';
import { Button, Typography } from './common';
import IconInputLine from './IconInputLine';
import TitleWithLine from './TitleWithLine';

function LoginBox() {
  return (
    <Wrapper>
      <BoxLayout>
        <Title
          title='로그인'
          titleFontType='h1'
          textAlign='center'
          borderColor={theme.palette.black}
        />
        <Lines>
          <IconInputLine icon='user' />
          <IconInputLine icon='lock' type='password' />
        </Lines>
        <Lines>
          <Button
            fullWidth
            backgroundColor={theme.palette.blue600}
            style={{ padding: '12px' }}
          >
            <Typography
              type='h4'
              color={theme.palette.gray50}
              textAlign='center'
            >
              로그인
            </Typography>
          </Button>
          <Button
            fullWidth
            backgroundColor={theme.palette.gray300}
            style={{ padding: '12px' }}
          >
            <Typography
              type='h4'
              color={theme.palette.gray50}
              textAlign='center'
            >
              비회원으로 주문하기
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

const LogoImg = styled.img`
  width: 150px;
  margin: 64px auto;
  display: flex;
`;

export default LoginBox;
