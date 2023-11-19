import React, { useEffect, useState } from 'react'
import Mycourtcomponent from '../componets/Mycourtcomponent'
import AxiosInstance from '../config/axiosinstance'
import { Container, Row ,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastError } from '../plugins/Toast';

function MyCourts() {
  const navigate=useNavigate()
  const[mycourtData,setMycourtData]=useState([])
    useEffect(()=>{
  
       getMyCourts()
    },[])
  const   getMyCourts=()=>{
    AxiosInstance.get('vendor/mycourts').then((resp)=>{
      setMycourtData(resp.data.data);
      
   }).catch((res)=>{
    if(res.response.data.message==="unauthorized request"){
      localStorage.clear()
  ToastError('something went wrong')
      navigate('/')
    }
      })
  }
  return (
   <Container>
    <Row className=''>
      
      {
mycourtData.map(courtdata=>
<Mycourtcomponent courtsdetails={courtdata}/>)
 }
      
    </Row>
   </Container>
 
    
    
  )
}

export default MyCourts