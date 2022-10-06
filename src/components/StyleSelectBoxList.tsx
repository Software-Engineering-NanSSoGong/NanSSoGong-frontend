import styled from '@emotion/styled';
import { theme } from '../styles';
import { Typography } from './common';

interface Props {
  styleList: string[];
  selectedStyle: string | null;
  handleClickStyle: (s: string) => void;
}

function StyleSelectBoxList({ styleList, selectedStyle, handleClickStyle }: Props) {
  return (
    <Wrapper>
      {styleList.map((style) => (
        <ItemStyle
          className={selectedStyle === style ? 'active' : ''}
          key={style}
          onClick={() => handleClickStyle(style)}
        >
          <Typography textAlign='center' type='h5' color={theme.palette.gray50}>
            {style}
          </Typography>
          <Typography textAlign='center' type='h5' color={theme.palette.gray50}>
            (+0원)
          </Typography>
        </ItemStyle>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ItemStyle = styled.div`
  background-color: ${theme.palette.gray300};
  padding: 12px;
  border-radius: 8px;
  flex-basis: 140px;
  cursor: pointer;
  transition: all 0.2s linear;

  &.active {
    background-color: ${theme.colors.primary.green};
  }

  &:not(.active):hover {
    background-color: ${theme.palette.gray400};
  }
`;

export default StyleSelectBoxList;
