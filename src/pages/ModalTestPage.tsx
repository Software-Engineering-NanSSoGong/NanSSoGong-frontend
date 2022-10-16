import styled from '@emotion/styled';
import { BottomButton, Modal, Typography } from '../components';
import { theme } from '../styles';

function ModalTestPage() {
  return (
    <Layout>
      <Modal
        triggerNode={
          <Modal.triggerButton
            modalType='open'
            onClick={() => console.log('모달 열기')}
            as={BottomButton}
          >
            <div>모달 열기</div>
          </Modal.triggerButton>
        }
        modalNode={
          <Modal.askModal>
            <ModalBody>
              <Typography type='h3' color={theme.colors.text.dark} textAlign='center'>
                모달 정보
              </Typography>
              <Typography type='body4' color={theme.colors.text.dark} style={{ marginTop: 32 }}>
                정말로 구매하시겠습니까?
              </Typography>
            </ModalBody>
          </Modal.askModal>
        }
      />
      <Modal
        triggerNode={
          <Modal.triggerButton
            modalType='open'
            onClick={() => console.log('모달 열기')}
            as={BottomButton}
          >
            <div>모달 열기</div>
          </Modal.triggerButton>
        }
        modalNode={
          <Modal.askModal>
            <ModalBody>
              <Typography type='h3' color={theme.colors.text.dark} textAlign='center'>
                모달 정보
              </Typography>
              <Typography type='body4' color={theme.colors.text.dark} style={{ marginTop: 32 }}>
                정말로 구매하시겠습니까?
              </Typography>
            </ModalBody>
          </Modal.askModal>
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

const ModalBody = styled.div`
  width: 500px;
  height: 500px;
  padding: 16px;
  box-sizing: border-box;
`;

export default ModalTestPage;
