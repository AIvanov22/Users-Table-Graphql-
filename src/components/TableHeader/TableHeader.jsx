import React, { useCallback } from 'react';

export const TableHeader = ({ headerGroups,  }) => {
  const createSortLabel = useCallback((isSortedDesc) => (
	<span>
	  {isSortedDesc ? ' 🔽' : ' 🔼'}
	</span>
  ), []);

  return (
	<thead>
	{headerGroups.map(headerGroup => (
	  <tr {...headerGroup.getHeaderGroupProps()}>
		{headerGroup.headers.map(column => {
		  const label = column.isSorted ? createSortLabel(column.isSortedDesc) : null;
		  return (
			<th {...column.getHeaderProps(column.getSortByToggleProps())}>
			  {column.render('Header')}
			  {label || ''}
			</th>
		  )
		})}
	  </tr>
	))}
	</thead>
  );
};
