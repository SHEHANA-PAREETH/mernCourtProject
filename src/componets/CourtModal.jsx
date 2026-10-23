import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import AxiosInstance from '../config/axiosinstance'
import { ToastError, toastSuccess } from '../plugins/Toast'
import SlotPicker from './SlotPicker'

// "Create schedule": adds the same slots at the same price for a range of dates
function CourtModal({court, courtId, onClose, onDone}) {
  const today=new Date().toLocaleDateString('en-CA')// local YYYY-MM-DD
  const [minStart,setMinStart]=useState(today)
  const [startDate,setStartDate]=useState('')
  const [endDate,setEndDate]=useState('')
  const [cost,setCost]=useState('')
  const [slots,setSlots]=useState([])
  const [saving,setSaving]=useState(false)

  // new dates must start after the latest date that already has slots
  useEffect(()=>{
    AxiosInstance.get('/vendor/getlatestupdateddate',{params:{courtId}}).then((res)=>{
      if(res?.data?.msg==='success'){
        const next=new Date(res.data.minDate)
        next.setUTCDate(next.getUTCDate()+1)
        const nextDay=next.toISOString().split('T')[0]
        setMinStart(nextDay>today ? nextDay : today)
      }
    }).catch(()=>{})
  },[courtId,today])

  const submit=(e)=>{
    e.preventDefault()
    if(!startDate || !endDate) return ToastError('Choose a start and an end date')
    if(endDate<startDate) return ToastError('The end date must be on or after the start date')
    if(!(Number(cost)>0)) return ToastError('Enter the price per slot')
    if(slots.length===0) return ToastError('Select at least one time slot')

    setSaving(true)
    AxiosInstance.post('/vendor/addcourtTimings',{
      starEndDate:{ startingDate:new Date(startDate), endingDate:new Date(endDate) },
      slotLists:slots,
      cost:Number(cost),
      courtId,
    }).then((res)=>{
      if(res.data.msg){
        toastSuccess('Schedule added successfully')
        onDone()
      }
      else{
        ToastError('Something went wrong')
      }
    }).catch(()=>ToastError('Could not add the schedule')).finally(()=>setSaving(false))
  }

  return (
    <Modal isOpen onRequestClose={onClose} className='vc-modal' overlayClassName='vc-overlay' ariaHideApp={false} contentLabel='Create schedule'>
      <form onSubmit={submit} style={{display:'flex',flexDirection:'column',minHeight:0}} noValidate>
        <div className='vc-modal-head'>
          <h3>Create schedule</h3>
          <p>{court.name} · {court.location}</p>
        </div>
        <div className='vc-modal-body'>
          <div className='vc-row'>
            <div className='vc-field'>
              <label htmlFor='vc-start'>Start date</label>
              <input id='vc-start' className='vc-input' type='date' min={minStart} value={startDate} onChange={(e)=>{setStartDate(e.target.value); if(endDate && e.target.value>endDate) setEndDate('')}}/>
            </div>
            <div className='vc-field'>
              <label htmlFor='vc-end'>End date</label>
              <input id='vc-end' className='vc-input' type='date' min={startDate || minStart} value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
            </div>
          </div>
          <div className='vc-field'>
            <label htmlFor='vc-cost'>Price per slot (₹)</label>
            <input id='vc-cost' className='vc-input' type='number' min='1' placeholder='e.g. 800' value={cost} onChange={(e)=>setCost(e.target.value)}/>
          </div>
          <SlotPicker selected={slots} onChange={setSlots}/>
        </div>
        <div className='vc-modal-foot'>
          <button type='button' className='vc-btn ghost' onClick={onClose}>Cancel</button>
          <button type='submit' className='vc-btn' disabled={saving}>{saving?'Saving…':'Create schedule'}</button>
        </div>
      </form>
    </Modal>
  )
}

export default CourtModal
