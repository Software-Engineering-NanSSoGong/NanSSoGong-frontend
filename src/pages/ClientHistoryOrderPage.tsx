import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { History } from '../@types';
import { OrderService } from '../api';
import { ClickableHistoryOrderCard, SideMenuList, Typography } from '../components';
import { userState } from '../stores';
import { theme } from '../styles';

function ClientHistoryOrderPage() {
  const me = useRecoilValue(userState);
  const [histories, setHistories] = useState<History[]>([]);

  useEffect(() => {
    // client History
    (async () => {
      if (me.memberType === 'guest' && me.uuid) {
        const res = await OrderService.getGuestHistory({ id: me.uuid });
        if (res?.hasOwnProperty('orderId')) {
          setHistories([res]);
        }
      } else if (me.memberType === 'loginClient') {
        const res = await OrderService.getClientHistory({ page: 0, size: 200 });
        setHistories(res.content);
      }
    })();
  }, [me.memberType, me.uuid]);

  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        <Typography type='h1' color={theme.colors.text.bold} style={{ marginBottom: 40 }}>
          주문 내역
        </Typography>
        <CardList>
          {histories?.length > 0 ? (
            histories.map((history, idx) => (
              <ClickableHistoryOrderCard
                key={idx}
                orderId={history.orderId}
                orderStatus={history.orderStatus}
                orderSheetResponseList={history.orderSheetResponseList}
                date={history.orderTime}
                address={`${history.address?.city} ${history.address?.street} ${history.address?.zipcode}`}
                setHistories={setHistories}
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
  gap: 80px;
  padding-bottom: 80px;
`;

export default ClientHistoryOrderPage;
