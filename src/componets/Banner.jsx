import React from 'react'
import './Banner.css'
import {Col, Container, Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Banner() {
 
  return (

  <Container fluid className='bannerpage'>
  <Row className="" style={{ marginLeft:'0' , marginRight:'0'  }}>
    <Col className="text">
      <h1>The most flexible and affordable <br /> online sport court booking system</h1>
      <h5>Experience why thousands of organizations world-wide trust us with their online scheduling for tennis courts, squash courts and padel courts.</h5>
     
    </Col>
       </Row>
  </Container>
  )
}

export default Banner