import React, { useEffect } from 'react'
import { useState } from 'react';
import UserBokkingCard from '../componets/UserBokkingCard';
import AxiosInstance from '../config/axiosinstance';
import { BASEURL } from '../Constants/baseURL';
import Navcomponent from '../componets/Navcomponent';

function CancelledBookings() {
    const [previous,setPrevious]=useState([])
    useEffect(()=>{
        AxiosInstance.get('/getCancelledUserBookings').then((res)=>{
            console.log(res.data.data);
          setPrevious(res.data.data)
          })
    },[]) 
  return (
    <>
    <Navcomponent/>
    <h3 className='my-5 text-center'>Cancelled Bookings</h3>
    <div className='d-flex flex-wrap justify-content-center align-items-center'>
        
{previous.map((obj)=><PrevCard cancelledData={obj}/>)}
    </div>
    </>
  )
}

export default CancelledBookings


export function PrevCard({cancelledData}) {
return(
<div className="m-5 card-container">
<a href="#" className="hero-image-container">
 <img src={`${BASEURL}/uploads/${cancelledData.courts.image[0].filename}`} alt="" />
</a>
<main class="main-content">
  <h1><a href="#">{cancelledData.courts.name}</a></h1>
  <p>{cancelledData.courts.location}</p>
  <div class="">
    <div class="coin-base">
      <img src="data:image/png;base64,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" alt="Ethereum" class="small-image"/>
      <h2>{cancelledData.cost}</h2>
    </div>
    <div class="">
     
      <p>cancelled slot and date:{cancelledData.date.split('T')[0]}....{cancelledData.slot.name}</p>
      <p>cancelled at Date and time:{cancelledData.canellation.timeStamp.split('T')[0]}---{cancelledData.canellation.timeStamp.split('T')[1].split('.')[0]}</p>
    </div>
  </div>
</main>

</div>
)
}
