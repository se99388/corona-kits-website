import styled from 'styled-components';
import { Table } from 'react-bootstrap';


export const KitsSupplyTable = styled(Table)`
 td:nth-of-type(2), td:nth-of-type(3), td:nth-of-type(8), td:nth-of-type(9), td:nth-of-type(10){
    display: none;
 }
 td, th{
    text-align: center; 
    vertical-align: middle;
    
 }
 @media screen and (max-width: 445px) {
    td, th {
    font-size:85%;
  }
  td:nth-of-type(1),th:nth-of-type(1){
    display: none;
 }
}
`
