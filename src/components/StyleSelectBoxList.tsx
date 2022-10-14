import styled from '@emotion/styled';
import { Style } from '../@types';
import { theme } from '../styles';
import { Button, Typography } from './common';

interface Props {
  styleList: Style[];
  selectedStyle: Style | null;
  handleClickStyle?: (s: Style) => void;
  disabled?: boolean;
}

function StyleSelectBoxList({
  styleList,
  selectedStyle,
  disabled = false,
  handleClickStyle,
}: Props) {
  return (
    <Wrapper>
      {styleList?.map((style) => (
        <ItemStyle
          className={selectedStyle === style ? 'active' : ''}
          key={style.name}
          onClick={() => handleClickStyle?.(style)}
          disabled={disabled}
        >
          <Typography textAlign='center' type='h5' color={theme.palette.gray50}>
            {style.name}
          </Typography>
          <Typography textAlign='center' type='h5' color={theme.palette.gray50}>
            (+{style.price.toLocaleString()}원)
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
  }
`;

export default StyleSelectBoxList;
