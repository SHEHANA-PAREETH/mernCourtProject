import React, { useContext } from 'react'
import Signupform from './Signupform';
import {loginContext} from '../pages/Login'

function Signupcard() {
const {login , setLogin}=useContext(loginContext)
  return (
    <div className='auth-card wide'>
      <h2>Create your account</h2>
      <p className='auth-sub'>It only takes a minute.</p>
      <Signupform />
      <p className='auth-switch'>
        Already have an account?{' '}
        <button type='button' className='auth-link' onClick={()=>setLogin(!login)}>Log in</button>
      </p>
    </div>
  )
}

export default Signupcard
