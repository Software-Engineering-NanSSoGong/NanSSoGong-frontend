import styled from '@emotion/styled';
import { PageOptions } from '../../hooks/usePagination';
import ClickableIcon from '../ClickableIcon';
import Button from './Button';
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
      <ClickableIcon
        iconProps={{ type: 'doubleLeft' }}
        onClick={() => handleChangePage(1)}
        disabled={currentPage === 1}
      />
      <ClickableIcon
        iconProps={{ type: 'left' }}
        onClick={() => handleChangePage(prevPage)}
        disabled={currentPage === 1}
      />
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
      <ClickableIcon
        iconProps={{ type: 'right' }}
        onClick={() => handleChangePage(nextPage)}
        disabled={currentPage === totalPages}
      />
      <ClickableIcon
        iconProps={{ type: 'doubleRight' }}
        onClick={() => handleChangePage(totalPages)}
        disabled={currentPage === totalPages}
      />
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
