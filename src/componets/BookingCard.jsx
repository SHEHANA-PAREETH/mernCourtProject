import React, { useEffect, useState } from 'react'
import AxiosInstance from '../config/axiosinstance'
import { imageUrl } from '../config/imageUrl'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faClock, faUser, faImage } from '@fortawesome/free-solid-svg-icons'
import { ToastError, toastSuccess } from '../plugins/Toast'

const STATUS_LABEL={ upcoming:'Upcoming', past:'Completed', cancelled:'Cancelled' }

function BookingCard({booking, status, onCancelled}) {
  const [ownerName,setOwnerName]=useState('')
  const [cancelling,setCancelling]=useState(false)
  const court=booking.courts || {}
  const cover=court.image?.[0]?.filename
  const day=new Date(booking.date)

  useEffect(()=>{
    if(!court.userId) return
    AxiosInstance.get('vendor/getownerdetails',{params:{vendorId:court.userId}}).then((resp)=>{
      setOwnerName(`${resp.data.data.firstName} ${resp.data.data.lastName}`)
    }).catch(()=>{})
  },[court.userId])

  const cancelBooking=()=>{
    Swal.fire({
      title: 'Cancel this booking?',
      text: 'The amount will be refunded to your wallet.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b42318',
      cancelButtonColor: '#6b7a77',
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'Keep booking'
    }).then((result)=>{
      if(!result.isConfirmed) return
      setCancelling(true)
      AxiosInstance.get('payment/cancelBooking',{params:{shedulesid:booking._id}}).then((resp)=>{
        if(resp.data.data){
          toastSuccess('Booking cancelled, refund added to your wallet')
          onCancelled && onCancelled()
        }
      }).catch(()=>{
        ToastError('Could not cancel the booking')
      }).finally(()=>setCancelling(false))
    })
  }

  return (
    <article className={`bk-card ${status}`}>
      <div className='bk-img'>
        {cover
          ? <img src={imageUrl(cover)} alt={court.name} loading='lazy'/>
          : <div className='court-img'><div className='placeholder'><FontAwesomeIcon icon={faImage}/></div></div>}
      </div>

      <div className='bk-main'>
        <div className='bk-date'>
          <small>{day.toLocaleDateString('en-IN',{month:'short',timeZone:'UTC'})}</small>
          <strong>{day.getUTCDate()}</strong>
          <small>{day.toLocaleDateString('en-IN',{weekday:'short',timeZone:'UTC'})}</small>
        </div>
        <div className='bk-info'>
          <h3>{court.name}</h3>
          <ul className='bk-meta'>
            <li><FontAwesomeIcon icon={faClock}/> {booking.slot?.name}</li>
            <li><FontAwesomeIcon icon={faLocationDot}/> {court.location}</li>
            {ownerName && <li><FontAwesomeIcon icon={faUser}/> {ownerName}</li>}
            {status==='cancelled' && booking.canellation?.timeStamp && (
              <li>Cancelled on {new Date(booking.canellation.timeStamp).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'})}</li>
            )}
          </ul>
        </div>
      </div>

      <div className='bk-side'>
        <span className={`bk-badge ${status}`}>{STATUS_LABEL[status]}</span>
        <span className='bk-price'>₹{booking.cost}</span>
        {status==='upcoming' && (
          <button className='bk-cancel' onClick={cancelBooking} disabled={cancelling}>
            {cancelling?'Cancelling…':'Cancel booking'}
          </button>
        )}
      </div>
    </article>
  )
}

export default BookingCard
