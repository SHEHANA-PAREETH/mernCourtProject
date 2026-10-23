import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { setUser , setOpenLoader } from '../toolkit/userSlice';
import { useDispatch } from 'react-redux';
import { ToastError, toastSuccess } from '../plugins/Toast';
import AxiosInstance from '../config/axiosinstance';


function Loginform() {

const navigate=useNavigate()
const dispatch=useDispatch( )
  const [showPassword,setShowPassword]=useState(false)
  const [submitting,setSubmitting]=useState(false)
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

  function hasEmptyValue(obj){
    return Object.values(obj).some(value=> value === "")
  }
  if(hasEmptyValue(loginData)){
    ToastError("field values cannot be empty")
  }
  else{
    dispatch(setOpenLoader(true))
    setSubmitting(true)
    AxiosInstance.post("/auth/login",loginData).then((res)=>{
      if(res.data.msg==="user login success"){
        localStorage.setItem('token',res.data.token)
        dispatch(setUser(res.data.user))
        toastSuccess('Logged in successfully')
        navigate(res.data.user.role === 3 ? '/adminhome' : '/home')
      }
      else if(res.data.msg === "invalid credentials"){
        ToastError("Account doesn't exist, create a new account")
      }
      else if(res.data.msg==='password incorrect'){
        ToastError("Password is incorrect")
      }
      else if(res.data.msg==='account blocked'){
        ToastError("Your account has been blocked. Please contact support.")
      }
    }).catch(()=>{
      ToastError("Could not reach the server, please try again")
    }).finally(()=>{
      setSubmitting(false)
      dispatch(setOpenLoader(false))
    })
  }

 }
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className='auth-field'>
        <label htmlFor='login-email'>Email address</label>
        <input id='login-email' className='auth-input' type='email' placeholder='you@example.com' name='email' autoComplete='email' value={loginData.email} onChange={handleInputChange}/>
      </div>

      <div className='auth-field'>
        <label htmlFor='login-password'>Password</label>
        <div className='auth-input-wrap'>
          <input id='login-password' className='auth-input has-toggle' type={showPassword?'text':'password'} placeholder='Enter your password' name='password' autoComplete='current-password' value={loginData.password} onChange={handleInputChange}/>
          <button type='button' className='auth-eye' aria-label={showPassword?'Hide password':'Show password'} onClick={()=>setShowPassword(!showPassword)}>
            <FontAwesomeIcon icon={showPassword?faEyeSlash:faEye}/>
          </button>
        </div>
      </div>

      <div className='auth-row'>
        <span></span>
        <a href='/forgotpassword'>Forgot password?</a>
      </div>

      <button className='auth-btn' type='submit' disabled={submitting}>
        {submitting?'Logging in…':'Log in'}
      </button>
    </form>
  )
}

export default Loginform
