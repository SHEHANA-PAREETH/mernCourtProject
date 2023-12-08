import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './images/download.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { faCartShopping, faUser,faPen} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { faTwitterSquare, faFacebook,faDribbble, faLinkedin, faInstagram,faTwitter} from "@fortawesome/free-brands-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../config/axiosinstance';
import { setSearchText } from '../toolkit/userSlice';

import defaultpic from './images/profile.png'


function Navcomponent() {
const [wallet,setWallet]=useState()
const [imageurl,setUrl]=useState()
const dispatch= useDispatch()

const{user}=useSelector((state)=>state.user)
console.log(user);
useEffect(()=>{
  try{
    AxiosInstance.get(`/getprofiepic`).then((resp)=>{
      console.log(resp);
      if(resp?.data?.url){
        setUrl(resp?.data?.url)
      } 
      
    })
  }
  catch(error){
console.log(error);
  }

},[])
const getWallet= async()=>{
const result= await  AxiosInstance.get('payment/getwalletBalance')
console.log(result);
console.log(result.data.amount);
setWallet(result.data.amount)
}
const navigate=useNavigate()
const handlelogout=()=>{
  localStorage.clear()
navigate('/')
}
  return (

      


      <Navbar expand="lg" style={{backgroundColor:'#0D4A42'}} >
      <Container>
      
        <Navbar.Brand href="#home"><img
              src={logo}
              width="130"
              height="80"
              className="d-inline-block align-top"
              alt="logo"
            /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='text-light bg-light' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/home" className='fw-bold text-light me-3'>Home</Nav.Link>
            
          {user.role===1 && <Nav.Link href="/userallcourts" className='me-3 text-light'>Courts</Nav.Link>}
          {user.role===1&&<Nav.Link href="/userBookings" className='me-3 text-light'>My Bookings</Nav.Link>}
          
            {user.role===2&&<Nav.Link href="/mycourts" className='me-3 text-light'>My Courts</Nav.Link>}
            {user.role===2&&<Nav.Link href="/registercourt" className='me-3 text-light'>Court Registration</Nav.Link>}
            <Nav.Link href="#features" className='text-light'>Pricing</Nav.Link>
           
            <Nav.Link href="#features" className='text-light '>Support</Nav.Link>
          <Nav.Link class="my-3" className='text-light' onClick={handlelogout}>Logout</Nav.Link>
          <input type="text" className='border rounded-3 ms-3 px-2' onChange={(e)=>dispatch(setSearchText(e.target.value))}/>
          </Nav>
          <Nav.Link href="#" className='text-light me-3'><img  src= { imageurl ? `${ process.env.REACT_APP_BASE_URL}/uploads/${imageurl}`:`${defaultpic}`}  alt="profile image" style={{width:'40px', height:'40px',borderRadius:'50%'}}/></Nav.Link>
          <NavDropdown onClick={getWallet} title={`${user.firstName} ${user.lastName}`} id="basic-nav-dropdown" className='text-light'> 
         
 <div className='w-100'>
 <Dropdown.Item href="/uploadprofilepic">Change Profilepic</Dropdown.Item>
 
 <Dropdown.Item href="#/action-1">{`${user.firstName} ${user.lastName}`}<FontAwesomeIcon icon={faPen} style={{color: "#0D4A42"}} className='ms-2'/></Dropdown.Item>
 
    <Dropdown.Item href="#/action-1">Email Id:</Dropdown.Item>
    <Dropdown.Item href="#/action-1">Mobile Number:</Dropdown.Item>
    <h5  className="mx-2">Wallet:{wallet}</h5>
  
 

  <div class="d-flex">
  
  <Dropdown.Item href="#"><FontAwesomeIcon icon={faDribbble} style={{color: "#0D4A42"}} className=''/></Dropdown.Item>
  <Dropdown.Item href="#"><FontAwesomeIcon icon={faTwitter} style={{color: "#0D4A42"}} className=''/></Dropdown.Item>
  <Dropdown.Item href="#"><FontAwesomeIcon icon={faLinkedin} style={{color: "#0D4A42"}} className=''/></Dropdown.Item>
  <Dropdown.Item href="#"><FontAwesomeIcon icon={faFacebook} style={{color: "#0D4A42"}} className=''/></Dropdown.Item>
  </div>
  <p></p>

 </div>
  
 

            </NavDropdown> 
        </Navbar.Collapse>
      
        
      </Container>
    </Navbar>


      
     

   
    
  

  )
}

export default Navcomponent