import React, { useEffect } from 'react'
import AxiosInstance from '../config/axiosinstance'
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
function CourtTable({startDate,endDate,id}) {
  const[tabledata,setTableData]=useState([])
  useEffect(() => {
    console.log(id);
 AxiosInstance.get('vendor/gettabledata',{params:{id:id,startDate:startDate,endDate:endDate}}).then((resp)=>{
  console.log(resp);
  console.log(resp.data.data);
  setTableData(resp.data.data)
 })
     
  }, [startDate,endDate,id])
  
  
  return (
    <>
    <Table className='w-50 mx-auto mt-5'>
    <thead className='text-start'>
        <tr>
        <th>Si No</th>
          <th>DATE</th>
          <th>slots</th>
        </tr>
      </thead>
      <tbody className='text-start'>
        {tabledata.map((obj,index)=> <tr>
        <td>{index+1}</td>
      <td>{obj._id.split('T')[0]}</td>
     <td >{obj.slotsData.map((slot)=> <span className='p-2  bg-warning border rounded-2'>{slot.slot.name}</span>)}</td> 
        </tr>
       )}
       
        
      </tbody>
      </Table>
    
   
    </>
  )
}

export default CourtTable

export const TableCourt=({data,index})=>{
  return(
    <>
    
   
    
      <tbody className='text-start'>
        <tr>
          <td>{index+1}</td>
          <td>{data.date.split('T')[0]}</td>
           <td>{data.slot.name}</td>
          <td>{data.cost}</td>
          <td><input type="checkbox" /></td>
        </tr>
       
        
      </tbody>
    

    </>
  )
}