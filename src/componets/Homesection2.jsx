import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCreditCard, faCalendarCheck, faChartLine, faUsers, faShieldHalved } from '@fortawesome/free-solid-svg-icons'

const features=[
  { icon:faClock, title:'Book 24/7 online', text:'Reserve a court any time of day. No calls, no waiting, no back-and-forth.' },
  { icon:faCalendarCheck, title:'Live availability', text:'See open slots in real time so you never turn up to a double-booked court.' },
  { icon:faCreditCard, title:'Secure online payment', text:'Pay upfront with trusted payment options, or use your wallet balance.' },
  { icon:faUsers, title:'Built for players and vendors', text:'Players find and book courts. Vendors list courts and manage their slots.' },
  { icon:faChartLine, title:'Clear overview', text:'Keep track of bookings, cancellations and occupancy in one dashboard.' },
  { icon:faShieldHalved, title:'Easy cancellations', text:'Plans change. Cancel a booking in a click and see your refund in your wallet.' },
]

function Homesection2() {
  return (
    <section className='home-section alt'>
      <div className='home-wrap home-head'>
        <span className='home-eyebrow'>Why bookmycourt</span>
        <h2 className='home-title'>Everything you need to book and manage courts</h2>
        <p className='home-lead'>One place for players to play more and for venues to stay full.</p>
        <div className='feature-grid' style={{textAlign:'left'}}>
          {features.map((feature)=>(
            <div className='feature-card' key={feature.title}>
              <div className='icon'><FontAwesomeIcon icon={feature.icon}/></div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Homesection2
