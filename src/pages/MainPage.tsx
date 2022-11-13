import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dinner } from '../@types';
import { DinnerService } from '../api';
import { ClickableDinnerCard, PageNavigation, SideMenuList, TitleWithLine } from '../components';
import usePagination from '../hooks/usePagination';
import { theme } from '../styles';

function MainPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [dinnerList, setDinnerList] = useState<Dinner[]>([]);
  const [searchParams] = useSearchParams();
  const topContainer = useRef<HTMLDivElement>(null);
  const page = searchParams.get('page') || 0;
  const size = searchParams.get('size') || 10;
  const { pageOptions, handleChangePage } = usePagination({
    totalCount,
  });

  useEffect(() => {
    // 디너 정보 페이지별로 가져오기
    (async () => {
      setIsLoading(true);
      const res = await DinnerService.getDinnerList({ page: Number(page) - 1, size: Number(size) });
      setTotalCount(res.totalElements);
      setDinnerList(res.content);
      setIsLoading(false);
    })();
  }, [page, size]);

  useEffect(() => {
    // 디너 정보가 바뀌면 스크롤은 최상단
    topContainer.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [dinnerList]);

  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        {isLoading ? (
          <LoadingContainer>
            <LoadingGIF src='/loading.gif' alt='loading-component' />
          </LoadingContainer>
        ) : (
          <>
            <div ref={topContainer} />
            <TitleWithLine
              type='icon'
              title='메뉴'
              titleFontType='h1'
              titleColor={theme.colors.text.bold}
              borderColor={theme.palette.gray50}
            />
            <DinnerList>
              {dinnerList?.map((dinner) => (
                <ClickableDinnerCard
                  key={dinner.dinnerId}
                  title={dinner.dinnerName}
                  src={dinner.dinnerImage || '/Dinner.png'}
                  href={`/item/${dinner.dinnerId}`}
                />
              ))}
            </DinnerList>
            <PageNavigation pageOptions={pageOptions} handleChangePage={handleChangePage} />
          </>
        )}
      </Spacer>
    </Wrapper>
  );
}

const Wrapper = styled.main``;

const Spacer = styled.div`
  padding: 120px 104px 120px 424px;
`;

const DinnerList = styled.section`
  width: 100%;
  height: 100%;
  margin-block: 72px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  gap: 80px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const LoadingGIF = styled.img`
  max-width: 50%;
  height: 100%;
`;

export default MainPage;
