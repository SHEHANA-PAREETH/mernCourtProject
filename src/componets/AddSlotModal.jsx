import React, { useState } from 'react'
import Modal from 'react-modal'
import AxiosInstance from '../config/axiosinstance'
import { ToastError, toastSuccess } from '../plugins/Toast'
import SlotPicker from './SlotPicker'

// "Add slots": adds more time slots to one date that already has a schedule
function AddSlotModal({date, existingSlots, courtId, onClose, onDone}) {
  const [cost,setCost]=useState(existingSlots[0]?.cost ? String(existingSlots[0].cost) : '')
  const [slots,setSlots]=useState([])
  const [saving,setSaving]=useState(false)
  const existingIds=existingSlots.map((item)=>item.slot.id)

  const submit=(e)=>{
    e.preventDefault()
    if(!(Number(cost)>0)) return ToastError('Enter the price per slot')
    if(slots.length===0) return ToastError('Select at least one time slot')

    setSaving(true)
    AxiosInstance.post('vendor/addslotsopreviousslots',{
      data:{ date, cost:Number(cost), courtId },
      pushedSlots:slots,
    }).then((resp)=>{
      if(resp.data.msg==='shedules added successfully'){
        toastSuccess('Slots added successfully')
        onDone()
      }
    }).catch(()=>ToastError('Could not add the slots')).finally(()=>setSaving(false))
  }

  return (
    <Modal isOpen onRequestClose={onClose} className='vc-modal' overlayClassName='vc-overlay' ariaHideApp={false} contentLabel='Add slots'>
      <form onSubmit={submit} style={{display:'flex',flexDirection:'column',minHeight:0}} noValidate>
        <div className='vc-modal-head'>
          <h3>Add slots</h3>
          <p>{new Date(date).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})}</p>
        </div>
        <div className='vc-modal-body'>
          <div className='vc-field'>
            <label htmlFor='as-cost'>Price per slot (₹)</label>
            <input id='as-cost' className='vc-input' type='number' min='1' placeholder='e.g. 800' value={cost} onChange={(e)=>setCost(e.target.value)}/>
          </div>
          <SlotPicker selected={slots} onChange={setSlots} disabledIds={existingIds}/>
        </div>
        <div className='vc-modal-foot'>
          <button type='button' className='vc-btn ghost' onClick={onClose}>Cancel</button>
          <button type='submit' className='vc-btn' disabled={saving}>{saving?'Saving…':'Add slots'}</button>
        </div>
      </form>
    </Modal>
  )
}

export default AddSlotModal
