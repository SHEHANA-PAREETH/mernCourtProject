import React, { useState } from 'react'
import AdminNav from '../AdminNav'
import { useEffect } from 'react'
import AxiosInstance from '../../config/axiosinstance'

function CancelledCourts() {
    const [cancelledData,setCancellledData]=useState()
    useEffect(()=>{
AxiosInstance.get('/admin/cancelledcourts').then((resp)=>{
    console.log(resp);
    setCancellledData(resp.data.data)
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
      
     
       <th scope="col">Cancelled slot Date</th>
       <th scope="col">Slot name</th>
      <th scope='col'>Cancelled By</th>
      <th scope='col'>Cost</th>
     </tr>
   </thead>
   <tbody>
   
   {cancelledData?.map((obj,index)=><tr>
    <td>{index+1}</td>
    <td>{obj.courts.name}</td>
    <td>{obj.date.split('T')[0]}</td>
    <td>{obj.slot.name}</td>
    <td>{obj.canellation?.map((element,index)=><tr>
        <td> <span className='text-warning'>{element.username} </span>cancelled at <span className='text-info'>{element.timeStamp.split('T')[0] }</span>  time :<span className='text-danger'>{element.timeStamp.split('T')[1].split('.')[0]}</span></td>
    </tr>)}</td>
    <td>{obj.cost}</td>
   </tr>)}
     
     </tbody>
     </table>
    
 
  
   
      
    </div>
    </>
  )
}

export default CancelledCourts