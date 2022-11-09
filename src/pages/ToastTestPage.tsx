import styled from '@emotion/styled';
import { BottomButton, Toast, Typography } from '../components';
import { theme } from '../styles';

function ToastTestPage() {
  return (
    <Layout>
      <Toast
        left={'50%'}
        bottom={`20px`}
        duration={1500}
        triggerNode={
          <Toast.triggerButton toastType='show' onClick={() => console.log('hi')} as={BottomButton}>
            토스트 열기
          </Toast.triggerButton>
        }
        toastNode={
          <ToastBody>
            <Typography
              type='h3'
              color={theme.colors.text.dark}
              textAlign='center'
              style={{ width: '100%' }}
            >
              토스트 정보
            </Typography>
          </ToastBody>
        }
      />
    </Layout>
  );
}

const Layout = styled.main`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.background};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToastBody = styled.div`
  width: 100%;
  height: 80px;
  padding: 16px;
  box-sizing: border-box;
`;

export default ToastTestPage;
