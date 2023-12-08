import React, { useEffect, useState } from 'react'
import './AdminHome.css'
import {Container, Row} from 'react-bootstrap'
import AdminNav from '../componets/AdminNav'
import Barchart from '../componets/admin/Barchart'
import AxiosInstance from '../config/axiosinstance'

function AdminHome() {
  const [bookings,setBookings]=useState({
    labels:[],// bookings.map((data)=> data.date),
  datasets:[] 
 })
  useEffect(()=>{
AxiosInstance.get('/admin/chartdata').then((resp)=>{
  //console.log(resp);
 const bookingdata= resp.data.data
 console.log(bookingdata);
  setBookings((prevObject) => ({
    ...prevObject, // Spread the existing state
    labels: bookingdata.map((obj)=> obj._id.split('T')[0]), 
    datasets:[{
      label:'bookings in each day',
      data: bookingdata.map((obj)=> obj.slotsData.length),
  backgroundColor:[
    "rgba(75,192,192,1)",
    "#ecf0f1",
    "#50AF95",
    "#f3ba2f",
    "#2a71d0"
  ],
  borderColor:"black",
  borderWidth: 2,
    }]
    // Update the specific value
  }));
})
  },[])
    return(
    <>
 
<Container fluid>
  <Row>
  <div className='setadminback d-flex justify-content-center align-items-center' >
    <AdminNav/>
<Barchart chartData={bookings}/>
   </div>
  </Row>
</Container>
   
    
   
    </>
  )
}

export default AdminHome