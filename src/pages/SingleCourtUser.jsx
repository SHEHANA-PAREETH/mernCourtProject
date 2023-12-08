import React from 'react'
import './SingleCourtUser.css'
import { useNavigate } from 'react-router-dom'

function SingleCourtUser({data}) {
  const navigate=useNavigate()
  const openthisCard=()=>{
    navigate(`/openUserCourtEdit/${data._id}`)
  }
  
  return (
    <>
   
       <div className='courtbox' onClick={()=>openthisCard()}>
        <div className='d-flex flex-column courttext'>
        
        <h4 className=''>{data.name}</h4>
        {data.location}
       
        </div>
        
     
        <img className="courtimage" src={`${process.env.REACT_APP_BASE_URL}/uploads/${data.image[0].filename}`} alt="" /><br/>
        
       </div>
    </>
 
  )
}

export default SingleCourtUser