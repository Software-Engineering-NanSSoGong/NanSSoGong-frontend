import styled from '@emotion/styled';
import { ClickableDinnerCard, SideMenuList, TitleWithLine } from '../components';
import { theme } from '../styles';

function MainPage() {
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
