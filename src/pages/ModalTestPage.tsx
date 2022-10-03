import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Modal } from '../components/modal';
function ModalTestPage() {
  return (
    <Layout>
      <Modal
        triggerNode={
          <Modal.triggerButton modalType='open' onClick={() => console.log('모달 열기')}>
            <div style={{ width: 500, height: 500, backgroundColor: '#fff' }}>모달 열기</div>
          </Modal.triggerButton>
        }
        modalNode={
          <ModalBody>
            <ModalSpacer>
              모달 내용
              <ModalCloseButton modalType='close' onClick={() => console.log('모달 닫기')}>
                닫기 버튼
              </ModalCloseButton>
            </ModalSpacer>
          </ModalBody>
        }
      />
    </Layout>
  );
}

const Layout = styled.main`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.background};

    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

const ModalBody = styled.div`
  width: 500px;
  height: 500px;
`;

const ModalSpacer = styled.div`
  height: 100%;
  margin: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalCloseButton = styled(Modal.triggerButton)`
  width: 100%;
`;

export default ModalTestPage;
