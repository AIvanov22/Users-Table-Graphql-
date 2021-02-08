export const actionsList = (onChangePageClick, canPreviousPage, canNextPage) => ([
  { id: 'startPage', onClick: onChangePageClick, disabled: !canPreviousPage, label: '<<' },
  { id: 'prevPage', onClick: onChangePageClick, disabled: !canPreviousPage, label: '<' },
  { id: 'nextPage', onClick: onChangePageClick, disabled: !canNextPage, label: '>' },
  { id: 'endPage', onClick: onChangePageClick, disabled: !canNextPage, label: '>>' },
]);
