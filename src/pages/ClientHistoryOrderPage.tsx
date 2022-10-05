import styled from '@emotion/styled';
import { Typography } from '../components';
import HistoryOrderCard from '../components/HistoryOrderCard';
import SideMenuList from '../components/SideMenuList';
import { theme } from '../styles';

const tempHistory = {
  address: '서울특별시 동대문구 서울시립대로 163, 기숙사',
  plusFoods: ['감자', '시럽', '야채'],
  minusFoods: ['감자'],
  dinnerSets: ['프렌치 디너 서비스'],
  date: '2022. 09. 09',
};

function ClientHistoryOrderPage() {
  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        <Typography type='h1' color={theme.colors.text.bold} style={{ marginBottom: 40 }}>
          주문 내역
        </Typography>
        <CardList>
          <HistoryOrderCard
            userType='client'
            orderStatus='주문 수정'
            dinnerSets={tempHistory.dinnerSets}
            plusFoods={tempHistory.plusFoods}
            minusFoods={tempHistory.minusFoods}
            date={tempHistory.date}
            address={tempHistory.address}
          />
          <HistoryOrderCard
            userType='client'
            orderStatus='주문 완료'
            dinnerSets={tempHistory.dinnerSets}
            plusFoods={tempHistory.plusFoods}
            minusFoods={tempHistory.minusFoods}
            date={tempHistory.date}
            address={tempHistory.address}
          />
          <HistoryOrderCard
            userType='client'
            orderStatus='배달 중'
            dinnerSets={tempHistory.dinnerSets}
            plusFoods={tempHistory.plusFoods}
            minusFoods={tempHistory.minusFoods}
            date={tempHistory.date}
            address={tempHistory.address}
          />
          <HistoryOrderCard
            userType='client'
            orderStatus='배달 완료'
            dinnerSets={tempHistory.dinnerSets}
            plusFoods={tempHistory.plusFoods}
            minusFoods={tempHistory.minusFoods}
            date={tempHistory.date}
            address={tempHistory.address}
          />
        </CardList>
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

const CardList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 80px;

  section:nth-last-child(1) {
    margin-bottom: 80px;
  }
`;

export default ClientHistoryOrderPage;
