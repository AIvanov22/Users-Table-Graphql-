import styled from 'styled-components';

export const TableContainer = styled.div`
	padding: 1rem;
	display: block;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: auto;
`;

export const StyledTable = styled.table`
   border-spacing: 0;
   border: 1px solid black;
   width: 70%;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
`;

export const Overlay = styled.div`
    z-index: 20;
	position: absolute;
  	left: 0; right: 0; top: 0; bottom: 0;
  	background: black;
  	opacity: .7;
`;
