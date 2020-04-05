import React, {useState} from 'react';
import { Button, Table, Container, Row, Col, Alert, Form} from 'react-bootstrap';
const Calendar =({apiByDate})=>{

    const [startDate,setStartDate]= useState(null);
    const [error,setError]= useState(null);
    const [endDate,setEndDate]= useState(null);

    const validation=(startDate, endDate)=>{
        if (!(startDate) || !(endDate)){
            setError('fill the missing date');
            return false;
        }
        if ((startDate) > (endDate)){
            setError('Start date is bigger than end date');
            return false;
        }
        if ((new Date(startDate) > new Date()) || (new Date(endDate) > new Date())){
            setError('The date is bigger than the current date');
            return false;
        }
        return true;

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
       if (!validation(startDate, endDate)){
           return false
       }
       setError(null);
       apiByDate({startDate,endDate})
    }
    return(

        <Form onSubmit={handleSubmit}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>From</Form.Label>
    <Form.Control type="date" placeholder="From" onChange={(e)=>setStartDate(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>To</Form.Label>
    <Form.Control type="date" placeholder="To..." onChange={(e)=>setEndDate(e.target.value)} />
  </Form.Group>
  <Button variant="primary" type="submit">
    Search
  </Button>
  {error && <Alert variant="danger">{error}</Alert>}
</Form>

    )
}

export default Calendar;