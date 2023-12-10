import React, { useEffect, useState } from 'react'
import './SINglecourtUserDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosInstance from '../config/axiosinstance';
import Singlecardcarousal from '../componets/Singlecardcarousal'
import { Form ,Button} from 'react-bootstrap';
import TimesheduleComponent from '../componets/TimesheduleComponent';
import { ToastError } from '../plugins/Toast';
function SINglecourtUserDetails() {
  const navigate=useNavigate()
  const [errorText,setErrorText]=useState()
    const [userCourt,setUserCourt]=useState({
        image1:'',
    image2:'',
    image3:'',
    name:'',
    description:'',
    location:""
  
    })
    const [selectedDate,setSelectedDate]=useState(new Date().toISOString().split('T')[0])
    const[timeShedules,setTimeShedules]=useState([])
    const [sheduledates,setSheduleDate]=useState()
    const {id}=useParams()
    console.log(id);
    useEffect(()=>{
AxiosInstance.get('/getusersinglecourt',{params:{courtId:id}}).then((res)=>{
    console.log(res.data);
   // console.log(res.data.schedules)
   if(res.data.schedules.length){
    setSheduleDate(res.data.schedules)
   }
   else{
    setErrorText("   Currently No Dates Available")
   }

    setUserCourt({...userCourt,image1:res.data.images[0]?.filename,image2:res.data.images[1]?.filename,image3:res.data.images[2]?.filename,name:res.data.name,description:res.data.description,location:res.data.location})
console.log(userCourt);

})

    },[])

    const getslotsData=(e)=>{
      e.preventDefault()
let currentHour
if(new Date().toISOString().split('T')[0]===new Date(selectedDate).toISOString().split('T')[0]){
  currentHour=new Date().getHours()
}
else{
  currentHour=-1
}
AxiosInstance.get('/getslotsdata',{params:{date:new Date(selectedDate),courtId:id,currentHour:currentHour}}).then((resp)=>{
  console.log(resp);
  if(resp.data.message==="success"){
    setTimeShedules(resp.data.data)
    console.log(timeShedules);
  }
  
  if(resp.data.message==="no court bookings"){
   ToastError('no court bookings at that date')
  }
 
}).catch((res)=>{
  if(res.response.data.message==="unauthorized request"){
    localStorage.clear()
    navigate('/')
  }
  })
    }

  return (
    
    <>
   
   <Singlecardcarousal courtsdetails={userCourt}/>
   {errorText ? '' : <div className='slide-container my-5'><h4 className='  animate-text'>"Get ready to unleash your passion for the game! Seize the moment, conquer the court. Your victory starts with a click-book your slots now and let the games begin !!"</h4></div>}
 <Form onSubmit={getslotsData} className='mt-5 w-50 mx-auto'>
 <Form.Group className="mb-3 d-flex " >
   <h4>Dates Available For Booking : </h4>
   {errorText ? <h4 className='text-danger'>{errorText}</h4>:''}
   <div className=' d-flex flex-wrap'>
   {sheduledates?.map((obj)=> <div className='p-4 text-danger fw-bolder'>
  {obj._id.split('T')[0]}</div> )}
   </div>
   </Form.Group>
   {errorText ? '' :<Form.Group className="mb-3 d-flex flex-column" >
   
     <Form.Label className='mb-3 fw-bolder'>Enter the prefered date from above to get available  slots</Form.Label>
     <Form.Control type="date" placeholder="enter date " value={selectedDate} onChange={(e)=>setSelectedDate(e.target.value)}  min={new Date().toISOString().split('T')[0]}  className='mb-3'/>
<Button className='btn mt-2' type='submit' style={{backgroundColor:'#0D4A42'}}>ok</Button>
   </Form.Group> }
   
   </Form>
   <div className='d-flex flex-wrap mx-5 justify-content-center align-items-center gap-5 my-5'>
   {timeShedules.map((obj)=><TimesheduleComponent data={obj}/>)}
   </div>
   
    </>
  )
}

export default SINglecourtUserDetails