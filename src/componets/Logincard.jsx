import React, { useContext } from 'react'
import Loginform from './Loginform';
import { loginContext } from '../pages/Login';

function Logincard() {
  const {login,setLogin}=useContext(loginContext)
  return (
    <div className='auth-card'>
      <h2>Welcome back</h2>
      <p className='auth-sub'>Log in to manage your bookings.</p>
      <Loginform/>
      <p className='auth-switch'>
        Don't have an account?{' '}
        <button type='button' className='auth-link' onClick={()=>setLogin(!login)}>Create one</button>
      </p>
    </div>
  )
}

export default Logincard
