import styled from 'styled-components';

export const Board = styled.div`
display:flex;
flex-wrap: wrap;
justify-content:center;
/* width:100%; */
`

export const Card = styled.div`
border: 1px solid black;
/* border-radius: 20px; */
margin: 4px 2px;
padding: 5px;
box-shadow: 5px 5px #888888;
@media screen and (max-width: 550px) {
/* width:50% */
flex-basis: 40%;
flex-grow: 1;
}
`
