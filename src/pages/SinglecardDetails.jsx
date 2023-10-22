import React, { useEffect, useState } from 'react'

import {useParams} from 'react-router-dom'

import Singlecardcarousal from '../componets/Singlecardcarousal';
import AxiosInstance from '../config/axiosinstance';

import CourtModal from '../componets/CourtModal';
import { Button, Col, Container ,Row} from 'react-bootstrap';


function SinglecardDetails() {
  
  const {id}=useParams()  
 
const [showmodal,setShowmodal]=useState(false)
  const[singlcourt,setSinglecourt]=useState({
    image1:'',
    image2:'',
    image3:'',
    name:'',
    description:'',
    location:""
  })
  const modalchange=()=>{
    setShowmodal(!showmodal)
  }

  useEffect(()=>{
    AxiosInstance.get('vendor/getSinglecourtdetails',{params:{courtId:id}}).then((res)=>{
    console.log('render');
  console.log(res.data);
     setSinglecourt({...singlcourt,image1:res.data.images[0]?.filename,image2:res.data.images[1]?.filename,image3:res.data.images[2]?.filename,name:res.data.name,description:res.data.description,location:res.data.location})
  })  
    },[])
    return (
   <>

  <Singlecardcarousal courtsdetails={singlcourt}/>
  <Button className='btn-success w-25 m-5' onClick={modalchange} >create bookings</Button>
{showmodal?<CourtModal showmodal={showmodal} setShowmodal={setShowmodal} singlcourt={singlcourt}/>:''}
 


 

   </> 
  );

}

export default SinglecardDetails