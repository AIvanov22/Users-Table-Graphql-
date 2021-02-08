import React, { useCallback, useMemo } from 'react';
import { PAGE_SIZES } from '../../constants';

export const ItemLimitSelect = ({ pageSize, setPageSize }) => {
  const pageLimitOptions = useMemo(() => (
    PAGE_SIZES.map(pageSize => (
      <option key={pageSize} value={pageSize}>
        Show {pageSize}
      </option>
    ))
  ),[]);

  const onItemLimitChange = useCallback(({ target: { value } }) => {
    setPageSize(Number(value));
  }, [setPageSize]);

  return (
    <select value={pageSize} onChange={onItemLimitChange}>
      {pageLimitOptions}
    </select>
  )
};
