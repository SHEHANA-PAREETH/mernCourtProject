import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navcomponent from '../componets/Navcomponent'
import BookingCard from '../componets/BookingCard'
import AxiosInstance from '../config/axiosinstance'
import { ToastError } from '../plugins/Toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faClockRotateLeft, faBan } from '@fortawesome/free-solid-svg-icons'
import './courts.css'
import './bookings.css'

const TABS=[
  { key:'upcoming', label:'Upcoming', url:'/getSingleUserBookings', icon:faCalendarCheck,
    empty:{ title:'No upcoming bookings', text:'Book a court and your upcoming games will show up here.' } },
  { key:'past', label:'Previous', url:'/getPreviousUserBookings', icon:faClockRotateLeft,
    empty:{ title:'No previous bookings', text:'Games you have already played will be listed here.' } },
  { key:'cancelled', label:'Cancelled', url:'/getCancelledUserBookings', icon:faBan,
    empty:{ title:'No cancelled bookings', text:"You haven't cancelled any bookings." } },
]

function UserBooking({initialTab='upcoming'}) {
  const navigate=useNavigate()
  const [tab,setTab]=useState(initialTab)
  const [data,setData]=useState({ upcoming:[], past:[], cancelled:[] })
  const [loading,setLoading]=useState(true)

  const load=useCallback(()=>{
    Promise.all(TABS.map((t)=>AxiosInstance.get(t.url).then((res)=>res?.data?.data || []))).then(([upcoming,past,cancelled])=>{
      setData({ upcoming, past, cancelled })
    }).catch((err)=>{
      if(err?.response?.data?.message==='unauthorized request'){
        localStorage.clear()
        navigate('/')
      }
      else{
        ToastError('Could not load your bookings')
      }
    }).finally(()=>setLoading(false))
  },[navigate])

  useEffect(()=>{ load() },[load])

  const current=TABS.find((t)=>t.key===tab)
  const items=data[tab]

  return (
    <div className='courts-page'>
      <Navcomponent/>
      <section className='courts-hero'>
        <div className='courts-wrap courts-hero-row'>
          <div>
            <h1>My bookings</h1>
            <p>See your upcoming games, revisit past ones and manage cancellations.</p>
          </div>
          <Link to='/userallcourts' className='courts-btn'>Book another court</Link>
        </div>
      </section>

      <div className='courts-wrap'>
        <div className='bk-tabs' role='tablist'>
          {TABS.map((t)=>(
            <button key={t.key} role='tab' aria-selected={tab===t.key} className={`bk-tab${tab===t.key?' active':''}`} onClick={()=>setTab(t.key)}>
              <FontAwesomeIcon icon={t.icon}/> {t.label}
              <span className='count'>{data[t.key].length}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className='bk-list'>
            {[1,2].map((n)=><div className='court-skeleton' style={{height:190}} key={n}/>)}
          </div>
        ) : items.length===0 ? (
          <div className='courts-empty' style={{marginTop:28}}>
            <div className='icon'><FontAwesomeIcon icon={current.icon}/></div>
            <h3>{current.empty.title}</h3>
            <p>{current.empty.text}</p>
            <Link to='/userallcourts' className='courts-btn'>Browse courts</Link>
          </div>
        ) : (
          <div className='bk-list'>
            {items.map((booking)=>(
              <BookingCard key={booking._id+(booking.canellation?.timeStamp||'')} booking={booking} status={tab} onCancelled={load}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserBooking
