import React, { useEffect, useState } from 'react'
import BUTTON from 'react-bootstrap/Button';
import Modal from 'react-modal';
import { TIMINGS } from '../Constants/timings';
import  './CourtModel.css';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import AxiosInstance from '../config/axiosinstance';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';

function CourtModal({showmodal,setShowmodal,singlcourt}) {
   const {id}=useParams()
  
  const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',  
          marginRight: '-50%',
          width:'40%',
          transform: 'translate(-50%, -50%)',
        },
      };
      const navigate=useNavigate()
let subtitle;
const[minendDate,setMinendDate]=useState()
const[minimumDate,setMindate]=useState()
  const [modalIsOpen, setIsOpen] = React.useState(showmodal);
const [showDropdown,setShowDropdown]=useState(false)
const [selectedTimings,setSelectedTimings]=useState([])
const [courtTiming,setCourtTiming]=useState({
  startingDate:'',
  endingDate:'',
  
})
const [cost,setCost]=useState('')
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setShowmodal(false)
  }
const addNewTime=(element,index)=>{
  
  if(selectedTimings.includes(element))
  {
    return
  }
  else
  {
    setSelectedTimings([...selectedTimings,element])
    console.log(index);
    TIMINGS.splice(index,1)
    console.log(TIMINGS);
    console.log(selectedTimings);
  }

}

const addToTheTimings=(element,index)=>{
 
console.log(element);
const newTiming=[...selectedTimings]
newTiming.splice(index,1)
setSelectedTimings(newTiming)
TIMINGS.push(element)
}
const handleSubmit=(e)=>{
  e.preventDefault()
  console.log(courtTiming);
  console.log(selectedTimings);
  AxiosInstance({
    method:'post',
    url:'/vendor/addcourtTimings',
    data:{
      starEndDate:courtTiming,
      slotLists:selectedTimings,
      cost:cost,
      courtId:id
    }
  }).then((res)=>{
    
    if(res.data.msg){
      Swal.fire({  
         
        text: 'shedules added successfully.',
        icon: 'success'
      }).then(()=>{
        setIsOpen(false)
        setShowmodal(false)
        
      })
    }
    else{
      Swal.fire({  
         
        text: 'something went wrong ',
      })
}})}

useEffect(()=>{
  AxiosInstance.get('/vendor/getlatestupdateddate',{params:{courtId:id}}).then((res)=>{
    if(res?.data?.msg==='success'){
      let d=new Date(res?.data?.minDate)
      console.log(d);
  d.setDate(d.getDate()+1)
   setMindate(d.toISOString().split('T')[0]);
  console.log(minimumDate);
    }
    if(res?.data?.msg==='failed'){//courtshedules empty
      const date = new Date();
     setMindate(date.toISOString().split('T')[0]);
    }


})
},[courtTiming])
 
const findMinendDate=()=>{
  console.log(courtTiming.startingDate);
let end=new Date(courtTiming.startingDate)
end.setDate(end.getDate()+1)
setMinendDate(end.toISOString().split('T')[0])
console.log(minendDate);
}
return (
    
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h5 className='text-success text-center my-3' ref={(_subtitle) => (subtitle = _subtitle)}>{singlcourt.name}<br/>{singlcourt.location}</h5>
       
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
        <Form.Label className=''>Start date</Form.Label>
        <Form.Control type="date" min={minimumDate} onBlur={findMinendDate} onChange={(e)=>setCourtTiming({...courtTiming,startingDate:new Date(e.target.value)})}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label className=''>End date</Form.Label>
        <Form.Control type="date" min={minendDate} onChange={(e)=>setCourtTiming({...courtTiming,endingDate:new Date(e.target.value)})}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label className=''>Cost</Form.Label>
        <Form.Control type="number" placeholder="Enter cost"   onChange={(e)=>setCost(e.target.value)}/>
      </Form.Group>
          
         <div className='mt-3 ms-2'>
            {
              selectedTimings.map((element,index)=>
              <span className='selectedTimings '   key={element.id} onClick={()=>addToTheTimings(element,index)}>{element.name}</span>
              )
            }
          </div>
        
        <Form.Label className='border border-1 p-2 fw-bolder' onClick={()=>setShowDropdown(!showDropdown)} style={{cursor:'pointer'}}>Select Timings</Form.Label>
         
          {showDropdown&&<div>
            <ul>
              
              {
               
                TIMINGS.map((element,index)=> 
                <li onClick={()=>addNewTime(element,index)} key={element.id} className='listitemsmodal'>{element.name}</li>
                )
              }
              </ul>
              </div>}
              <BUTTON className='btn-success my-1 mx-auto w-100' type="submit" >submit</BUTTON>
              </Form>
         
       
          <BUTTON className='btn-success my-1 mx-auto w-100' onClick={closeModal}>close</BUTTON>
          
      </Modal>
      
      )
  }

export default CourtModal