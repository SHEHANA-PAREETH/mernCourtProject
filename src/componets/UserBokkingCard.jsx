import React, { useEffect, useState } from 'react'
import './UserBookingCard.css'

import AxiosInstance from '../config/axiosinstance'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
function UserBokkingCard({bookingData,upcoming,setUpcoming}) {
  const [ownerName,setOwnerName]=useState()
  
    useEffect(()=>{
      const vendorId=bookingData.courts.userId
      console.log(vendorId);
AxiosInstance.get('vendor/getownerdetails',{params:{vendorId:vendorId}}).then((resp)=>{
  console.log(resp);
  setOwnerName(resp.data.data.firstName+" "+resp.data.data.lastName)
console.log(bookingData);
})
    },[bookingData])
    
    const cancelBooking=()=>{
      
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to cancel the booking!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          AxiosInstance.get('payment/cancelBooking',{params:{shedulesid:bookingData._id}}).then((resp)=>{
            console.log(resp);
            if(resp.data.data){
              Swal.fire(
                'cancelled!',
                'Your booked court has been deleted.',
                'success'
              ).then(()=>{
                window.location.reload() 
              })
            
            }
          })
         
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Handle the Cancel button click
          Swal.fire(
            'NotCancelled',
            'Your booking is safe.',
            'info'
          );
        }
      });
     
    }
  return (
  <>
 
  <div className="m-5 card-container">
        <a href="#" className="hero-image-container">
          <img src={`${process.env.REACT_APP_BASE_URL}/uploads/${bookingData?.courts?.image[0]?.filename}`}/>
        </a>
        <main class="main-content">
          <h1 className='bookingcard-heading'><a href="#">{bookingData.courts.name}</a></h1>
          <p>{bookingData?.courts?.location}</p>
          <div class="flex-row">
            <div class="coin-base">
              <img src="data:image/png;base64,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" alt="Ethereum" class="small-image"/>
              <h2 className='bookingcard-heading2'>{bookingData.cost}</h2>
            </div>
            <div class="time-left">
             
              <p>{bookingData.date.split('T')[0]}<br/>{bookingData.slot.name}</p>
            </div>
          </div>
        </main>
        <div class="card-attribute">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCMWKaogdT0i2MJm1OOLiS2w6Hf05hlYx81A&usqp=CAU" alt="avatar" class="small-avatar"/>
          <p>Owner : <span><a className='text-uppercase' href="#">{ownerName}</a></span></p>
         {upcoming?<Button className='ms-5 text-dark bg-light fw-bolder' onClick={cancelBooking}>
         Cancel Booking</Button>:''}
        </div>
      </div>
 
 
    
    
</>
  )
}

export default UserBokkingCard