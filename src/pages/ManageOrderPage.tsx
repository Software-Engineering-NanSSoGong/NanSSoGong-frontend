import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { History, OrderStatus } from '../@types';
import { OrderService } from '../api';
import { EmployeeHistoryOrderCard, SideMenuListWithEmployee, Typography } from '../components';
import { theme } from '../styles';

function ManageOrderPage() {
  const [histories, setHistories] = useState<History[]>([]);
  const [filteredHistories, setFilteredHistories] = useState<History[]>([]);
  const statusList: OrderStatus[] = [
    'ACCEPTED',
    'CANCEL',
    'COOKED',
    'DELIVERED',
    'DELIVERING',
    'DENIED',
    'ORDERED',
    'RESERVED',
  ];

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterStatus = e.target.value;
    const nextFilteredHistories =
      filterStatus !== 'default'
        ? [...histories].filter((history) => history.orderStatus === filterStatus)
        : [...histories];
    setFilteredHistories(nextFilteredHistories);
  };

  useEffect(() => {
    // client History
    (async () => {
      const res = await OrderService.getList({ page: 0, size: 50 });
      setHistories(res.content);
      setFilteredHistories(res.content);
    })();
  }, []);

  return (
    <Wrapper>
      <SideMenuListWithEmployee />
      <Spacer>
        <Typography type='h1' color={theme.colors.text.bold} style={{ marginBottom: 40 }}>
          주문 내역
        </Typography>
        <SelectStatusSection>
          <SelectStatus onChange={handleChangeSelect}>
            <option value={'default'}>전체</option>
            {statusList.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </SelectStatus>
        </SelectStatusSection>
        <CardList>
          {filteredHistories.length > 0 ? (
            filteredHistories.map((history) => (
              <EmployeeHistoryOrderCard
                key={history.orderId}
                orderId={history.orderId}
                status={history.orderStatus}
                orderSheetResponseList={history.orderSheetResponseList}
                orderTime={history.orderTime}
                address={`${history.address.city} ${history.address.street} ${history.address.zipcode}`}
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
  gap: 40px;

  & > section:nth-last-of-type(1) {
    margin-bottom: 80px;
  }
`;

const SelectStatusSection = styled.div`
  text-align: end;
`;

const SelectStatus = styled.select`
  border: 0;
  outline: 0;
  border-radius: 4px;
  padding: 4px;
  margin-bottom: 16px;
`;

export default ManageOrderPage;
