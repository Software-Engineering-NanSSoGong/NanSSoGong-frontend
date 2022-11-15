import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import useDetectModalKeyPress from '../../hooks/useDetectModalKeyPress';
import { theme } from '../../styles';
import { Typography } from '../common';
import { ButtonHierarchy } from '../common/Button';
import ModalTriggerButton from './ModalTriggerButton';

interface Props {
  cancelMsg?: string;
  disproveMsg?: string;
  confirmMsg?: string;
  onClickCancel?: () => void;
  onClickDisprove?: () => void;
  onClickConfirm?: () => void;
}

function Choice3Modal({
  cancelMsg = '닫기',
  disproveMsg = '취소',
  confirmMsg = '확인',
  children,
  onClickCancel,
  onClickDisprove,
  onClickConfirm,
}: PropsWithChildren<Props>) {
  useDetectModalKeyPress({ onClickConfirm });

  return (
    <Wrapper>
      <Spacer>{children}</Spacer>
      <ModalBottomButtonSection>
        <ModalTriggerBottomButton
          modalType='close'
          onClick={onClickCancel}
          buttonProps={{ hierarchy: ButtonHierarchy.Warning }}
          style={{ borderRight: `1px solid ${theme.palette.gray300}`, borderRadius: '0 0 0 16px' }}
        >
          <Typography type='body4' textAlign='center'>
            {cancelMsg}
          </Typography>
        </ModalTriggerBottomButton>
        <ModalTriggerBottomButton
          modalType='close'
          onClick={onClickDisprove}
          buttonProps={{ hierarchy: ButtonHierarchy.Danger }}
          style={{ borderRight: `1px solid ${theme.palette.gray300}`, borderRadius: '0 0 0 0' }}
        >
          <Typography type='body4' textAlign='center'>
            {disproveMsg}
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
  width: 33.33%;
  box-sizing: border-box;
  padding: 16px;
`;

export default Choice3Modal;
