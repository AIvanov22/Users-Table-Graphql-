import React, { useCallback, useMemo } from 'react';
import { PageInput } from './styled';

export const GoToPageInput = ({ pageIndex, gotoPage }) => {
  const defaultGoToPageValue = useMemo(() => (pageIndex + 1),[pageIndex])

  const onGoToPageChange = useCallback(({ target: { value } }) => {
    gotoPage(Number(value) - 1);
  }, [gotoPage]);

  return (
    <span>
      Go to page:
      <PageInput
        type="number"
        defaultValue={defaultGoToPageValue}
        onChange={onGoToPageChange}
      />
    </span>
  );
};
