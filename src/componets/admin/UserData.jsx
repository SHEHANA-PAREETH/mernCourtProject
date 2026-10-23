import React from 'react'
import AdminLayout from './AdminLayout'
import AccountsTable from './AccountsTable'
import AxiosInstance from '../../config/axiosinstance'
import { formatDate, inr } from './adminUtils'

// getbookedDetails groups slots by date, flatten it into one row per booking
const loadBookings=(user)=>
  AxiosInstance.get('/admin/getbookedDetails',{params:{id:user._id}}).then((resp)=>
    (resp?.data?.data || []).flatMap((day)=>day.slotsData.map((slot)=>({...slot,date:day._id}))))

const renderBookings=(bookings)=>
  bookings.length===0 ? <div className='adm-empty'>This user hasn't booked any courts yet.</div> : (
    <table className='adm-table'>
      <thead><tr><th>Court</th><th>Date</th><th>Slot</th><th>Cost</th></tr></thead>
      <tbody>
        {bookings.map((booking)=>(
          <tr key={booking.id}>
            <td data-label='Court'>{booking.courts?.name}</td>
            <td data-label='Date'>{formatDate(booking.date)}</td>
            <td data-label='Slot'>{booking.slot?.name}</td>
            <td data-label='Cost' className='adm-money'>{inr(booking.cost)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )

function UserData() {
  return (
    <AdminLayout title='Users' subtitle='Players who have signed up. Block accounts or review their bookings.'>
      <AccountsTable
        title='All users'
        listUrl='/admin/getuserdata'
        noun='user'
        detailsLabel='Bookings'
        detailsTitle='Bookings'
        loadDetails={loadBookings}
        renderDetails={renderBookings}
      />
    </AdminLayout>
  )
}

export default UserData
