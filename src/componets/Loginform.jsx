import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { setUser , setOpenLoader } from '../toolkit/userSlice';
import { useDispatch } from 'react-redux';
import { ToastError } from '../plugins/Toast';
import AxiosInstance from '../config/axiosinstance';


function Loginform() {
 
const navigate=useNavigate()
const dispatch=useDispatch( )
  const [invalid,setInvalid]=useState('')
const [loginData,setLoginData]=useState({
  email:'',
  password:''
})

const handleInputChange=(e)=>{
  const {name,value}=e.target
  setLoginData((prevFormData) => 
  ({ ...prevFormData, [name]:value}))


 }

 const handleSubmit=(e)=>{
  e.preventDefault()
  console.log(loginData);
  dispatch(setOpenLoader(true))
  function hasEmptyValue(obj){
    return Object.values(obj).some(value=> value === "")
  }
  if(hasEmptyValue(loginData)){
    ToastError("field values cannot be empty")
  }
  else{
    AxiosInstance.post("/auth/login",loginData).then((res)=>{
      console.log(res.data.msg);
      if(res.data.msg==="user login success"){
  
        Swal.fire({  
           
          text: 'login successfully.',
          icon: 'success'
        }).then(()=>{
          localStorage.setItem('token',res.data.token)
          dispatch(setUser(res.data.user))
          if(res.data.user.role === 3){
            navigate('/adminhome')
          }
          else{
            navigate('/home')
          }
        
        })
        
      }
      if(res.data.msg === "invalid credentials"){
  setInvalid("account doesn't exist,create new account" )
  setTimeout(()=>{
    setInvalid('')
  },3000)
      }
      if(res.data.msg==='password incorrect'){
        setInvalid("Password is incorrect" )
  setTimeout(()=>{
    setInvalid('')
  },3000)
      }
     
    })
    dispatch(setOpenLoader(false))
  }
  
 }
  return (
    <Form onSubmit={handleSubmit}>
    
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={loginData.email} onChange={handleInputChange}/>
       
      </Form.Group>
     

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={loginData.password} onChange={handleInputChange}/>
      </Form.Group>
      <Button variant=" w-100 mb-3" type="submit" style={{backgroundColor:'#0D4A42',color:'white'}}>
        LOG IN
      </Button>
      {invalid?<p className='text-danger'> <FontAwesomeIcon icon={faCircleExclamation}/> {invalid}</p>:''}
    </Form>
  )
}

export default Loginform