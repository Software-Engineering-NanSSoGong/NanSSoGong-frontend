import { colors, palette } from './colors';
import { fonts } from './fonts';
import { zIndex } from './zIndex';
import { size, padding } from './sizes';

const theme = {
  palette,
  colors,
  fonts,
  zIndex,
  size,
  padding
} as const;

export type Theme = typeof theme;

export default theme;
