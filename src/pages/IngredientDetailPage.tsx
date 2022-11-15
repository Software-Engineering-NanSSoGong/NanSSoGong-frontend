import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ingredient } from '../@types';
import { IngredientService } from '../api';
import { useNavigate } from 'react-router-dom';
import { Button, SideMenuListWithEmployee, Typography } from '../components';
import { ButtonHierarchy } from '../components/common/Button';
import { theme } from '../styles';

function IngredientDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const handleClickChangeQuantityButton = async () => {
    try {
      await IngredientService.changeIngredientQuantity({
        id: Number(params.id),
        quantityDiff: quantity - Number(ingredient?.stockQuantity),
      });
      alert('수량 변경이 완료되었습니다.');
      navigate('/manage-ingredient');
    } catch (err) {
      alert('수량이 음수가 될 수 없습니다.');
    }
  };

  const handleClickDisableOnlyIngredientButton = async () => {
    try {
      await IngredientService.disableOnlyIngredient({
        id: Number(params.id),
      });
      alert('수량 변경이 완료되었습니다.');
      navigate('/manage-ingredient');
    } catch (err) {
      alert('disable하려는 entity를 참조하고 있는 다른 entity가 존재합니다');
    }
  };

  const handleClickDisableCascadeButton = async () => {
    try {
      await IngredientService.disableCascadeIngredient({
        id: Number(params.id),
      });
      alert('해당 재료와 관련된 음식까지 비활성화 되었습니다..');
      navigate('/manage-ingredient');
    } catch (err) {
      alert('다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    (async () => {
      const res = await IngredientService.getIngredientInfo({ id: Number(params.id) });
      setIngredient(res);
      setQuantity(res.stockQuantity);
    })();
  }, [params.id]);

  return (
    <Wrapper>
      <SideMenuListWithEmployee />
      <Spacer>
        <Typography type='h1' color={theme.colors.text.bold} style={{ marginBottom: 40 }}>
          재료 관리
        </Typography>
        <ItemBox>
          <Typography type='h3'>{ingredient?.ingredientName}</Typography>
          <Typography type='h3'>현재 수량: {ingredient?.stockQuantity}</Typography>
        </ItemBox>
        <ItemBox>
          <Typography type='h3'>연관된 음식</Typography>
          <FoodList>
            {ingredient?.ingredientRecipeInfoList.map((food) => (
              <Typography key={food.foodId} type='body4'>
                {food.foodName}({food.ingredientQuantity} 개 필요)
              </Typography>
            ))}
          </FoodList>
        </ItemBox>
        <ItemBox>
          <Typography type='h3'>원하는 수량</Typography>
          <Input
            type='number'
            pattern='\d*'
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </ItemBox>
        <Button
          style={{
            width: '80%',
            margin: '0 auto',
            padding: 16,
          }}
          hierarchy={ButtonHierarchy.Primary}
          onClick={handleClickChangeQuantityButton}
        >
          <Typography type='h3' textAlign={'center'}>
            수량 변경 하기
          </Typography>
        </Button>
        <Button
          style={{
            width: '80%',
            margin: '0 auto',
            padding: 16,
          }}
          hierarchy={ButtonHierarchy.Danger}
          onClick={handleClickDisableOnlyIngredientButton}
        >
          <Typography type='h3' textAlign={'center'}>
            해당 재료만 비활성화
          </Typography>
        </Button>
        <Button
          style={{
            width: '80%',
            margin: '0 auto',
            padding: 16,
          }}
          hierarchy={ButtonHierarchy.Danger}
          onClick={handleClickDisableCascadeButton}
        >
          <Typography type='h3' textAlign={'center'}>
            연쇄 비활성화
          </Typography>
        </Button>
      </Spacer>
    </Wrapper>
  );
}

const Wrapper = styled.main``;

const Spacer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding: 120px 104px 120px 424px;
`;

const ItemBox = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  background-color: ${theme.palette.gray300};
  padding: 32px;
  border-radius: 16px;
`;

const Input = styled.input`
  width: 50%;
  border: none;
  border-radius: 10px;
  height: 50px;
  text-align: center;
  background-color: ${theme.palette.white};
  padding-left: 16px;
  color: ${theme.palette.black};
  font-size: 16px;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: ${theme.palette.gray100};
  }
`;

const FoodList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default IngredientDetailPage;
