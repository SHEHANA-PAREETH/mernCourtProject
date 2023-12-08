import React, { useEffect, useState } from 'react'
import './PaginationComponent.css'

import { useDispatch } from 'react-redux';
import { setSelectedPage } from '../toolkit/userSlice';
function PaginationComponent({totalDocuments}) {
  const dispatch=useDispatch()
  const[maxNumber,setMaxNumber]=useState()
  const [selectedIndex,setSelectedIndex]= useState()
  const [paginationItems,setPaginationItems] =useState([])
  let items = [];
  

useEffect(()=>{
  pushPageNumbers()
},[maxNumber,totalDocuments])


  const pushPageNumbers=()=>{
  setMaxNumber(Math.ceil(totalDocuments/5))
for (let number = 1; number <= maxNumber; number++) {
  items.push(number); 
}
setPaginationItems(items)
console.log(paginationItems);
}

const handleClick=(index)=>{
console.log(index);
setSelectedIndex(index)
dispatch(setSelectedPage(index+1))
}
  return (
  <>
  <div className='d-flex justify-content-center'>
   
  { paginationItems?.map((obj,index)=>
  <span className="border border-2 rounded" style={{cursor:'pointer',padding:'5px',margin:'5px',backgroundColor: index === selectedIndex ? 'blue' : 'grey'}} onClick={()=>handleClick(index)}>
    {obj}
    </span>)}
  </div>
 

 
     
    

  </>

  )
}

export default PaginationComponent



