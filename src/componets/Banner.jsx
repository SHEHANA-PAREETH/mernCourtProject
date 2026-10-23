import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const stats=[
  { value:'100+', label:'Courts listed' },
  { value:'24/7', label:'Online booking' },
  { value:'6+', label:'Sports covered' },
  { value:'< 1 min', label:'To confirm a slot' },
]

function Banner() {
  const { user }=useSelector((state)=>state.user)
  const isVendor=user.role===2

  return (
    <>
      <section className='hero'>
        <div className='home-wrap'>
          <span className='hero-badge'><i></i> Courts open for booking today</span>
          <h1>Book your court. <span>Play your game.</span></h1>
          <p>The flexible, affordable way to find and reserve football, tennis, cricket and more, with live availability and instant confirmation.</p>
          <div className='hero-actions'>
            {isVendor ? (
              <>
                <Link to='/registercourt' className='home-btn primary'>Register a court <FontAwesomeIcon icon={faArrowRight}/></Link>
                <Link to='/mycourts' className='home-btn ghost'>Manage my courts</Link>
              </>
            ) : (
              <>
                <Link to='/userallcourts' className='home-btn primary'>Browse courts <FontAwesomeIcon icon={faArrowRight}/></Link>
                <Link to='/userBookings' className='home-btn ghost'>My bookings</Link>
              </>
            )}
          </div>
        </div>
      </section>
      <div className='home-wrap'>
        <div className='hero-stats'>
          {stats.map((stat)=>(
            <div className='hero-stat' key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Banner
