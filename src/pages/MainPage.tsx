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
          titleColor={theme.colors.primary.white}
          borderColor={theme.palette.gray50}
        />
        <DinnerList>
          <ClickableDinnerCard title={'프렌치 디너'} src={'/Dinner.png'} href={'/'} />
          <ClickableDinnerCard title={'잉글리시 디너'} src={'/Dinner.png'} href={'/main'} />
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

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Spacer = styled.div`
  margin-left: 404px;
  margin-right: 104px;
  margin-block: 120px;
`;

const DinnerList = styled.section`
  width: 100%;
  height: 100%;
  margin-block: 72px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  gap: 88px;
`;

export default MainPage;
