
import React, { useEffect, useState } from 'react';
import {Button, Form} from 'react-bootstrap'
import { TIMINGS } from '../Constants/timings';

import AxiosInstance from '../config/axiosinstance';
import { ToastError, toastSuccess } from '../plugins/Toast';
function AddSlotModal({includedSlots,setAddshedulesModal}){
  const [timings,setTimings]=useState(TIMINGS)
  const [newslotstoAdd,setNewSlots]=useState([])
const [pushedSlots,setPushedSlots]=useState([])
const [onlyslots,setOnlySlots]=useState([])
const [data,setdatas]=useState({
  date: includedSlots[0],
  cost:'',

  courtId:includedSlots[1][0].courtId
})
useEffect(()=>{
console.log(data);
},[data])
useEffect(()=>{
  console.log(includedSlots);
  console.log(includedSlots[1]);
  let allslots=[...timings]
  const resultArray=[]
  for(let i=0;i< includedSlots[1].length;i++){
    const newElement = includedSlots[1][i].slot
resultArray.push(newElement)
  }
  
  console.log(resultArray);//only slot name and id
 const newArray=allslots.filter(obj => ! resultArray.some(removeObj => obj.id === removeObj.id && obj.name === removeObj.name))
 
  console.log(newArray);
setNewSlots(newArray)

//console.log(newslotstoAdd);
},[includedSlots])







const pushSlots=(obj)=>{
  
 setPushedSlots((prevArray)=>
  [...prevArray,obj])
  
  console.log(pushedSlots);
let allslots=[...newslotstoAdd]
allslots.forEach((element,index)=>{
  if(element=== obj){
allslots.splice(index,1)
  }
})
setNewSlots(allslots)
}

const removeSlots=(element)=>{

setNewSlots((prevArray)=>
  [...prevArray,element])
  let allslots=[...pushedSlots]
  allslots.forEach((elementslot,index)=>{
    if(elementslot=== element){
  allslots.splice(index,1)
    }
  })
  setPushedSlots(allslots)
  
}

const handleSubmit= (e)=>{
  e.preventDefault()
if(data.length === 0 || pushedSlots.length === 0){
  //alert('fields cannot be empty')
  ToastError('fields cannot be empty')
}
else{
  console.log(data);
  AxiosInstance.post('vendor/addslotsopreviousslots',{data,pushedSlots}).then((resp)=>{
    console.log(resp);
    if(resp.data.msg === "shedules added successfully"){
      toastSuccess('shedules added suceessfuly')
      setTimeout(()=>{
        window.location.reload()
      },1000)
     
    }
  })
}

}

  return(
<Form className='my-5 w-50 me-5 pe-3' onSubmit={handleSubmit}>
  <h3 className='text-center my-5'>Add Timings</h3>
          <Form.Group className="mb-3" >
        
       <h6 className='border border-2 p-2 rounded'>{includedSlots[0].split('T')[0]}</h6>
      </Form.Group>
      
      <Form.Group className="mb-3" >
        <Form.Label className=''>Cost</Form.Label>
        <Form.Control type="number" placeholder="Enter cost" name='cost' value={data.cost} onChange={(e)=>setdatas({...data,cost:e.target.value})} />
      </Form.Group>
      <h3>Selected Slots</h3>
      <ul className='d-flex flex-row w-100 flex-wrap bg-light p-4 border-none' style={{minHeight:'70px'}} >
 
{pushedSlots?.map((obj)=>
     <li className='text-light bg-dark p-1  border border-2 rounded' style={{textDecoration:"none",listStyleType:'none',width:'120px',cursor:'pointer'}} onClick={()=>removeSlots(obj)} >{obj.name}</li>
     )}
</ul>
      <h3>Available Slots</h3>
<ul className='d-flex flex-row justify-content-center w-100 flex-wrap bg-light p-4' style={{minHeight:'70px'}} >
 
{newslotstoAdd?.map((obj)=>
     <li className='text-light bg-dark p-1  border border-2 rounded' style={{textDecoration:"none",listStyleType:'none',width:'120px',cursor:'pointer'}} onClick={()=>pushSlots(obj)}>{obj.name}</li>
     )}
</ul>
    
    <div className='d-flex justify-content-between'>
    <Button type='submit' className='btn-success'>OK</Button>
      <Button className='btn-success' onClick={()=>setAddshedulesModal(false)}>close</Button>
    </div>
      
      </Form>
  )
  
}

export default AddSlotModal