import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import AxiosInstance from '../config/axiosinstance';
import { ToastError, toastSuccess } from '../plugins/Toast';
import { loginContext } from '../pages/Login';

const nameRegex=/^[a-zA-Z ]+$/
const emailRegex=/^([a-zA-Z0-9_.]+)@([a-zA-Z0-9-_]{3,20})\.([a-z]{2,6}?$)/
const numberRegex=/^[0-9]{10}$/
const passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

const validate=(data)=>{
  const errors={}
  if(data.firstName.length===0) errors.firstName='First name cannot be empty'
  else if(!nameRegex.test(data.firstName)) errors.firstName='Enter a valid name'

  if(data.lastName.length===0) errors.lastName='Last name cannot be empty'
  else if(!nameRegex.test(data.lastName)) errors.lastName='Enter a valid name'

  if(data.email.length===0) errors.email='Email cannot be empty'
  else if(!emailRegex.test(data.email)) errors.email='Enter a valid email'

  if(data.number.length===0) errors.number='Number cannot be empty'
  else if(!numberRegex.test(data.number)) errors.number='Enter a valid 10 digit number'

  if(data.password1.length<8) errors.password1='Password must contain at least 8 characters'
  else if(!passwordRegex.test(data.password1)) errors.password1='Use 8-15 characters with an uppercase letter, a lowercase letter, a number and a special character'

  if(data.password1!==data.password2) errors.password2="Passwords don't match"
  return errors
}

function Field({label,name,type='text',placeholder,value,onChange,error,children}){
  return (
    <div className='auth-field'>
      <label htmlFor={`signup-${name}`}>{label}</label>
      <div className='auth-input-wrap'>
        <input id={`signup-${name}`} className={`auth-input${error?' has-error':''}${children?' has-toggle':''}`} type={type} placeholder={placeholder} name={name} value={value} onChange={onChange}/>
        {children}
      </div>
      {error?<p className='auth-error'><FontAwesomeIcon icon={faCircleExclamation} style={{marginTop:'2px'}}/> {error}</p>:''}
    </div>
  )
}

function Signupform() {

  const[eye,setEye]=useState(false)
  const {setLogin}=useContext(loginContext)
  const [submitting,setSubmitting]=useState(false)
  const [errors,setErrors]=useState({})
  const [loginData,setLoginData]=useState ({
    firstName:'',
    lastName:'',
    email:'',
    number:'',
    password1:'',
    password2:'',
    role:false
  })

  const handleInputChange=(e)=>{
   const {name,value}=e.target
   setLoginData((prevFormData) =>
   ({ ...prevFormData, [name]:value}))
   if(errors[name]) setErrors((prev)=>({...prev,[name]:''}))
  }

  const handleSubmit= (e)=>{
    e.preventDefault()
    const found=validate(loginData)
    setErrors(found)
    if(Object.keys(found).length>0) return

    setSubmitting(true)
    AxiosInstance.post("/auth/register",loginData).then((res)=>{
      if(res.data.usercreated){
        toastSuccess('Account created, please log in')
        setLogin(true)
      }
      else if(res.data.msg === 'user exists') ToastError('User already exists')
      else if(res.data.msg === 'email exists') ToastError('Email already exists')
      else if(res.data.msg === 'number exists') ToastError('Number already exists')
      else ToastError('Server issue, please try again')
    }).catch(()=>{
      ToastError('Could not reach the server, please try again')
    }).finally(()=>{
      setSubmitting(false)
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className='auth-grid'>
        <Field label='First name' name='firstName' placeholder='John' value={loginData.firstName} onChange={handleInputChange} error={errors.firstName}/>
        <Field label='Last name' name='lastName' placeholder='Doe' value={loginData.lastName} onChange={handleInputChange} error={errors.lastName}/>
        <Field label='Email' name='email' type='email' placeholder='you@example.com' value={loginData.email} onChange={handleInputChange} error={errors.email}/>
        <Field label='Mobile' name='number' type='tel' placeholder='10 digit number' value={loginData.number} onChange={handleInputChange} error={errors.number}/>
        <Field label='Password' name='password1' type={eye?'text':'password'} placeholder='Create a password' value={loginData.password1} onChange={handleInputChange} error={errors.password1}>
          <button type='button' className='auth-eye' aria-label={eye?'Hide password':'Show password'} onClick={()=>setEye(!eye)}>
            <FontAwesomeIcon icon={eye?faEyeSlash:faEye}/>
          </button>
        </Field>
        <Field label='Confirm password' name='password2' type={eye?'text':'password'} placeholder='Repeat your password' value={loginData.password2} onChange={handleInputChange} error={errors.password2}/>
      </div>

      <label className='auth-check'>
        <input type='checkbox' checked={loginData.role} onChange={()=>setLoginData({...loginData,role:!loginData.role})}/>
        Sign up as a vendor (I want to list my courts)
      </label>

      <button className='auth-btn' type='submit' disabled={submitting}>
        {submitting?'Creating account…':'Create account'}
      </button>
    </form>
  )
}

export default Signupform
