import React, { useEffect, useMemo, useState } from 'react'
import AdminLayout from './AdminLayout'
import AxiosInstance from '../../config/axiosinstance'
import { ToastError } from '../../plugins/Toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { formatDate, formatDateTime, inr, TableSkeleton } from './adminUtils'

function CancelledCourts() {
  const [rows,setRows]=useState([])
  const [loading,setLoading]=useState(true)
  const [query,setQuery]=useState('')

  useEffect(()=>{
    AxiosInstance.get('/admin/cancelledcourts').then((resp)=>{
      // one row per cancellation, newest cancellation first
      const flat=(resp.data.data || []).flatMap((slot)=>
        (slot.canellation || []).map((c,index)=>({...slot,cancel:c,key:`${slot._id}-${index}`})))
      setRows(flat.sort((a,b)=>new Date(b.cancel.timeStamp)-new Date(a.cancel.timeStamp)))
    }).catch(()=>ToastError('Could not load cancellations')).finally(()=>setLoading(false))
  },[])

  const filtered=useMemo(()=>{
    const q=query.trim().toLowerCase()
    if(!q) return rows
    return rows.filter((r)=>`${r.courts?.name} ${r.cancel.username} ${r.slot?.name}`.toLowerCase().includes(q))
  },[rows,query])

  return (
    <AdminLayout title='Cancellations' subtitle='Bookings that users have cancelled. Amounts are refunded to their wallets.'>
      <div className='adm-card'>
        <div className='adm-card-head'>
          <div>
            <h2>All cancellations</h2>
            <small>{loading ? 'Loading…' : `${filtered.length} cancellations`}</small>
          </div>
          <div className='adm-search'>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input type='text' placeholder='Search court or user…' value={query} onChange={(e)=>setQuery(e.target.value)}/>
          </div>
        </div>
        {loading ? <TableSkeleton/> : filtered.length===0 ? (
          <div className='adm-empty'>{rows.length===0 ? 'No bookings have been cancelled.' : `Nothing matches “${query}”.`}</div>
        ) : (
          <div className='adm-table-wrap'>
            <table className='adm-table'>
              <thead>
                <tr><th>Court</th><th>Slot date</th><th>Slot</th><th>Cancelled by</th><th>Cancelled at</th><th>Refund</th></tr>
              </thead>
              <tbody>
                {filtered.map((r)=>(
                  <tr key={r.key}>
                    <td><strong>{r.courts?.name}</strong></td>
                    <td data-label='Slot date'>{formatDate(r.date)}</td>
                    <td data-label='Slot'>{r.slot?.name}</td>
                    <td data-label='Cancelled by'>{r.cancel.username}</td>
                    <td data-label='Cancelled at'>{formatDateTime(r.cancel.timeStamp)}</td>
                    <td data-label='Refund' className='adm-money'>{inr(r.cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default CancelledCourts
