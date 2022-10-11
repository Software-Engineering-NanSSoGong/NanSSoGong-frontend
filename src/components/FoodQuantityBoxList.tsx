import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Food } from '../@types';
import FoodQuantityBox from './FoodQuantityBox';
import TitleWithLine from './TitleWithLine';

interface Props {
  foods: Food[];
  title: string;
  setFoodState: Dispatch<SetStateAction<Record<string, Food>>>;
}

function FoodQuantityBoxList({ foods, title, setFoodState }: Props) {
  const handleClickFoodPlusIcon = (foodName: keyof Record<string, Food>) => {
    setFoodState((prev) => ({
      ...prev,
      [foodName]: { ...prev[foodName], quantity: Number(prev[foodName].quantity) + 1 },
    }));
  };

  const handleChangeFoodNumberInput = (
    foodName: keyof Record<string, Food>,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFoodState((prev) => ({
      ...prev,
      [foodName]: { ...prev[foodName], quantity: Number(e.target.value) },
    }));
  };

  const handleClickFoodMinusIcon = (foodName: keyof Record<string, Food>) => {
    setFoodState((prev) => ({
      ...prev,
      [foodName]: { ...prev[foodName], quantity: Number(prev[foodName].quantity) - 1 },
    }));
  };

  return (
    <Wrapper>
      <TitleWithLine title={title} titleFontType='h3' style={{ marginBottom: 24, marginTop: 80 }} />
      <List>
        {foods.map((item) => (
          <FoodQuantityBox
            key={item.name}
            name={item.name}
            price={item.price}
            quantity={Number(item.quantity)}
            onChangeQuantity={handleChangeFoodNumberInput}
            onClickPlusIcon={handleClickFoodPlusIcon}
            onClickMinusIcon={handleClickFoodMinusIcon}
          />
        ))}
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.section``;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
`;

export default FoodQuantityBoxList;
