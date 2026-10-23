import React, { createContext, useState } from 'react'
import Logincard from '../componets/Logincard'
import Signupcard from '../componets/Signupcard'
import './login.css'

export const loginContext=createContext()
function Login() {

  const[login,setLogin]=useState(true)
  return (
    <div className='auth-page'>
      <section className='auth-hero'>
        <div className='auth-brand'>
          <span className='auth-brand-mark'>⚽</span>
          Court Booking
        </div>
        <div>
          <h1>Book your court. <span>Play your game.</span></h1>
          <p>Find sports courts near you, pick a slot and confirm your booking in seconds.</p>
        </div>
        <div className='auth-stats'>
          <div><strong>100+</strong><small>Courts</small></div>
          <div><strong>24/7</strong><small>Online booking</small></div>
          <div><strong>Instant</strong><small>Confirmation</small></div>
        </div>
      </section>
      <section className='auth-panel'>
        <loginContext.Provider value={{login , setLogin}}>
          {login?<Logincard />: <Signupcard/>}
        </loginContext.Provider>
      </section>
    </div>
  )
}

export default Login
