import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { theme } from '../styles';
import ClickableIcon from './ClickableIcon';
import { Typography } from './common';

interface Props {
  setValue: Dispatch<SetStateAction<string>>;
}

function ClickableSpeechIcon({ setValue }: Props) {
  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn`t support speech recognition.</span>;
  }

  const handleClickSpeechIcon = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setValue(transcript);
      resetTranscript();
    } else {
      SpeechRecognition.startListening({ continuous: true, language: 'ko' });
    }
  };

  return (
    <Wrapper>
      <ClickableIcon iconProps={{ type: 'mic' }} onClick={handleClickSpeechIcon} />
      {listening && (
        <StatusList type='body3' color={theme.colors.primary.red}>
          음성 인식 중...
        </StatusList>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const StatusList = styled(Typography)`
  position: absolute;
  top: -120px;
  right: -350px;
  min-width: 500px;
`;

export default ClickableSpeechIcon;
