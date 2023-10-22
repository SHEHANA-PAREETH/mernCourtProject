import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BASEURL } from '../Constants/baseURL';
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
      
        <Card className='shadow-sm' style={{ width:'19rem',height:'23rem'}} onClick={()=>openthisCard()} >
      <Card.Img variant="top" src={`${BASEURL}/uploads/${courtsdetails.image[0].filename}`} style={{ height:'13rem'}}/>
      <Card.Body>
        <Card.Title>{courtsdetails.name}</Card.Title>

        <Button  className='mx-auto' style={{backgroundColor:'#0D4A42',color:'#ffffff',position:'absolute',bottom:'0',}}>Get Details</Button>
      </Card.Body>
    </Card>
   
    </Col>

  )
}

export default Mycourtcomponent