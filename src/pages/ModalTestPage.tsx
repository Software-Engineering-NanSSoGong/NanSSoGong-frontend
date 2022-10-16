import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BottomButton, Modal } from '../components';

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
            <div style={{ backgroundColor: '#fff' }}>모달 열기</div>
          </Modal.triggerButton>
        }
        modalNode={
          <ModalBody>
            <ModalSpacer style={{ position: 'relative' }}>
              모달 내용
              <Modal.triggerButton
                modalType='close'
                onClick={() => console.log('모달 닫기')}
                style={{
                  borderRadius: '0 0 16px 16px',
                }}
                as={BottomButton}
              >
                닫기 버튼
              </Modal.triggerButton>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default ModalTestPage;
