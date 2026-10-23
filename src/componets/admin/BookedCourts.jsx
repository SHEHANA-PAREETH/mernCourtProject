import React, { useEffect, useMemo, useState } from 'react'
import AdminLayout from './AdminLayout'
import AxiosInstance from '../../config/axiosinstance'
import { ToastError } from '../../plugins/Toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { formatDate, inr, TableSkeleton } from './adminUtils'

function BookedCourts() {
  const [bookings,setBookings]=useState([])
  const [loading,setLoading]=useState(true)
  const [query,setQuery]=useState('')

  useEffect(()=>{
    AxiosInstance.get('/admin/allbookedcourts').then((resp)=>{
      // newest first
      setBookings([...(resp.data.data || [])].sort((a,b)=>new Date(b.date)-new Date(a.date)))
    }).catch(()=>ToastError('Could not load bookings')).finally(()=>setLoading(false))
  },[])

  const filtered=useMemo(()=>{
    const q=query.trim().toLowerCase()
    if(!q) return bookings
    return bookings.filter((b)=>`${b.courts?.name} ${b.vendorname} ${b.users?.firstName} ${b.users?.lastName} ${b.slot?.name}`.toLowerCase().includes(q))
  },[bookings,query])

  const total=filtered.reduce((sum,b)=>sum+(b.cost||0),0)

  return (
    <AdminLayout title='Bookings' subtitle='Every slot that has been booked on the platform.'>
      <div className='adm-card'>
        <div className='adm-card-head'>
          <div>
            <h2>All bookings</h2>
            <small>{loading ? 'Loading…' : `${filtered.length} bookings · ${inr(total)} total`}</small>
          </div>
          <div className='adm-search'>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input type='text' placeholder='Search court, vendor or user…' value={query} onChange={(e)=>setQuery(e.target.value)}/>
          </div>
        </div>
        {loading ? <TableSkeleton/> : filtered.length===0 ? (
          <div className='adm-empty'>{bookings.length===0 ? 'No bookings yet.' : `Nothing matches “${query}”.`}</div>
        ) : (
          <div className='adm-table-wrap'>
            <table className='adm-table'>
              <thead>
                <tr><th>Court</th><th>Vendor</th><th>Booked by</th><th>Date</th><th>Slot</th><th>Cost</th></tr>
              </thead>
              <tbody>
                {filtered.map((b)=>(
                  <tr key={b._id}>
                    <td><strong>{b.courts?.name}</strong></td>
                    <td data-label='Vendor'>{b.vendorname}</td>
                    <td data-label='Booked by'>{b.users?.firstName} {b.users?.lastName}</td>
                    <td data-label='Date'>{formatDate(b.date)}</td>
                    <td data-label='Slot'>{b.slot?.name}</td>
                    <td data-label='Cost' className='adm-money'>{inr(b.cost)}</td>
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

export default BookedCourts
