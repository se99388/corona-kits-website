import styled from 'styled-components';
import { Table } from 'react-bootstrap';


export const KitsSupplyTable = styled(Table)`
 td:nth-of-type(2), th:nth-of-type(2){
    display: none;
 }
 td, th{
    text-align: center; 
    vertical-align: middle;
 }
`
