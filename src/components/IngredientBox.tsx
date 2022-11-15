import styled from '@emotion/styled';
import { Typography } from './common';

interface Props {
  name: string;
  onClick: () => void;
}

function FoodQuantityBox({ name, onClick }: Props) {
  return (
    <Wrapper onClick={onClick}>
      <NameBox>
        <Typography type='body5' textAlign='center'>
          {name}
        </Typography>
      </NameBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.green500};
  border-radius: 16px;
  transition: all 0.1s ease-in;
  cursor: pointer;

  &:hover {
    scale: 1.05;
  }
`;

const NameBox = styled.div`
  padding: 22px;
  box-sizing: border-box;
`;

export default FoodQuantityBox;
