import React from 'react';
import Popup from "reactjs-popup";
import Calendar from '../../../ui/calendar';
import {Button} from 'react-bootstrap';
const SearchByDate = ({apiByDate}) => {

    return (
        <Popup trigger={<Button variant='light' className="mb-3">Filter by date</Button>} position="right center">
            <div>    <Calendar
                apiByDate={apiByDate}
            /></div>
        </Popup>
    )
}

export default SearchByDate;