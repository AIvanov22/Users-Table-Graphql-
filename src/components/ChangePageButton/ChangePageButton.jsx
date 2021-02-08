import React, { useCallback, useMemo } from 'react';
import { actionsList } from './actions';
import { ActionsContainer } from './styled';

export const ChangePageButton = ({ canPreviousPage, canNextPage, gotoPage, previousPage, nextPage, pageCount }) => {

  const onChangePageClick = useCallback(({ target: { id } }) => {
    switch (id) {
      case 'startPage':
        gotoPage(0)
        break;
      case 'prevPage':
        previousPage()
        break;
      case 'nextPage':
        nextPage()
        break;
      case 'endPage':
        gotoPage(pageCount - 1)
        break;
      default:
        break;
    }
  }, [gotoPage, previousPage, nextPage, pageCount]);

  const actions = useMemo(() => (actionsList(onChangePageClick, canPreviousPage, canNextPage)),
    [onChangePageClick, canPreviousPage, canNextPage]);

  const createActionsButtons = useCallback(() => (
    actions.map(({ id, onClick, disabled, label }) => ((
      <button key={id} id={id} onClick={onClick} disabled={disabled}>
        {label}
      </button>
    )))
  ), [actions]);

  return (
    <ActionsContainer>
      {createActionsButtons()}
    </ActionsContainer>
  );
};
