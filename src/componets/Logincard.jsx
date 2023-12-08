import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Loginform from './Loginform';
import { loginContext } from '../pages/Login';



function Logincard() {
  const {login,setLogin}=useContext(loginContext)
  return (
    <Card style={{ width: '30rem' }} className='mt-5 hero'>
       <Card.Img variant="top mx-auto mt-2" src="https://lms.sants.co.za/images/icons/Login.png" style={{width: "15%"}} />
              
      <Card.Title className='text-center fw-bold my-3'>Log in </Card.Title>
      <Card.Body>
        
        <Card.Text>
          < Loginform/>
        </Card.Text>
<span className='d-flex justify-content-center'>Don't have an account? </span>
        <button className=' w-100 btn fw-bolder'style={{color:'#0D4A42'}} onClick={()=>setLogin(!login)}> Register</button>
        <Nav.Link href='/forgotpassword' style={{textAlign:'center'}}>Forgot password?</Nav.Link>
      </Card.Body>
    </Card>
  )
}

export default Logincard