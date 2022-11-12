import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { History } from '../@types';
import { OrderService } from '../api';
import { ClickableHistoryOrderCard, SideMenuList, Typography } from '../components';
import { theme } from '../styles';

function ClientHistoryOrderPage() {
  const [histories, setHistories] = useState<History[]>([]);

  useEffect(() => {
    // client History
    (async () => {
      const res = await OrderService.getClientHistory({ page: 0, size: 200 });
      setHistories(res.content);
    })();
  }, []);

  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        <Typography type='h1' color={theme.colors.text.bold} style={{ marginBottom: 40 }}>
          주문 내역
        </Typography>
        <CardList>
          {histories?.length > 0 ? (
            histories.map((history) => (
              <ClickableHistoryOrderCard
                key={history.orderId}
                orderId={history.orderId}
                orderStatus={history.orderStatus}
                orderSheetResponseList={history.orderSheetResponseList}
                date={history.orderTime}
                address={`${history.address.city} ${history.address.street} ${history.address.zipcode}`}
              />
            ))
          ) : (
            <Typography type='h3' color={theme.colors.primary.red} textAlign='center'>
              주문 내역이 없습니다.
            </Typography>
          )}
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
  gap: 40px;

  section:nth-last-of-type(1) {
    margin-bottom: 80px;
  }
`;

export default ClientHistoryOrderPage;
