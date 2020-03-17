import styled from 'styled-components';
import { Table } from 'react-bootstrap';


export const KitsSupplyTable = styled(Table)`
 td:nth-of-type(2), th:nth-of-type(2), td:nth-of-type(3), th:nth-of-type(3), td:nth-of-type(4), th:nth-of-type(4){
    display: none;
 }
 td, th{
    text-align: center; 
    vertical-align: middle;
 }
`
