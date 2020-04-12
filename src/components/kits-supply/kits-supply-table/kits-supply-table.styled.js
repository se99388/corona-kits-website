import styled from 'styled-components';
import { Table,Row } from 'react-bootstrap';

export const TrWithColor =styled.tr`
color:${props=>props.marked};
`

export const MyDiv=styled.div`
 display:flex;
 justify-content: center;
 img{
     width:50%;
     color:red
 }
 div{
     width:80%
 }
`
export const MyTable = styled(Table)`
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

export const RowCenter = styled(Row)`
/* height:100%; */
`
