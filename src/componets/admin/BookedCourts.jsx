import React, { useEffect, useState } from 'react'
import AdminNav from '../AdminNav'
import AxiosInstance from '../../config/axiosinstance'

function BookedCourts() {
    const [bookedCourts,setBookedCourts]=useState([])
    useEffect(()=>{
AxiosInstance.get('/admin/allbookedcourts').then((resp)=>{
console.log(resp);

setBookedCourts(resp.data.data)
})

    },[])
  return (
   <>
   <AdminNav/>
   <div style={{marginLeft:'20%',width:'75%'}}>
   
    <table class="table table-dark  table-striped-columns"  >
  <thead>
    <tr>
      <th scope="col">SI NO</th>
      <th scope="col">Court Name</th>
      <th scope="col">Vendor Name</th>
    
      <th scope="col">Date</th>
      <th scope="col">Slot name</th>
     <th scope='col'>Booked By</th>
     <th scope='col'>Cost</th>
    </tr>
  </thead>
  <tbody>
  
      {bookedCourts.map((obj,index)=>
      <tr>
<td>{index+1}</td>
<td>{obj.courts.name}</td>
<td>{obj.vendorname}</td>

<td>{obj.date.split('T')[0]}</td>
<td>{obj.slot.name}</td>
<td> {obj.users.firstName} {obj.users.lastName} </td>
<td>{obj.cost}</td>
      </tr>)}
     
    </tbody>
    </table>
   

 
  
     
   </div>
   </>
  )
}

export default BookedCourts