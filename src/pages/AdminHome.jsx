import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import AdminLayout from '../componets/admin/AdminLayout'
import AxiosInstance from '../config/axiosinstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faStore, faFutbol, faTicket, faIndianRupeeSign, faBan } from '@fortawesome/free-solid-svg-icons'
import { formatDate, inr, TableSkeleton } from '../componets/admin/adminUtils'

const STAT_CARDS=[
  { key:'users', label:'Users', icon:faUsers },
  { key:'vendors', label:'Vendors', icon:faStore, tone:'blue' },
  { key:'courts', label:'Courts', icon:faFutbol },
  { key:'bookings', label:'Bookings', icon:faTicket, tone:'gold' },
  { key:'revenue', label:'Booking value', icon:faIndianRupeeSign, tone:'gold', money:true },
  { key:'cancellations', label:'Cancellations', icon:faBan, tone:'red' },
]

function AdminHome() {
  const [stats,setStats]=useState(null)
  const [chart,setChart]=useState({ labels:[], datasets:[] })
  const [recent,setRecent]=useState(null)

  useEffect(()=>{
    AxiosInstance.get('/admin/stats').then((resp)=>setStats(resp.data.data)).catch(()=>setStats({}))

    AxiosInstance.get('/admin/chartdata').then((resp)=>{
      const days=resp.data.data || []
      setChart({
        labels: days.map((day)=>formatDate(day._id)),
        datasets:[{
          label:'Bookings',
          data: days.map((day)=>day.slotsData.length),
          backgroundColor:'#0d4a42',
          hoverBackgroundColor:'#f59e0b',
          borderRadius:8,
          maxBarThickness:48,
        }]
      })
    }).catch(()=>{})

    AxiosInstance.get('/admin/allbookedcourts').then((resp)=>{
      const all=resp.data.data || []
      setRecent([...all].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5))
    }).catch(()=>setRecent([]))
  },[])

  return (
    <AdminLayout title='Dashboard' subtitle='A quick look at how bookmycourt is doing.'>
      <div className='adm-stats'>
        {STAT_CARDS.map((card)=>(
          <div className={`adm-stat ${card.tone||''}`} key={card.key}>
            <span className='icon'><FontAwesomeIcon icon={card.icon}/></span>
            <div>
              <strong>{stats ? (card.money ? inr(stats[card.key]) : (stats[card.key] ?? 0)) : '–'}</strong>
              <span>{card.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className='adm-card'>
        <div className='adm-card-head'>
          <div><h2>Bookings per day</h2><small>Number of slots booked on each date</small></div>
        </div>
        <div className='adm-chart'>
          {chart.labels.length===0
            ? <div className='adm-empty'>No bookings yet, the chart will appear after the first one.</div>
            : <Bar data={chart} options={{
                maintainAspectRatio:false,
                plugins:{ legend:{ display:false } },
                scales:{ y:{ beginAtZero:true, ticks:{ precision:0 }, grid:{ color:'#eef2f1' } }, x:{ grid:{ display:false } } },
              }}/>}
        </div>
      </div>

      <div className='adm-card'>
        <div className='adm-card-head'>
          <div><h2>Recent bookings</h2><small>Latest five</small></div>
          <Link to='/Bookedcourts' className='adm-btn'>View all</Link>
        </div>
        {recent===null ? <TableSkeleton/> : recent.length===0 ? <div className='adm-empty'>No bookings yet.</div> : (
          <div className='adm-table-wrap'>
            <table className='adm-table'>
              <thead><tr><th>Court</th><th>Booked by</th><th>Date</th><th>Slot</th><th>Cost</th></tr></thead>
              <tbody>
                {recent.map((b)=>(
                  <tr key={b._id}>
                    <td><strong>{b.courts?.name}</strong></td>
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

export default AdminHome
