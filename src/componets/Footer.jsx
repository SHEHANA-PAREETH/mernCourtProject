import React from 'react'
import { Container, Row ,Col} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Footer.css'

import { faTwitterSquare, faFacebook, faLinkedin, faInstagram} from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <Container className=' section6'>
       <Row className=''>
        <Col className=' my-5 footer d-flex flex-column justify-content-center align-items-center' sm={12} md={6}  >
        <ul >
            <li href="">Blog</li>
            <li href="">About Us</li>
            <li href="">Terms of Use</li>
            <li href="">Privacy Policy</li>
            <li href="">Developers</li>
            <li href="">Contact</li>
            <li href="">
Affiliates & Resellers</li>
        </ul>
        </Col >
        <Col  sm={12} md={6} className='d-flex justify-content-center align-items-center'>
        <div className='d-flex justify-content-center align-items-center'>
        <FontAwesomeIcon icon={faFacebook} className='fs-2 me-5 ' style={{color:'#3A5998'}}/>
        <FontAwesomeIcon icon={faTwitterSquare} className='fs-2  me-5' style={{color:'#1FAEEB'}}/>
        <FontAwesomeIcon icon={faInstagram} className='fs-2  me-5' style={{color:'#7305B0'}}/>
        <FontAwesomeIcon icon={faLinkedin} className='fs-2 ' style={{color:'#FA9B39'}}/>
        </div>
        
        </Col>
        
    </Row> 
    </Container>
    

  )
}

export default Footer