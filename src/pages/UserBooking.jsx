import React, { useEffect, useState } from 'react'
import Navcomponent from '../componets/Navcomponent'
import UserBokkingCard from '../componets/UserBokkingCard'
import AxiosInstance from '../config/axiosinstance'
import {Button,Container,Row,Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
function UserBooking() {
  const [bookingData,setBookingData]=useState([])
const [upcoming,setUpcoming]=useState(false)
const navigate=useNavigate()
   const  getUserBookings=()=>{
    setUpcoming(!upcoming)


    AxiosInstance.get('/getSingleUserBookings').then((res)=>{
      console.log(res.data.data);
      
      setBookingData(res.data.data)
    })
    }
    const  getPreviousBookings=()=>{
      setUpcoming(!upcoming)
    
      AxiosInstance.get('/getPreviousUserBookings').then((res)=>{
        console.log(res);
        setBookingData(res.data.data)
      })
      }
      const  getCancelledBookings=()=>{
        
      navigate('/getCancelledUserBookings')
       
        }
  return (
    <>
     
    <Navcomponent/>
   
      <div className='d-flex justify-content-evenly my-5'>
      <Button onClick={ getUserBookings} style={{backgroundColor:'#0D4A42'}}>Upcoming Bookings</Button>
    <Button onClick={getPreviousBookings} style={{backgroundColor:'#0D4A42'}}>Previos  Bookings</Button>
    <Button onClick={getCancelledBookings} style={{backgroundColor:'#0D4A42'}}>Cancelled  Bookings</Button>
      </div>
      <div className='container' >
      <div className='row ' >
      {
    upcoming?
    <div  className='d-flex flex-wrap justify-content-center align-items-center '>
    {bookingData.map((obj)=><UserBokkingCard bookingData={obj} upcoming={upcoming} setUpcoming={setUpcoming}/>)} 
   
    </div>
    :<div className='d-flex flex-wrap justify-content-center align-items-center'>
    {bookingData.map((obj)=><UserBokkingCard bookingData={obj}/>)} 
    </div>
   }
      </div>
    </div>
   
   
    </>
  )
}

export default UserBooking