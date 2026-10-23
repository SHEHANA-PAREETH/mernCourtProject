import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AxiosInstance from '../config/axiosinstance'
import Navcomponent from '../componets/Navcomponent'
import CourtModal from '../componets/CourtModal'
import AddSlotModal from '../componets/AddSlotModal'
import SingleSlotDetailsModal from '../componets/SingleSlotDetailsModal'
import { ToastError } from '../plugins/Toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faChevronLeft, faChevronRight, faArrowLeft, faImage, faPlus } from '@fortawesome/free-solid-svg-icons'
import './courts.css'
import './SINglecourtUserDetails.css'
import './vendorCourt.css'

const uploadUrl=imageUrl
const todayUtc=()=>new Date().toLocaleDateString('en-CA')// the calendar day in India, matching how slot dates are stored

function SinglecardDetails() {
  const navigate=useNavigate()
  const {id}=useParams()
  const [court,setCourt]=useState(null)
  const [imageIndex,setImageIndex]=useState(0)
  const [days,setDays]=useState(null)// [{_id,slotsData:[{slot,cost,id,booked}]}]
  const [range,setRange]=useState({ start:'', end:'' })
  const [rangeActive,setRangeActive]=useState(false)
  const [createOpen,setCreateOpen]=useState(false)
  const [addSlotsFor,setAddSlotsFor]=useState(null)
  const [slotDetails,setSlotDetails]=useState(null)

  const handleUnauthorised=useCallback((err)=>{
    if(err?.response?.data?.message==='unauthorized request'){
      localStorage.clear()
      navigate('/')
      return true
    }
    return false
  },[navigate])

  const loadSchedules=useCallback((activeRange)=>{
    const request= activeRange
      ? AxiosInstance.get('vendor/gettabledata',{params:{id,startDate:activeRange.start,endDate:activeRange.end}})
      : AxiosInstance.get('/vendor/getallshedulesdata',{params:{courtId:id}})
    return request.then((res)=>setDays(res.data.data || [])).catch((err)=>{
      if(!handleUnauthorised(err)) ToastError('Could not load the schedule')
      setDays([])
    })
  },[id,handleUnauthorised])

  useEffect(()=>{
    AxiosInstance.get('vendor/getSinglecourtdetails',{params:{courtId:id}}).then((res)=>setCourt(res.data)).catch((err)=>{
      if(!handleUnauthorised(err)) ToastError('Could not load this court')
    })
    loadSchedules(null)
  },[id,handleUnauthorised,loadSchedules])

  const stats=useMemo(()=>{
    const all=(days||[]).flatMap((day)=>day.slotsData)
    return { days:(days||[]).length, total:all.length, booked:all.filter((slot)=>slot.booked).length }
  },[days])

  const applyRange=(e)=>{
    e.preventDefault()
    if(!range.start || !range.end) return ToastError('Choose both a start and an end date')
    if(range.end<range.start) return ToastError('The end date must be on or after the start date')
    setDays(null)
    setRangeActive(true)
    loadSchedules(range)
  }

  const resetRange=()=>{
    setRange({ start:'', end:'' })
    setRangeActive(false)
    setDays(null)
    loadSchedules(null)
  }

  const refresh=()=>{
    setCreateOpen(false)
    setAddSlotsFor(null)
    setDays(null)
    loadSchedules(rangeActive ? range : null)
  }

  const showDetails=(slotName,date)=>{
    AxiosInstance.get('/vendor/showSlotBookingDetails',{params:{slotname:slotName,date,courtId:id}}).then((resp)=>{
      if(resp.data.data?.length) setSlotDetails(resp.data.data)
    }).catch(()=>ToastError('Could not load the slot details'))
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
  const dayParts=(value)=>{
    const d=new Date(value)
    return {
      month:d.toLocaleDateString('en-IN',{month:'short',timeZone:'UTC'}),
      num:d.getUTCDate(),
      weekday:d.toLocaleDateString('en-IN',{weekday:'short',timeZone:'UTC'}),
    }
  }

  return (
    <div className='courts-page'>
      <Navcomponent/>
      <div className='courts-wrap'>
        <div style={{paddingTop:24}}>
          <Link to='/mycourts' className='court-loc' style={{textDecoration:'none'}}><FontAwesomeIcon icon={faArrowLeft}/> My courts</Link>
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
              <div className='cd-fact'><small>Days scheduled</small><strong>{days===null ? '–' : stats.days}</strong></div>
              <div className='cd-fact'><small>Total slots</small><strong>{days===null ? '–' : stats.total}</strong></div>
              <div className='cd-fact'><small>Booked</small><strong>{days===null ? '–' : stats.booked}</strong></div>
              <div className='cd-fact'><small>Still open</small><strong>{days===null ? '–' : stats.total-stats.booked}</strong></div>
            </div>
            <button className='courts-btn' style={{width:'100%',marginTop:22,border:0,cursor:'pointer'}} onClick={()=>setCreateOpen(true)}>
              <FontAwesomeIcon icon={faPlus}/> Create schedule
            </button>
          </div>
        </div>

        <section className='vc-section'>
          <div className='vc-head'>
            <div>
              <h2>{rangeActive ? 'Schedule for selected dates' : 'Upcoming schedule'}</h2>
              <p>Tap a slot to see who booked it. Use “Add slots” to open more times on a day.</p>
            </div>
            <form className='vc-filter' onSubmit={applyRange}>
              <div><label htmlFor='vc-from'>From</label><input id='vc-from' type='date' value={range.start} onChange={(e)=>setRange({...range,start:e.target.value})}/></div>
              <div><label htmlFor='vc-to'>To</label><input id='vc-to' type='date' min={range.start} value={range.end} onChange={(e)=>setRange({...range,end:e.target.value})}/></div>
              <button type='submit' className='vc-btn'>Filter</button>
              {rangeActive && <button type='button' className='vc-btn ghost' onClick={resetRange}>Reset</button>}
            </form>
          </div>

          <div className='vc-legend'>
            <span><i className='free'></i>Open</span>
            <span><i className='taken'></i>Booked</span>
          </div>

          {days===null ? (
            <div className='vc-days'>{[1,2,3].map((n)=><div className='court-skeleton' style={{height:96,borderRadius:16}} key={n}/>)}</div>
          ) : days.length===0 ? (
            <div className='courts-empty' style={{margin:0}}>
              <h3>{rangeActive ? 'No slots on those dates' : 'No upcoming slots yet'}</h3>
              <p>{rangeActive ? 'Try a different date range.' : 'Create a schedule so players can start booking this court.'}</p>
              {!rangeActive && <button className='courts-btn' style={{border:0,cursor:'pointer'}} onClick={()=>setCreateOpen(true)}><FontAwesomeIcon icon={faPlus}/> Create schedule</button>}
            </div>
          ) : (
            <div className='vc-days'>
              {days.map((day)=>{
                const parts=dayParts(day._id)
                const isPast=day._id.split('T')[0]<todayUtc()
                return (
                  <div className='vc-day' key={day._id}>
                    <div className={`vc-date${isPast?' past':''}`}>
                      <small>{parts.month}</small>
                      <strong>{parts.num}</strong>
                      <small>{parts.weekday}</small>
                    </div>
                    <div className='vc-chips'>
                      {[...day.slotsData].sort((a,b)=>a.slot.id-b.slot.id).map((slot)=>(
                        <button key={slot.id} className={`vc-chip${slot.booked?' booked':''}`} title={`₹${slot.cost}${slot.booked?' · booked':''}`} onClick={()=>showDetails(slot.slot.name,day._id)}>
                          {slot.slot.name}
                        </button>
                      ))}
                      {!isPast && (
                        <button className='vc-chip add' onClick={()=>setAddSlotsFor(day)}>+ Add slots</button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>

      {createOpen && <CourtModal court={court} courtId={id} onClose={()=>setCreateOpen(false)} onDone={refresh}/>}
      {addSlotsFor && <AddSlotModal date={addSlotsFor._id} existingSlots={addSlotsFor.slotsData} courtId={id} onClose={()=>setAddSlotsFor(null)} onDone={refresh}/>}
      {slotDetails && <SingleSlotDetailsModal slotData={slotDetails} onClose={()=>setSlotDetails(null)}/>}
    </div>
  )
}

export default SinglecardDetails
