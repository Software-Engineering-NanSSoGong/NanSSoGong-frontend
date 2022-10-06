import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { NumberInput, Typography } from './common';

interface Props {
  name: string;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

function FoodQuantityBox({ name, quantity, setQuantity }: Props) {
  return (
    <Wrapper className={quantity > 0 ? 'active' : ''}>
      <NameBox>
        <Typography type='body5' textAlign='center'>
          {name}
        </Typography>
        <Typography type='body5' textAlign='center'>
          (+ 5,000원)
        </Typography>
      </NameBox>
      <NumberInput
        type='small'
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        onClickPlusIcon={() => setQuantity((prev) => prev + 1)}
        onClickMinusIcon={() => setQuantity((prev) => (prev - 1 < 0 ? 0 : prev - 1))}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.gray300};
  border-radius: 16px;
  transition: all 0.1s ease-in;
  flex-basis: 170px;

  &.active {
    background-color: ${({ theme }) => theme.colors.primary.blue};
  }
`;

const NameBox = styled.div`
  padding: 22px;
  box-sizing: border-box;
`;

export default FoodQuantityBox;
