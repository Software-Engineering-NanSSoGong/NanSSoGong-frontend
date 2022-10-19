import styled from '@emotion/styled';
import { PageOptions } from '../../hooks/usePagination';
import Button from './Button';
import Icon from './Icon';
import Typography from './Typography';

export interface Props {
  pageOptions: PageOptions;
  handleChangePage: (page: number) => void;
}

function PageNavigation({ pageOptions, handleChangePage }: Props) {
  const { startPage, endPage, currentPage, totalPages } = pageOptions;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const pages = [...Array(endPage - startPage + 1).keys()].map((_, idx) => startPage + idx);

  return (
    <Wrapper>
      <Icon type='doubleLeft' onClick={() => handleChangePage(1)} />
      <Icon type='left' onClick={() => handleChangePage(prevPage)} />
      <NavigationList>
        {pages.map((page) => (
          <li key={String(page)}>
            <NavigationItemButton
              disabled={page === currentPage}
              onClick={() => handleChangePage(page)}
              borderRadius={4}
            >
              <Typography type='body3'>{page}</Typography>
            </NavigationItemButton>
          </li>
        ))}
      </NavigationList>
      <Icon type='right' onClick={() => handleChangePage(nextPage)} />
      <Icon type='doubleRight' onClick={() => handleChangePage(totalPages)} />
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavigationList = styled.ol`
  display: flex;
  gap: 16px;
`;

const NavigationItemButton = styled(Button)`
  padding: 8px;
`;

export default PageNavigation;
