import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import useDetectModalKeyPress from '../../hooks/useDetectModalKeyPress';
import { Typography } from '../common';
import { ButtonHierarchy } from '../common/Button';
import ModalTriggerButton from './ModalTriggerButton';

interface Props {
  confirmMsg?: string;
  onClickConfirm?: () => void;
}

function ConfirmModal({ confirmMsg = '확인', children, onClickConfirm }: PropsWithChildren<Props>) {
  useDetectModalKeyPress({ onClickConfirm });

  return (
    <Wrapper>
      <Spacer>{children}</Spacer>
      <ModalBottomButtonSection>
        <ModalTriggerBottomButton
          modalType='close'
          onClick={onClickConfirm}
          buttonProps={{ hierarchy: ButtonHierarchy.Success }}
          style={{ borderRadius: '0 0 16px 16px' }}
        >
          <Typography type='body4' textAlign='center'>
            {confirmMsg}
          </Typography>
        </ModalTriggerBottomButton>
      </ModalBottomButtonSection>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  position: relative;
`;

const ModalBottomButtonSection = styled.section`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const ModalTriggerBottomButton = styled(ModalTriggerButton)`
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
`;

const Spacer = styled.section`
  padding-bottom: 80px;
`;

export default ConfirmModal;
