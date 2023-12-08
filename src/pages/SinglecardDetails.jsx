import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import {useNavigate, useParams} from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Singlecardcarousal from '../componets/Singlecardcarousal';
import AxiosInstance from '../config/axiosinstance';
import CourtTable from '../componets/CourtTable';
import CourtModal from '../componets/CourtModal';
import { Button} from 'react-bootstrap';
import SingleSlotDetailsModal from '../componets/SingleSlotDetailsModal';
import AddSlotModal from '../componets/AddSlotModal';
import { TIMINGS } from '../Constants/timings';


function SinglecardDetails() {
  const navigate=useNavigate()
  const {id}=useParams()  
 const [showTable,setShowTable]=useState(false)
 const [alreadyshownSlots,setAlreadyShownSlots]=useState([])
const [showmodal,setShowmodal]=useState(false)
const [allShedules,setAllSchedules]=useState([])
const [showSlotData,setShowSlotData]=useState()
const[addShedulesModal,setAddshedulesModal]=useState(false)
const [includedSlots,setIncludedSlots]=useState([])

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
    getAllShedulesData()
   getsingleData()
    },[])
    const getAllShedulesData= async ()=>{
      const result= await AxiosInstance.get('/vendor/getallshedulesdata',{params:{courtId:id}})
setAllSchedules(result.data.data)
    }
const getsingleData=()=>{
  AxiosInstance.get('vendor/getSinglecourtdetails',{params:{courtId:id}}).then((res)=>{
   // console.log('render');
 // console.log(res.data);
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

    const showDetails=(slotname,date)=>{
      console.log(slotname,date);
      AxiosInstance.get('/vendor/showSlotBookingDetails',{params:{slotname:slotname,date:date,courtId:id}}).then((resp)=>
      {
        console.log(resp);
        //if(resp?.data?.data[0]?.users){
         
setShowSlotData(resp.data.data)  
      })
      
    }
    const handleSubmit=(e)=>{
e.preventDefault()
setShowTable(true)
    }
    
  const addSchedules = (id,individualslotData)=>{
  
    console.log(id,individualslotData);
    
   

let includedSlotDetails=[]
includedSlotDetails=[...includedSlotDetails,id,individualslotData]
console.log(includedSlotDetails);
setIncludedSlots(includedSlotDetails) 
console.log('added');
setAddshedulesModal(!addShedulesModal)
    }    
    return (
   <>

  <Singlecardcarousal courtsdetails={singlcourt}/>
  <div className='d-flex justify-content-center align-items-center'>
  <Button className='btn-success my-5 w-25 ' onClick={modalchange} >create bookings</Button>
  </div>
  
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
      <div className={` container ${addShedulesModal ? 'd-flex':' '}`}>
      
        {showTable?<CourtTable startDate={startDate} endDate={endDate} id={id} />: 
    

      <Table className={`border border-2 mt-5 me-5${addShedulesModal ? '':' '}`}>
    <thead className='text-start'>
        <tr>
          <th>Si No</th>
          <th>DATE</th>
          <th>slots</th>
          
        </tr>
      </thead>
      <tbody className='text-start'>
        {allShedules.map((obj,index)=> <tr>
        <td style={{height:'150px'}}>{index+1}</td>
      <td style={{height:'150px',width:'100px'}} className='m-2'>{obj._id.split('T')[0]}</td>
     <td style={{height:'150px'}} className='d-flex flex-row flex-wrap'>{obj.slotsData.map((slot)=> <span className=' bg-warning border rounded-2 me-1 ' style={{height:'40px',padding:'5px 10px'}} onClick={()=>showDetails(slot.slot.name,obj._id)}>{slot.slot.name}</span>)}
      <Button className='p-2 bg-success border rounded-2' onClick={()=>addSchedules(obj._id,obj.slotsData)}  style={{height:'40px',padding:'5px 10px'}} >Add +</Button></td> 
        </tr>
       )}
       {showSlotData?<SingleSlotDetailsModal showSlotData={showSlotData}/>:""}
        </tbody>
     
      </Table>}
       
      
        {addShedulesModal ? <AddSlotModal includedSlots={includedSlots} setAddshedulesModal={setAddshedulesModal}/>:' '}
        </div>
   </> 
  );

}

export default SinglecardDetails