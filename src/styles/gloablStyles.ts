import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import theme from './theme';

const globalStyle = css`
  ${emotionReset}

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    src: url('/fonts/Pretendard-Bold.woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    src: url('/fonts/Pretendard-SemiBold.woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    src: url('/fonts/Pretendard-Medium.woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    src: url('/fonts/Pretendard-Regular.woff');
  }

  body {
    width: 100%;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    background-color: ${theme.colors.background};
    color: ${theme.colors.text.general};

    font-family: Pretendard;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }
`;

export default globalStyle;
