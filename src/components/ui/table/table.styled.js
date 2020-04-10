import styled from 'styled-components';
import { Table } from 'react-bootstrap';

export const TrWithColor =styled.tr`
color:${props=>props.marked};
`
export const GeneralTable= styled(Table)`
 /* td:nth-of-type(6), td:nth-of-type(7), td:nth-of-type(8),th:nth-of-type(6), th:nth-of-type(7), th:nth-of-type(8)
 {
    display: none;
 } */
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
