import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {useNavigate} from 'react-router-dom'
import { Container, Row ,Col} from 'react-bootstrap';


function Mycourtcomponent({courtsdetails}) {
 const navigate=useNavigate()
 
  useEffect(()=>{
    console.log(courtsdetails);
  },[])
const openthisCard=()=>{
  navigate(`/openCourtEdit/${courtsdetails._id}`)
}

  return (
   
      <Col md={3} className=' mt-5 g-5 d-flex justify-content-center align-items-center'>
      
        <Card className='shadow-sm' style={{ width:'19rem',height:'20rem'}} onClick={()=>openthisCard()} >
      <Card.Img variant="top" src={`${process.env.REACT_APP_BASE_URL}/uploads/${courtsdetails.image[0].filename}`} style={{ height:'13rem'}}/>
      <Card.Body>
        <Card.Title>{courtsdetails.name}</Card.Title>

     
      </Card.Body>
    </Card>
   
    </Col>

  )
}

export default Mycourtcomponent