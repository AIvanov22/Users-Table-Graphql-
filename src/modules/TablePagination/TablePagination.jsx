import React from 'react';
import { PaginationContainer } from './styled';
import { ChangePageButton, GoToPageInput, ItemLimitSelect } from '../../components';

export const TablePagination = ({ gotoPage, previousPage, nextPage, canPreviousPage, pageCount, canNextPage, pageSize, pageIndex,
  pageOptions, setPageSize }) => (
  <PaginationContainer>
	<ChangePageButton
	  canPreviousPage={canPreviousPage}
	  canNextPage={canNextPage}
	  gotoPage={gotoPage}
	  previousPage={previousPage}
	  nextPage={nextPage}
	  pageCount={pageCount}
	/>

	<strong>
	  Page {pageIndex + 1} of {pageOptions.length}
	</strong>

	<GoToPageInput
	  pageIndex={pageIndex}
	  gotoPage={gotoPage}
	/>
	<ItemLimitSelect
	  pageSize={pageSize}
	  setPageSize={setPageSize}
	/>
  </PaginationContainer>
);
