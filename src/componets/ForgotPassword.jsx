import React, { useState } from 'react'
import {Form,Button, Nav} from 'react-bootstrap'
import AxiosInstance from '../config/axiosinstance'
import { faEye,faEyeSlash,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastError, toastSuccess } from '../plugins/Toast'
import { useNavigate } from 'react-router-dom'
function ForgotPassword() {
    const [email,setEmail]=useState()
    const [otp,setOtp]=useState(false)
    const [otpvalue,setOtpValue]=useState()
    const [verifyotp,setverifyotp]=useState(false)
    const [passwordfield,setpasswordfield]=useState(false)
    const[eye,setEye]=useState(false)
    const [password1,setPassword1]=useState()
    const [password2,setPassword2]=useState()
    const navigate=useNavigate()
    const [otpsendbutton,setotpsendbutton] =useState(true)
    
const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(email);
    AxiosInstance.get('/auth/forgotPassword',{params:{email:email}}).then((resp)=>{
console.log(resp);
if(resp.data.msg==="success"){
    toastSuccess('OTP sent suucessfully')
    setotpsendbutton(false)
    setOtp(true)
}
    })
}
const handleChange=(e)=>{
setOtpValue(e.target.value)
setverifyotp(true)
}
const handleVerification=()=>{
    AxiosInstance.get('/auth/verifyotp',{params:{otpvalue:otpvalue}}).then((resp)=>{
        if(resp.data.msg==="success"){
            toastSuccess('otp verified successfully')
            setpasswordfield(true)
            setverifyotp(false)
            setOtp(false)
            
        }
        if(resp.data.msg==="failed"){
            ToastError('OTP invalid')
            setpasswordfield(false)
         //setotpsendbutton(true)
          //setOtp(false)
            //setverifyotp(false)
           
        }
    })
}
const resetPaasword=()=>{
    validatepassword1()
    validatepassword2()
    if( validatepassword1()&&validatepassword2()){
        AxiosInstance.get('/auth/resetpassword',{params:{email:email,password1:password1}}).then((resp)=>{
            console.log(resp);
            if(resp.data.passwordupdated){//true
toastSuccess('Password updated successfully')
navigate('/')
            }
            else{
             ToastError('something went wrong') 
             setpasswordfield(false)  
            }
                })
    }
  
}

    const validatepassword1=()=>{
        if (password1.length < 8) {
         ToastError(' Password must contain greater than or equal to 8 characters.')
         return false
      }
      else{
        let reg=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if(!reg.test(password1)){
            ToastError('enter a valid password which contains atleast one uppercase character,lowercase character,number and special characters')
         return false
        }
else{
    return true
}
        
      }
      
      
      }
      const validatepassword2=()=>{
        if (password1 !== password2) {
            ToastError("Passwords don't match.")
            return false
      }
      else{
        return true
      }
      
      
      }

  return (
    <div>
        <Form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center bg-dark' style={{height:'100vh'}}>
         <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
        <Form.Label className='my-2 text-light fw-bolder'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e)=>{setEmail(e.target.value);
        setotpsendbutton(true);setOtp(false);setverifyotp(false)}}/>
      </Form.Group>
      {otpsendbutton?<Button type="submit" className="btn-light">Send OTP through Email</Button>:''}
      {otp?<div className='mt-2'><label className='text-light fw-bolder p-2 ms-5'>enter OTP</label><br/><input className='p-1 border border-2 rounded' onChange={handleChange}/></div>:''}
      {verifyotp?<Button className="btn-light fw-bolder mt-2" onClick={handleVerification}>Verify OTP</Button>:""}
      
      {passwordfield?<div>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='text-light mt-2'> Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password1'  onChange={(e)=>setPassword1(e.target.value)} onBlur={validatepassword1}/>

      {eye?<FontAwesomeIcon className='position-absolute top-50 start-100 translate-middle' style={{marginLeft:'-30px',marginTop:'6px'}} icon={faEyeSlash} onClick={()=>setEye(false)}/>:<FontAwesomeIcon className='position-absolute top-50 start-50 translate-middle ' style={{marginLeft:'80px',marginTop:'16px'}} icon={faEye} onClick={()=>setEye(true)}/>}
      </Form.Group>
     
      <Form.Group className="mb-3 " controlId="formBasicPassword">
        <Form.Label className='text-light'>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password2'  onChange={(e)=>setPassword2(e.target.value)} onBlur={validatepassword2}/>

      </Form.Group>

      <Button onClick={resetPaasword}>Reset Password</Button>
      </div>:''}
      </Form>

    </div>
  )
}

export default ForgotPassword