import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Homesection5() {
  const { user }=useSelector((state)=>state.user)
  const isVendor=user.role===2

  return (
    <section className='cta'>
      <div className='home-wrap'>
        <div className='cta-box'>
          <div>
            <h2>{isVendor ? 'Fill your courts with players' : 'Ready for your next game?'}</h2>
            <p>{isVendor ? 'List a court, set your slots and start taking bookings today.' : 'Find a court near you and lock in your slot in seconds.'}</p>
          </div>
          <Link to={isVendor ? '/registercourt' : '/userallcourts'} className='home-btn primary'>
            {isVendor ? 'Register a court' : 'Book a court now'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Homesection5
