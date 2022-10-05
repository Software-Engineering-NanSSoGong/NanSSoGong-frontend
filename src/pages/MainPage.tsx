import styled from '@emotion/styled';
import ClickableDinnerCard from '../components/ClickableDinnerCard';
import SideMenuList from '../components/SideMenuList';
import TitleWithLine from '../components/TitleWithLine';
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
          <ClickableDinnerCard title={'프렌치 디너'} src={'/Dinner.png'} href={'/'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/history'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/main'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/main'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/main'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/main'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/main'} />
        </DinnerList>
      </Spacer>
    </Wrapper>
  );
}

const Wrapper = styled.main``;

const Spacer = styled.div`
  margin: 120px 104px 120px 424px;
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
