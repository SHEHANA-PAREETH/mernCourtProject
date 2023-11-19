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
     
  }, [startDate,endDate])
  
  
  return (
    <>
    <Table className='w-50 mx-auto mt-5'>
    <thead className='text-start'>
        <tr>
          <th>No</th>
          <th>DATE</th>
          <th>slots</th>
          <th>price</th>
          <th >Booking status</th>
        </tr>
      </thead>
      {
      tabledata.map((obj,index)=> <TableCourt data={obj} index={index}/>)
    }
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