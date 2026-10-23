import React, { useEffect, useState } from 'react'
import './courts.css'
import './SINglecourtUserDetails.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AxiosInstance from '../config/axiosinstance';
import { imageUrl } from '../config/imageUrl';
import Navcomponent from '../componets/Navcomponent';
import TimesheduleComponent from '../componets/TimesheduleComponent';
import { ToastError } from '../plugins/Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faChevronLeft, faChevronRight, faArrowLeft, faImage } from '@fortawesome/free-solid-svg-icons'

const uploadUrl=imageUrl

function SINglecourtUserDetails() {
  const navigate=useNavigate()
  const {id}=useParams()
  const [court,setCourt]=useState(null)
  const [imageIndex,setImageIndex]=useState(0)
  const [dates,setDates]=useState([])
  const [selectedDate,setSelectedDate]=useState('')
  const [slots,setSlots]=useState([])
  const [slotsLoading,setSlotsLoading]=useState(false)

  const handleUnauthorised=(err)=>{
    if(err?.response?.data?.message==="unauthorized request"){
      localStorage.clear()
      navigate('/')
      return true
    }
    return false
  }

  useEffect(()=>{
    AxiosInstance.get('/getusersinglecourt',{params:{courtId:id}}).then((res)=>{
      setCourt(res.data)
      const available=(res.data.schedules||[]).map((obj)=>obj._id.split('T')[0])
      setDates(available)
      if(available.length){
        loadSlots(available[0])
      }
    }).catch((err)=>{
      if(!handleUnauthorised(err)) ToastError('Could not load this court')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id])

  const loadSlots=(date)=>{
    setSelectedDate(date)
    setSlotsLoading(true)
    const today=new Date().toISOString().split('T')[0]
    const currentHour= today===new Date(date).toISOString().split('T')[0] ? new Date().getHours() : -1
    AxiosInstance.get('/getslotsdata',{params:{date:new Date(date),courtId:id,currentHour:currentHour}}).then((resp)=>{
      setSlots(resp.data.message==="success" ? [...resp.data.data].sort((a,b)=>a.slot.id-b.slot.id) : [])
    }).catch((err)=>{
      handleUnauthorised(err)
    }).finally(()=>setSlotsLoading(false))
  }

  if(!court){
    return (
      <div className='courts-page'>
        <Navcomponent/>
        <div className='courts-wrap'>
          <div className='cd-layout'>
            <div className='court-skeleton' style={{height:440}}/>
            <div className='court-skeleton' style={{height:440}}/>
          </div>
        </div>
      </div>
    )
  }

  const images=(court.images||[]).map((img)=>img.filename)
  const next=()=>setImageIndex((imageIndex+1)%images.length)
  const prev=()=>setImageIndex((imageIndex-1+images.length)%images.length)
  const formatDate=(date)=>{
    const d=new Date(date+'T00:00:00')
    return {
      day:d.toLocaleDateString('en-IN',{weekday:'short'}),
      num:d.getDate(),
      month:d.toLocaleDateString('en-IN',{month:'short'}),
    }
  }

  return (
    <div className='courts-page'>
      <Navcomponent/>
      <div className='courts-wrap'>
        <div style={{paddingTop:24}}>
          <Link to='/userallcourts' className='court-loc' style={{textDecoration:'none'}}><FontAwesomeIcon icon={faArrowLeft}/> All courts</Link>
        </div>

        <div className='cd-layout'>
          <div>
            <div className='cd-main'>
              {images.length ? <img src={uploadUrl(images[imageIndex])} alt={court.name}/> : <div className='court-img'><div className='placeholder'><FontAwesomeIcon icon={faImage}/></div></div>}
              {images.length>1 && (
                <>
                  <button className='cd-arrow prev' onClick={prev} aria-label='Previous photo'><FontAwesomeIcon icon={faChevronLeft}/></button>
                  <button className='cd-arrow next' onClick={next} aria-label='Next photo'><FontAwesomeIcon icon={faChevronRight}/></button>
                  <span className='cd-counter'>{imageIndex+1} / {images.length}</span>
                </>
              )}
            </div>
            {images.length>1 && (
              <div className='cd-thumbs'>
                {images.map((filename,index)=>(
                  <button key={filename+index} className={`cd-thumb${index===imageIndex?' active':''}`} onClick={()=>setImageIndex(index)} aria-label={`Photo ${index+1}`}>
                    <img src={uploadUrl(filename)} alt=''/>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className='cd-info'>
            <span className='court-loc'><FontAwesomeIcon icon={faLocationDot}/> {court.location}</span>
            <h1>{court.name}</h1>
            <p>{court.description}</p>
            <div className='cd-facts'>
              <div className='cd-fact'><small>Available days</small><strong>{dates.length || 'None'}</strong></div>
              <div className='cd-fact'><small>Booking</small><strong>Instant confirmation</strong></div>
              <div className='cd-fact'><small>Payment</small><strong>Razorpay or wallet</strong></div>
              <div className='cd-fact'><small>Cancellation</small><strong>Free from My Bookings</strong></div>
            </div>
            {dates.length>0 && <a href='#book' className='courts-btn'>Book a slot</a>}
          </div>
        </div>

        <section className='cd-booking' id='book'>
          <h2>Choose a date and time</h2>
          <p className='sub'>Pick a day, then tap a slot to book it.</p>

          {dates.length===0 ? (
            <div className='cd-empty'>No dates are open for booking right now. Please check back soon.</div>
          ) : (
            <>
              <span className='cd-label'>Available dates</span>
              <div className='cd-dates'>
                {dates.map((date)=>{
                  const f=formatDate(date)
                  return (
                    <button key={date} className={`cd-date${date===selectedDate?' active':''}`} onClick={()=>loadSlots(date)}>
                      <small>{f.day}</small>
                      <strong>{f.num}</strong>
                      <span>{f.month}</span>
                    </button>
                  )
                })}
              </div>

              <span className='cd-label'>Time slots</span>
              <div className='cd-legend'>
                <span><i className='free'></i>Available</span>
                <span><i className='taken'></i>Booked</span>
              </div>
              {slotsLoading ? (
                <div className='cd-slots'>{[1,2,3,4,5,6].map((n)=><div className='court-skeleton' style={{height:64,borderRadius:12}} key={n}/>)}</div>
              ) : slots.length===0 ? (
                <div className='cd-empty'>No slots left on this day. Try another date.</div>
              ) : (
                <div className='cd-slots'>
                  {slots.map((slot)=><TimesheduleComponent key={slot._id} data={slot}/>)}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default SINglecourtUserDetails
