import '@emotion/react';
import type { Theme as ThemeModel } from '../styles/theme';

declare module '@emotion/react' {
  export interface Theme extends ThemeModel {}
}
