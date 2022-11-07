import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { theme } from '../../styles';
import { Typography } from '../common';
import { ButtonHierarchy } from '../common/Button';
import ModalTriggerButton from './ModalTriggerButton';

interface Props {
  cancelMsg?: string;
  confirmMsg?: string;
  onClickCancel?: () => void;
  onClickConfirm?: () => void;
}

function AskModal({
  cancelMsg = '취소',
  confirmMsg = '확인',
  children,
  onClickCancel,
  onClickConfirm,
}: PropsWithChildren<Props>) {
  return (
    <Wrapper>
      <Spacer>{children}</Spacer>
      <ModalBottomButtonSection>
        <ModalTriggerBottomButton
          modalType='close'
          onClick={onClickCancel}
          buttonProps={{ hierarchy: ButtonHierarchy.Danger }}
          style={{ borderRight: `1px solid ${theme.palette.gray300}`, borderRadius: '0 0 0 16px' }}
        >
          <Typography type='body4' textAlign='center'>
            {cancelMsg}
          </Typography>
        </ModalTriggerBottomButton>
        <ModalTriggerBottomButton
          modalType='close'
          onClick={onClickConfirm}
          buttonProps={{ hierarchy: ButtonHierarchy.Success }}
          style={{ borderRadius: '0 0 16px 0' }}
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

const Spacer = styled.section`
  padding-bottom: 80px;
`;

const ModalBottomButtonSection = styled.section`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const ModalTriggerBottomButton = styled(ModalTriggerButton)`
  width: 50%;
  box-sizing: border-box;
  padding: 16px;
`;

export default AskModal;