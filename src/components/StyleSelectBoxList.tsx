import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { Dinner, Style } from '../@types';
import { styleState } from '../stores/Style';
import { theme } from '../styles';
import { Button, Typography } from './common';

interface Props {
  excludedStyleList: Dinner['excludedStyleInfoResponseList'];
  selectedStyle: Style | null;
  handleClickStyle?: (s: Style) => void;
  disabled?: boolean;
}

function StyleSelectBoxList({
  excludedStyleList,
  selectedStyle,
  disabled = false,
  handleClickStyle,
}: Props) {
  const styleList = useRecoilValue(styleState);
  const filterdStyleList = styleList.filter(
    (style) =>
      excludedStyleList?.findIndex(
        (excludedStyle) => excludedStyle.excludedStyleId === style.styleId,
      ) === -1,
  );

  return (
    <Wrapper>
      {filterdStyleList?.slice(0, 3).map((style) => (
        <ItemStyle
          className={selectedStyle?.styleName === style.styleName ? 'active' : ''}
          key={style.styleName}
          onClick={() => handleClickStyle?.(style)}
          disabled={disabled}
        >
          <Typography textAlign='center' type='h5' color={theme.palette.gray50}>
            {style.styleName}
          </Typography>
          <Typography textAlign='center' type='h5' color={theme.palette.gray50}>
            (+{style.styleSellPrice?.toLocaleString()}원)
          </Typography>
        </ItemStyle>
      ))}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'disabled'>;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const ItemStyle = styled(Button)<StyleProps>`
  background-color: ${theme.palette.gray300};
  padding: 12px;
  border-radius: 8px;
  flex-basis: 140px;
  cursor: pointer;
  transition: all 0.1s linear;
  white-space: pre;

  &.active {
    background-color: ${theme.colors.primary.green};
  }

  &:not(.active):hover {
    background-color: ${({ disabled }) =>
      disabled ? theme.palette.gray200 : theme.palette.gray400};
  }

  &:disabled {
    transition: none;
    cursor: default;
  }
`;

export default StyleSelectBoxList;
