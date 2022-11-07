import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Food, FoodWithQuantity } from '../@types';
import FoodQuantityBox from './FoodQuantityBox';
import TitleWithLine from './TitleWithLine';

interface Props {
  foods: FoodWithQuantity[];
  title: string;
  setFoodState: Dispatch<SetStateAction<Record<string, FoodWithQuantity>>>;
}

function FoodQuantityBoxList({ foods, title, setFoodState }: Props) {
  const handleClickFoodPlusIcon = (foodName: keyof Record<string, FoodWithQuantity>) => {
    setFoodState((prev) => ({
      ...prev,
      [foodName]: { ...prev[foodName], foodQuantity: Number(prev[foodName].foodQuantity) + 1 },
    }));
  };

  const handleChangeFoodNumberInput = (
    foodName: keyof Record<string, Food>,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFoodState((prev) => ({
      ...prev,
      [foodName]: { ...prev[foodName], foodQuantity: Number(e.target.value) },
    }));
  };

  const handleClickFoodMinusIcon = (foodName: keyof Record<string, Food>) => {
    setFoodState((prev) => ({
      ...prev,
      [foodName]: { ...prev[foodName], foodQuantity: Number(prev[foodName].foodQuantity) - 1 },
    }));
  };

  return (
    <Wrapper>
      <TitleWithLine title={title} titleFontType='h3' style={{ marginBottom: 24, marginTop: 80 }} />
      <List>
        {foods.map((item) => (
          <FoodQuantityBox
            key={item.foodName}
            name={item.foodName}
            price={item.foodSellPrice}
            quantity={Number(item.foodQuantity)}
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
