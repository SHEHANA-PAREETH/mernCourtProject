import React, { useEffect, useState } from 'react'
import Mycourtcomponent from '../componets/Mycourtcomponent'
import AxiosInstance from '../config/axiosinstance'
import { Container, Row ,Col} from 'react-bootstrap';

function MyCourts() {
  const[mycourtData,setMycourtData]=useState([])
    useEffect(()=>{
       AxiosInstance.get('vendor/mycourts').then((resp)=>{
          setMycourtData(resp.data.data);
          
       })
    },[])
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