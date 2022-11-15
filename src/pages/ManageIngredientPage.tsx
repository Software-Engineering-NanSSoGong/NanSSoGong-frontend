import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Ingredient } from '../@types';
import { IngredientService } from '../api';
import { IngredientBox, PageNavigation, SideMenuListWithEmployee, Typography } from '../components';
import usePagination from '../hooks/usePagination';
import { theme } from '../styles';

function ManageIngredientPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const topContainer = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const page = searchParams.get('page') || 0;
  const size = searchParams.get('size') || 10;
  const { pageOptions, handleChangePage } = usePagination({
    totalCount,
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await IngredientService.getList({ page: Number(page) - 1, size: Number(size) });
      setTotalCount(res.totalElements);
      setIngredientList(res.content);
      setIsLoading(false);
    })();
  }, [page, size]);

  useEffect(() => {
    // 재료 정보가 바뀌면 스크롤은 최상단
    topContainer.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [ingredientList]);

  return (
    <Wrapper>
      <SideMenuListWithEmployee />
      <Spacer>
        <Typography type='h1' color={theme.colors.text.bold} style={{ marginBottom: 40 }}>
          재료 수량 관리
        </Typography>
        {isLoading ? (
          <LoadingContainer>
            <LoadingGIF src='/loading.gif' alt='loading-component' />
          </LoadingContainer>
        ) : (
          <>
            <div ref={topContainer} />
            <IngredientList>
              {ingredientList.map((ingredient) => (
                <IngredientBox
                  key={ingredient.ingredientId}
                  name={ingredient.ingredientName}
                  onClick={() => navigate(`/ingredient/${ingredient.ingredientId}`)}
                />
              ))}
            </IngredientList>
            <PageNavigation pageOptions={pageOptions} handleChangePage={handleChangePage} />
          </>
        )}
      </Spacer>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
`;

const Spacer = styled.div`
  margin: 80px 120px 0 420px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const LoadingGIF = styled.img`
  width: 100%;
  height: 100%;
`;

const IngredientList = styled.section`
  width: 100%;
  height: 100%;
  margin-block: 72px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: space-between;
  gap: 80px;
`;

export default ManageIngredientPage;
