import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import AxiosInstance from '../config/axiosinstance'
import { ToastError, toastSuccess } from '../plugins/Toast'
import '../pages/login.css'

const PASSWORD_REGEX=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

function ForgotPassword() {
  const navigate=useNavigate()
  const [step,setStep]=useState(1)// 1 email, 2 code, 3 new password
  const [email,setEmail]=useState('')
  const [otp,setOtp]=useState('')
  const [password1,setPassword1]=useState('')
  const [password2,setPassword2]=useState('')
  const [showPassword,setShowPassword]=useState(false)
  const [busy,setBusy]=useState(false)
  const [error,setError]=useState('')

  const run=(request,onDone)=>{
    setError('')
    setBusy(true)
    request().then(onDone).catch(()=>ToastError('Something went wrong, please try again')).finally(()=>setBusy(false))
  }

  const sendCode=(e)=>{
    e && e.preventDefault()
    if(!email.trim()){
      setError('Enter your email address')
      return
    }
    run(()=>AxiosInstance.post('/auth/forgotPassword',{email}),(resp)=>{
      if(resp.data.msg==='success'){
        toastSuccess('If that email has an account, a code is on its way')
        setStep(2)
      }
    })
  }

  const verifyCode=(e)=>{
    e.preventDefault()
    if(otp.length!==6){
      setError('Enter the 6 digit code from your email')
      return
    }
    run(()=>AxiosInstance.post('/auth/verifyotp',{email,otp}),(resp)=>{
      if(resp.data.msg==='success'){
        toastSuccess('Code verified')
        setStep(3)
      }
      else{
        setError('That code is wrong or has expired')
      }
    })
  }

  const resetPassword=(e)=>{
    e.preventDefault()
    if(!PASSWORD_REGEX.test(password1)){
      setError('Use 8-15 characters with an uppercase letter, a lowercase letter, a number and a special character')
      return
    }
    if(password1!==password2){
      setError("Passwords don't match")
      return
    }
    run(()=>AxiosInstance.post('/auth/resetpassword',{email,otp,password:password1}),(resp)=>{
      if(resp.data.passwordupdated){
        toastSuccess('Password updated, please log in')
        navigate('/')
      }
      else{
        ToastError('Could not update the password, please start again')
        setStep(1)
      }
    })
  }

  const titles={
    1:['Forgot your password?',"Enter your email and we'll send you a 6 digit code."],
    2:['Check your email',`We sent a code to ${email}. It expires in 10 minutes.`],
    3:['Choose a new password','Pick something strong that you have not used before.'],
  }

  return (
    <div className='auth-page'>
      <section className='auth-hero'>
        <div className='auth-brand'>
          <span className='auth-brand-mark'>⚽</span>
          Court Booking
        </div>
        <div>
          <h1>Back in the game <span>in a minute.</span></h1>
          <p>Reset your password with a one-time code and get back to booking your courts.</p>
        </div>
        <div className='auth-stats'>
          <div><strong>3 steps</strong><small>Email, code, new password</small></div>
        </div>
      </section>

      <section className='auth-panel'>
        <div className='auth-card'>
          <div className='auth-steps'>
            {[1,2,3].map((n)=><span key={n} className={n<=step?'done':''}/>)}
          </div>
          <h2>{titles[step][0]}</h2>
          <p className='auth-sub'>{titles[step][1]}</p>

          {error && <div className='auth-alert'><FontAwesomeIcon icon={faCircleExclamation}/> {error}</div>}

          {step===1 && (
            <form onSubmit={sendCode} noValidate>
              <div className='auth-field'>
                <label htmlFor='fp-email'>Email address</label>
                <input id='fp-email' className='auth-input' type='email' placeholder='you@example.com' autoComplete='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <button className='auth-btn' type='submit' disabled={busy}>{busy?'Sending…':'Send code'}</button>
            </form>
          )}

          {step===2 && (
            <form onSubmit={verifyCode} noValidate>
              <div className='auth-field'>
                <label htmlFor='fp-otp'>6 digit code</label>
                <input id='fp-otp' className='auth-input auth-otp' inputMode='numeric' maxLength={6} placeholder='······' autoComplete='one-time-code' value={otp} onChange={(e)=>setOtp(e.target.value.replace(/\D/g,''))}/>
              </div>
              <button className='auth-btn' type='submit' disabled={busy}>{busy?'Checking…':'Verify code'}</button>
              <div className='auth-links'>
                <button type='button' className='auth-link' onClick={()=>{setStep(1);setOtp('');setError('')}}>Change email</button>
                <button type='button' className='auth-link' disabled={busy} onClick={()=>sendCode()}>Resend code</button>
              </div>
            </form>
          )}

          {step===3 && (
            <form onSubmit={resetPassword} noValidate>
              <div className='auth-field'>
                <label htmlFor='fp-pass1'>New password</label>
                <div className='auth-input-wrap'>
                  <input id='fp-pass1' className='auth-input has-toggle' type={showPassword?'text':'password'} placeholder='Create a password' autoComplete='new-password' value={password1} onChange={(e)=>setPassword1(e.target.value)}/>
                  <button type='button' className='auth-eye' aria-label={showPassword?'Hide password':'Show password'} onClick={()=>setShowPassword(!showPassword)}>
                    <FontAwesomeIcon icon={showPassword?faEyeSlash:faEye}/>
                  </button>
                </div>
                <p className='auth-hint'>8-15 characters with an uppercase letter, a lowercase letter, a number and a special character.</p>
              </div>
              <div className='auth-field'>
                <label htmlFor='fp-pass2'>Confirm password</label>
                <input id='fp-pass2' className='auth-input' type={showPassword?'text':'password'} placeholder='Repeat your password' autoComplete='new-password' value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
              </div>
              <button className='auth-btn' type='submit' disabled={busy}>{busy?'Saving…':'Reset password'}</button>
            </form>
          )}

          <p className='auth-switch'>
            Remembered it? <Link to='/' className='auth-link'>Back to log in</Link>
          </p>
        </div>
      </section>
    </div>
  )
}

export default ForgotPassword
