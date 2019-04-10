import { useState, useEffect } from 'react';
import getPage from '../getPage';

const usePagination = (items, pageSize, sortField) => {
  const [page, setPage] = useState(1);
  const paginatedItems = getPage(items, page, pageSize);

  useEffect(() => setPage(1), [sortField]);

  return [paginatedItems, page, setPage];
};

export default usePagination;
