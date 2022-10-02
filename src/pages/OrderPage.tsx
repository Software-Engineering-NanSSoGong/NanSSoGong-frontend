import styled from '@emotion/styled';
import { OrderComponent } from '../components';

function OrderPage() {
  return (
    <Wrapper>
      <OrderComponent />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
`;

export default OrderPage;
