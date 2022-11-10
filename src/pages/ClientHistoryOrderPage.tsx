import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { History, OrderStatus } from '../@types';
// import { OrderService } from '../api';
import { ClickableHistoryOrderCard, SideMenuList, Typography } from '../components';
import { theme } from '../styles';

const dummy = [
  {
    orderId: 22,
    riderId: null,
    riderName: '미정',
    address: {
      city: 'seoul0',
      street: 'mangu0',
      zipcode: '123450',
    },
    orderTime: new Date(),
    reservedTime: null,
    orderStatus: 'ORDERED' as OrderStatus,
    totalPriceAfterSale: null,
    orderSheetResponseList: [
      {
        orderSheetId: 23,
        styleId: 20,
        styleName: '스타일0',
        dinnerId: 21,
        dinnerName: '디너0',
        foodDifferenceInfoResponseList: [
          {
            orderSheetItemId: 6103,
            foodId: 6,
            foodName: '스테이크0',
            foodQuantity: 1,
          },
          {
            orderSheetItemId: 6104,
            foodId: 7,
            foodName: '치킨0',
            foodQuantity: 1,
          },
        ],
      },
    ],
    clientId: 1,
    clientName: 'Client0',
  },
];

function ClientHistoryOrderPage() {
  const [histories, setHistories] = useState<History[]>([]);
  const [params] = useSearchParams();

  useEffect(() => {
    const uuid = params.get('uuid');
    if (uuid) {
      // guset History
      (async () => {
        // const res = await OrderService.getGuestHistory({ id: Number(uuid) });
        // setHistories([res]);
      })();
    } else {
      // client History
      (async () => {
        // const res = await OrderService.getClientHistory({ page: 0, size: 200 });
        // setHistories(res.content);
      })();
      // FIXME: 더미 데이터
      setHistories(dummy);
    }
  }, [params]);

  return (
    <Wrapper>
      <SideMenuList />
      <Spacer>
        <Typography type='h1' color={theme.colors.text.bold} style={{ marginBottom: 40 }}>
          주문 내역
        </Typography>
        <CardList>
          {histories?.map((history) => (
            <ClickableHistoryOrderCard
              key={history.orderId}
              userType='client'
              orderStatus={history.orderStatus}
              dinnerName={history.orderSheetResponseList[0].dinnerName}
              differenceFoodList={history.orderSheetResponseList[0].foodDifferenceInfoResponseList}
              date={history.orderTime}
              address={`${history.address.city} ${history.address.street} ${history.address.zipcode}`}
            />
          ))}
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

  section:nth-last-of-type(1) {
    margin-bottom: 80px;
  }
`;

export default ClientHistoryOrderPage;
