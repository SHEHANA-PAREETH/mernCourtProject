import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import {useNavigate, useParams} from 'react-router-dom'

import Singlecardcarousal from '../componets/Singlecardcarousal';
import AxiosInstance from '../config/axiosinstance';
import CourtTable from '../componets/CourtTable';
import CourtModal from '../componets/CourtModal';
import { Button, Col, Container ,Row} from 'react-bootstrap';


function SinglecardDetails() {
  const navigate=useNavigate()
  const {id}=useParams()  
 const [showTable,setShowTable]=useState(false)
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
   getsingleData()
    },[])
const getsingleData=()=>{
  AxiosInstance.get('vendor/getSinglecourtdetails',{params:{courtId:id}}).then((res)=>{
    console.log('render');
  console.log(res.data);
     setSinglecourt({...singlcourt,image1:res.data.images[0]?.filename,image2:res.data.images[1]?.filename,image3:res.data.images[2]?.filename,name:res.data.name,description:res.data.description,location:res.data.location})
  }).catch((res)=>{
    if(res.response.data.message==="unauthorized request"){
      localStorage.clear()
      navigate('/')
    }
    })
}
    const [startDate,setStartDate]=useState()
    const [endDate,setEndDate]=useState()
    const handleSubmit=(e)=>{
e.preventDefault()
setShowTable(true)
    }
    return (
   <>

  <Singlecardcarousal courtsdetails={singlcourt}/>
  <Button className='btn-success ms-5 my-5 w-25' onClick={modalchange} >create bookings</Button>
{showmodal?<CourtModal showmodal={showmodal} setShowmodal={setShowmodal} singlcourt={singlcourt}/>:''}

<Form className='w-25 mx-auto' onSubmit={handleSubmit}>
<Form.Group className="mb-3" >
        <Form.Label className=''>Start date</Form.Label>
        <Form.Control type="date" onChange={(e)=>setStartDate(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label className=''>End date</Form.Label>
        <Form.Control type="date"  onChange={(e)=>setEndDate(e.target.value)}/>
      </Form.Group>
      <Button type="submit" className='btn-success'>Fetch Data</Button>
      </Form>
      {showTable?<CourtTable startDate={startDate} endDate={endDate} id={id} />:''}
   </> 
  );

}

export default SinglecardDetails