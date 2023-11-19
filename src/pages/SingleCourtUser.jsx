import React from 'react'
import { BASEURL } from '../Constants/baseURL'
import './SingleCourtUser.css'
import { useNavigate } from 'react-router-dom'
import Navcomponent from '../componets/Navcomponent'
function SingleCourtUser({data}) {
  const navigate=useNavigate()
  const openthisCard=()=>{
    navigate(`/openUserCourtEdit/${data._id}`)
  }
  
  return (
    <>
   
       <div className='courtbox' onClick={()=>openthisCard()}>
        <h4 className='courttext'>{data.name}</h4>
        <img className="courtimage" src={`${BASEURL}/uploads/${data.image[0].filename}`} alt="" />
       </div>
    </>
 
  )
}

export default SingleCourtUser