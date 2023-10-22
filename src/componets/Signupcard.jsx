import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Signupform from './Signupform';
import {loginContext} from '../pages/Login'
import { Container,Row,Col } from 'react-bootstrap';


function Signupcard() {
const {login , setLogin}=useContext(loginContext)
  return (
   
        <Card style={{ width: '50rem' }} className='mt-5 ' >
             <Card.Img variant="top mx-auto mt-1 mb-2" src="https://lms.sants.co.za/images/icons/Login.png" style={{width: "10%"}} />
      <Card.Title className='text-center fw-bold my-3'>Sign up</Card.Title>
      <Card.Body>
        <Card.Text>
          < Signupform />
        </Card.Text>
    
      </Card.Body>
      <Button variant=" w-50 mb-1 border-none fw-bolder mx-auto" style={{color:'#0D4A42'}} onClick={()=>setLogin(!login)} >
        Back to Log in
      </Button>
    </Card>
      
    
  )
}



export default Signupcard