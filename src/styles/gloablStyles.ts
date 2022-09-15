import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import theme from './theme';

const globalStyle = css`
  ${emotionReset}

  body {
    width: 100%;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    background-color: ${theme.colors.background};
    color: ${theme.colors.text.general};
  }

  #root {
    width: 100%;
    height: 100%;
  }

  button {
    border: none;
    outline: none;
    background: transparent;
  }
`;

export default globalStyle;