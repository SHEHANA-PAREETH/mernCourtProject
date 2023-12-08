import React, { useEffect, useState } from 'react'
import AdminNav from '../AdminNav'
import AxiosInstance from '../../config/axiosinstance'
import {Button} from 'react-bootstrap'


import VendorTable from './VendorTable';
function VendorData() {
    const [data,setData]=useState()
    const [singleCourtData,setSIngleCourtData]= useState([])
    const [table,openTable]=useState(false)
    useEffect(()=>{
AxiosInstance.get('/admin/vendordetails').then((resp)=>{
    console.log(resp);
    setData(resp?.data?.data)
})
    },[])
    const handleClick=(id)=>{
        AxiosInstance.get('/admin/getcourtDetails',{params:{id:id}}).then((resp)=>{
            console.log(resp);
           
            if(resp?.data?.msg === "success"){
        setSIngleCourtData(resp.data.data)
                openTable(!table)
            }
        })
    }
    
      
     
      
     
       
       
  return (
    <>
     
    <AdminNav/>
    <div style={{marginLeft:'20%',width:'75%'}}>
    <table class="table table-dark  table-striped-columns"  >
  <thead>
    <tr>
      <th scope="col">SI NO</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile</th>
      <th scope="col">Registered Courts</th>
    </tr>
  </thead>
  <tbody>
  
    {data?.map((obj,index)=><tr>
        <td>{index+1}</td>
        <td>{obj.firstName}</td>
        <td>{obj.lastName}</td>
        <td>{obj.email}</td>
        <td>{obj.number}</td>
        <td><Button className="btn" onClick={()=>{handleClick(obj._id);}}>Get Details</Button></td>
        </tr>)}
      
     
    </tbody>
    </table>
   

 
  
       {table?<VendorTable singleCourtData={singleCourtData}/>:''}
    </div>
    
    </>
   
  )
}

export default VendorData