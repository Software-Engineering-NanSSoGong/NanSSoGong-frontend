import styled from '@emotion/styled';
import { Food } from '../@types';
import { NumberInput, Typography } from './common';

interface Props {
  name: string;
  price: number;
  quantity: number;
  onChangeQuantity: (
    foodName: keyof Record<string, Food>,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onClickPlusIcon: (foodName: keyof Record<string, Food>) => void;
  onClickMinusIcon: (foodName: keyof Record<string, Food>) => void;
}

function FoodQuantityBox({
  name,
  price,
  quantity,
  onChangeQuantity,
  onClickPlusIcon,
  onClickMinusIcon,
}: Props) {
  return (
    <Wrapper className={quantity > 0 ? 'active' : ''}>
      <NameBox>
        <Typography type='body5' textAlign='center'>
          {name}
        </Typography>
        <Typography type='body5' textAlign='center'>
          (+ {price.toLocaleString()}원)
        </Typography>
      </NameBox>
      <NumberInput
        type='small'
        value={quantity}
        onChange={(e) => onChangeQuantity(name, e)}
        onClickPlusIcon={() => onClickPlusIcon(name)}
        onClickMinusIcon={() => onClickMinusIcon(name)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.gray300};
  border-radius: 16px;
  transition: all 0.1s ease-in;
  white-space: pre;

  &.active {
    background-color: ${({ theme }) => theme.colors.primary.blue};
  }
`;

const NameBox = styled.div`
  padding: 22px;
  box-sizing: border-box;
`;

export default FoodQuantityBox;
