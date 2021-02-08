import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useTable, usePagination, useSortBy } from 'react-table'
import { TableHeader, TableBody } from '../components';
import { TablePagination } from '../modules';
import { GET_USERS } from '../queries/Users';
import { DELETE_USER, EDIT_USER } from '../mutation/Users';
import { ROW_PER_PAGE_LIMIT } from '../constants';
import { columnsList } from './columns';
import { TableContainer, StyledTable, Overlay } from './styled';

export const Table = () => {
  const [order, setOrder] = useState(true);
  const [orderBy, setOrderBy] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(ROW_PER_PAGE_LIMIT);
  const [editRowId, setEditRowId] = useState(null);

  const { data } = useQuery(GET_USERS, { variables: { offset, limit, order: order, orderBy } });
  const [deleteUser] = useMutation(DELETE_USER);
  const [editUser] = useMutation(EDIT_USER);

  const { users, usersCount } = useMemo(() => (data), [data]);
  const usersPageCount = useMemo(() => (Math.ceil(usersCount / limit)), [usersCount, limit]);
  const columns = React.useMemo(() => (columnsList), []);

  const {
		  getTableProps,
		  getTableBodyProps,
		  headerGroups,
		  prepareRow,
		  page,
		  canPreviousPage,
		  canNextPage,
		  pageOptions,
		  pageCount,
		  gotoPage,
		  nextPage,
		  previousPage,
		  setPageSize,
		  state: {
			pageIndex,
			pageSize,
			sortBy,
		  },
		} = useTable(
	{
	  columns,
	  data: users,
	  initialState: {
		pageIndex: offset,
		pageSize: limit,
		sortBy: [{
		  id: orderBy,
		  desc: order
		}]
	  },
	  manualPagination: true,
	  pageCount: usersPageCount,
	  manualSortBy: true,
	  disableMultiSort: true,
	},
	useSortBy,
	usePagination,
  );

  useEffect(() => {
	if(users && users.length === 0) {
	  gotoPage(pageCount - 1);
	}
  }, [users, gotoPage, pageCount]);

  useEffect(() => {
	setOffset(pageIndex * pageSize);
  }, [pageIndex, pageSize]);

  useEffect(() => {
	setLimit(pageSize);
  }, [pageSize]);

  useEffect(() => {
	const checkSort = sortBy && sortBy[0];
	setOrder(checkSort ? sortBy[0].desc : true);
	setOrderBy(checkSort ? sortBy[0].id : true);

  }, [setOrder, setOrderBy, sortBy])


  const createActionCell = useCallback((cell) => {
    const { row: { original: { id } } } = cell;
	const isEditRow = id === editRowId;
    const onDeleteClick = async () => {
	  await deleteUser({
		variables: { id },
		update(cache) {
		  cache.modify({
			fields: {
			  users(existingPosts = []) {
				return existingPosts.filter(({ id: itemId }) => (itemId !== id));
			  },
			  usersCount(existingCount) {
			    return existingCount - 1;
			  }
			},
		  });
		},
	  });
	};

    const onEditClick = async () => {
      const rowValues = {};
	  const inputs = document.querySelectorAll('input[name="edit-row-input"]')
	  inputs.forEach(({ value, dataset: { cellId } }) => {
		rowValues[cellId]=value
	  });
	  await editUser({
		variables: { id },
		update(cache) {
		  cache.modify({
			fields: {
			  users(existingPosts = []) {
				return existingPosts.map((item) => {
				  const { id: itemId } = item;
				  if (itemId === id) {
				    return { id, ...rowValues }
				  }
				  return item;
				});
			  },
			},
		  });
		},
	  });
	  setEditRowId(null);
	};

	return (
	  <button
		key={id}
		onClick={isEditRow ? onEditClick : onDeleteClick}
		name={isEditRow ? 'edit' : 'delete'}
	  >
		{isEditRow ? 'Save changes' : 'Delete'}
	  </button>
	);
  }, [deleteUser, editRowId, editUser]);

  return (
	<>
	  <TableContainer>
		<StyledTable {...getTableProps()}>
		  <TableHeader
			headerGroups={headerGroups}
		  />
		  <TableBody
			getTableBodyProps={getTableBodyProps}
			page={page}
			prepareRow={prepareRow}
			createActionCell={createActionCell}
			editRowId={editRowId}
			setEditRowId={setEditRowId}
		  />
		</StyledTable>
		<TablePagination
		  gotoPage={gotoPage}
		  previousPage={previousPage}
		  nextPage={nextPage}
		  canPreviousPage={canPreviousPage}
		  pageCount={pageCount}
		  canNextPage={canNextPage}
		  pageSize={pageSize}
		  pageIndex={pageIndex}
		  pageOptions={pageOptions}
		  setPageSize={setPageSize}
		/>
	  </TableContainer>
	  {editRowId &&
	  	<Overlay />
	  }
	</>
  );
};
