import React from 'react'
import { TIMINGS } from '../Constants/timings'

// Hourly slot chooser shared by the "create schedule" and "add slots" dialogs.
// selected: [{name,id}], disabledIds: ids that already exist and cannot be picked
function SlotPicker({selected, onChange, disabledIds=[]}) {
  const isOn=(slot)=>selected.some((item)=>item.id===slot.id)
  const available=TIMINGS.filter((slot)=>!disabledIds.includes(slot.id))

  const toggle=(slot)=>{
    onChange(isOn(slot) ? selected.filter((item)=>item.id!==slot.id) : [...selected,slot].sort((a,b)=>a.id-b.id))
  }

  const pickRange=(from,to)=>onChange(available.filter((slot)=>slot.id>=from && slot.id<=to))

  return (
    <div>
      <div className='vc-picker-head'>
        <label>Time slots</label>
        <div className='vc-quick'>
          <button type='button' onClick={()=>pickRange(6,21)}>6am – 10pm</button>
          <button type='button' onClick={()=>pickRange(0,23)}>All day</button>
          <button type='button' onClick={()=>onChange([])}>Clear</button>
        </div>
      </div>
      <div className='vc-picker'>
        {TIMINGS.map((slot)=>(
          <button
            key={slot.id}
            type='button'
            className={`vc-pick${isOn(slot)?' on':''}`}
            disabled={disabledIds.includes(slot.id)}
            onClick={()=>toggle(slot)}
          >{slot.name}</button>
        ))}
      </div>
      <div className='vc-count'>{selected.length} slot{selected.length===1?'':'s'} selected</div>
    </div>
  )
}

export default SlotPicker
