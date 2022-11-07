import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DinnerService } from '../api';
import { ClickableDinnerCard, PageNavigation, SideMenuList, TitleWithLine } from '../components';
import usePagination from '../hooks/usePagination';
import { theme } from '../styles';

function MainPage() {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '10';
  const { pageOptions, handleChangePage } = usePagination({
    totalCount,
  });

  useEffect(() => {
    (async () => {
      const res = await DinnerService.getDinnerList({ page, size });
      console.log(res);
      setTotalCount(res.totalElements);
    })();
  }, [page, size]);

  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        <TitleWithLine
          type='icon'
          title='메뉴'
          titleFontType='h1'
          titleColor={theme.colors.text.bold}
          borderColor={theme.palette.gray50}
        />
        <DinnerList>
          <ClickableDinnerCard title={'프렌치 디너'} src={'/Dinner.png'} href={'/item/1'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/item/1'} />
          <ClickableDinnerCard title={'발렌타인 디너'} src={'/Dinner.png'} href={'/item/1'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/item/1'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/item/1'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/item/1'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/item/1'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/item/1'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/item/1'} />
        </DinnerList>
        <PageNavigation pageOptions={pageOptions} handleChangePage={handleChangePage} />
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

export default MainPage;
