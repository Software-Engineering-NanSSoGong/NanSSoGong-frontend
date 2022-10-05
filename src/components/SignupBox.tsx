import styled from '@emotion/styled';
import React from 'react';
import { theme } from '../styles';
import { Button, Typography } from './common';
import { ButtonHierarchy } from './common/Button';
import TitleWithLine from './TitleWithLine';

function SignupBox() {

    return (
    <Wrapper>
      <BoxLayout>
        <Title
          title='회원가입'
          titleFontType='h1'
          textAlign='center'
          borderColor={theme.palette.black}
        />
        <Lines>
            <Button fullWidth backgroundColor={theme.palette.green600} style = {{padding : '20px'}} 
            hierarchy = {ButtonHierarchy.Success}>
                <Typography type = 'h3' color ={theme.palette.gray50} textAlign ='left'>
                    고객으로 가입하기
                </Typography>
            </Button>
            <Button fullWidth backgroundColor={theme.palette.gray300} style = {{padding : '20px'} } 
            hierarchy = {ButtonHierarchy.DarkGray}>
                <Typography type = 'h3' color ={theme.palette.gray50} textAlign ='left'>
                    직원으로 가입하기
                </Typography>
            </Button>
            <Button fullWidth backgroundColor={theme.palette.gray300} style = {{padding : '20px'}} 
            hierarchy ={ButtonHierarchy.DarkGray}>
                <Typography type = 'h3' color ={theme.palette.gray50} textAlign ='left'>
                    라이더로 가입하기
                </Typography>
            </Button>
        </Lines>
        <Lines>
          <Button fullWidth backgroundColor={theme.palette.blue600} style={{ padding: '12px' }}>
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

const LogoImg = styled.img`
  width: 150px;
  margin: 64px auto;
  display: flex;
`;

export default SignupBox;
