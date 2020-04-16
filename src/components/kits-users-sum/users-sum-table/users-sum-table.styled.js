import styled from 'styled-components';
import { Table } from 'react-bootstrap';


export const GeneralTable= styled(Table)`
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