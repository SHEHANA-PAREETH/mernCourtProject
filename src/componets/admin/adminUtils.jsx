import React from 'react'
import { imageUrl } from '../../config/imageUrl'

export const initials=(first='',last='')=>`${first.charAt(0)}${last.charAt(0)}`.toUpperCase() || '?'

export const Avatar=({user})=>(
  <span className='avatar'>
    {user.profilepic
      ? <img src={imageUrl(user.profilepic)} alt=''/>
      : initials(user.firstName,user.lastName)}
  </span>
)

export const StatusBadge=({blocked})=>(
  <span className={`adm-badge ${blocked?'bad':'ok'}`}>{blocked?'Blocked':'Active'}</span>
)

// dates are stored at UTC midnight, so format in UTC to avoid showing the previous day
export const formatDate=(value)=>
  new Date(value).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})

export const formatDateTime=(value)=>
  new Date(value).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'})

export const inr=(amount)=>`₹${Number(amount||0).toLocaleString('en-IN')}`

export const TableSkeleton=()=>(
  <div>{[1,2,3,4].map((n)=><div className='adm-skel' key={n}/>)}</div>
)
