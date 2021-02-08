import styled from 'styled-components';

export const TableRow = styled.tr`
	z-index: ${ props => props.selected ? 30 : 10 };
	position: relative;
	transform: translate(0, 0);
	background-color: white;
`;
