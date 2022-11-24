import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDebouncedEffect } from '../hooks';
import { theme } from '../styles';
import ClickableIcon from './ClickableIcon';
import { Typography } from './common';

interface Props {
  setValue: Dispatch<SetStateAction<string>>;
}

function ClickableSpeechIcon({ setValue }: Props) {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  useDebouncedEffect(
    () => {
      if (transcript.includes('샴페인') || transcript.includes('삼페인')) {
        setValue('샴페인축제디너');
      } else if (transcript.includes('트렌치') || transcript.includes('프렌치')) {
        setValue('프렌치디너');
      } else if (transcript.includes('발렌타인') || transcript.includes('벌렌타인')) {
        setValue('발렌타인디너');
      } else if (
        transcript.includes('잉글리시') ||
        transcript.includes('인글리시') ||
        transcript.includes('잉글리쉬') ||
        transcript.includes('인글리쉬')
      ) {
        setValue('잉글리시디너');
      } else {
        let nextTranscript = transcript;
        nextTranscript = nextTranscript.replace(/티노/g, '디너');
        nextTranscript = nextTranscript.replace(/티너/g, '디너');
        nextTranscript = nextTranscript.replace(/디노/g, '디너');
        nextTranscript = nextTranscript.replace(/기능/g, '디너');
        setValue(nextTranscript);
      }
    },
    [setValue, transcript],
    2000,
  );

  const handleClickSpeechIcon = useCallback(() => {
    if (listening) {
      SpeechRecognition?.stopListening();
      resetTranscript();
    } else {
      SpeechRecognition?.startListening({ continuous: true, language: 'ko' });
    }
  }, [listening, resetTranscript]);

  if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
    return <span>Browser doesn`t support speech recognition.</span>;
  }

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
