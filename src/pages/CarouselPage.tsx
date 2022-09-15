import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CarouselCardList } from '../components';
import Title from '../components/common/Title';

function CarouselPage() {
  return (
    <Layout>
      <Title title='Infinite Carousel' />
      <CarouselCardList style={{ width: 500, height: 500, marginTop: 32 }} autoPlay={false}>
        {[1, 2, 3].map((v) => (
          <Image key={v} src={`/image${v}.png`} alt='carousel' draggable={false} />
        ))}
      </CarouselCardList>
    </Layout>
  );
}

const Layout = styled.main`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    background-color: ${theme.palette.orange200};

    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

const Image = styled.img`
  max-width: 100%;
`;

export default CarouselPage;
