import React from 'react';
import { TableRow } from './styled';

export const TableBody = ({ getTableBodyProps, page, prepareRow, createActionCell, editRowId, setEditRowId }) => {

  const onRowClick = ({ currentTarget: { id }, target: { name } }) => {
	if (name) return;
	setEditRowId(id);
  };

  const createCell = (rowId, cellId, cell) => {
	if (cellId === 'action') {
	  return createActionCell(cell)
	} else {
	  if (rowId === editRowId) {
		const { value } = cell;
		return <input name='edit-row-input' data-cell-id={cellId} defaultValue={value} />
	  }
	  return cell.render('Cell');
	}
  };

  return (
	  <tbody {...getTableBodyProps()}>
	  {page.map((row) => {
		prepareRow(row);
		const { original: { id: rowId } } = row;
		return (
		  <TableRow {...row.getRowProps()} onClick={onRowClick} id={rowId} selected={rowId === editRowId}>
			{row.cells.map((cell) => {
			  const { column: { id: cellId } } = cell;
			  return (<td {...cell.getCellProps()}>
				{createCell(rowId, cellId, cell)}
			  </td>);
			})}
		  </TableRow>
		);
	  })}
	  </tbody>
  )
};
