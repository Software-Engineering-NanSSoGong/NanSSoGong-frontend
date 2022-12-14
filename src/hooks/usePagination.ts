import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const DEFAULT_PAGE = {
  navigationSize: 10,
  pageSize: 10,
} as const;

export interface PageOptions {
  currentPage: number;
  startPage: number;
  endPage: number;
  totalPages: number;
  pageSize: number;
}

interface Props {
  totalCount: number;
  pageSize?: number;
  navigationSize?: number;
}

const getPageOptions = ({
  totalCount,
  pageSize,
  pageIndex,
  navigationSize,
}: Required<Props> & { pageIndex: number }): PageOptions => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const startPage = Math.floor(pageIndex / navigationSize) * navigationSize;
  const endPage = startPage + navigationSize;

  return {
    currentPage: pageIndex + 1,
    startPage: startPage + 1,
    endPage: endPage > totalPages ? totalPages : endPage,
    totalPages,
    pageSize,
  };
};

const usePagination = ({
  totalCount,
  pageSize = DEFAULT_PAGE.pageSize,
  navigationSize = DEFAULT_PAGE.navigationSize,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageOptions, setPageOptions] = useState<PageOptions>({
    currentPage: 0,
    startPage: 0,
    endPage: 0,
    totalPages: 0,
    pageSize: 0,
  });

  const handleChangePage = (page: number) => {
    if (page === 0) return;

    const { currentPage } = getPageOptions({
      totalCount,
      pageIndex: page - 1,
      pageSize: pageOptions.pageSize,
      navigationSize,
    });
    searchParams.set('page', String(currentPage));
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!totalCount) return;

    const currentPage = searchParams.get('page');
    const currentSize = searchParams.get('size');
    const nextPageOptions = getPageOptions({
      totalCount,
      pageIndex: currentPage ? Number(currentPage) - 1 : 0,
      pageSize: currentSize ? Number(currentPage) : pageSize,
      navigationSize,
    });

    if (nextPageOptions.currentPage > nextPageOptions.endPage) {
      setSearchParams({
        page: String(nextPageOptions.endPage),
        size: String(nextPageOptions.pageSize),
      });
      return;
    }

    setPageOptions(nextPageOptions);
  }, [totalCount, searchParams]);

  return {
    pageOptions,
    handleChangePage,
  };
};

export default usePagination;
