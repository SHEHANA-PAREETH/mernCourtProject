import React, { useEffect } from 'react'
import AdminNav from '../AdminNav'
import AxiosInstance from '../../config/axiosinstance'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-modal';

function UserData() {
    const [data,setData]=useState([])
    const [singleuserData,setSIngleuserData]=useState([])
useEffect(()=>{
    AxiosInstance.get('/admin/getuserdata').then((resp)=>{
        console.log(resp);
        setData(resp?.data?.data)
    })
},[])
const handleClick=(id)=>{
AxiosInstance.get('/admin/getbookedDetails',{params:{id:id}}).then((resp)=>{
    console.log(resp);
    if(resp?.data?.msg === "success"){
setSIngleuserData(resp.data.data)
        openModal()
    }
})

}
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'70%'
    },
  };
  
 
  
 
   
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
 
  
    function closeModal() {
      setIsOpen(false);
    }
  return (
   <>
 
    <AdminNav/>
    <div className=''style={{marginLeft:'20%',width:'75%'}}>
    <table class="table  table-dark  table-striped-columns">
  <thead>
    <tr>
      <th scope="col">SI NO</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Profile Picture</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile</th>
      <th scope="col">Booked Courts</th>
     
    </tr>
  </thead>
  <tbody>
  
    {data?.map((obj,index)=><tr>
        <td>{index+1}</td>
        <td>{obj.firstName}</td>
        <td>{obj.lastName}</td>
        <td><img src={`${process.env.REACT_APP_BASE_URL}/uploads/${obj?.profilepic}`} alt="" style={{width:'70px',textAlign:'center'}} /></td>
        <td>{obj.email}</td>
        <td>{obj.number}</td>
        <td><Button className="btn" onClick={()=>{handleClick(obj._id);}}>Get Details</Button></td>
        </tr>)}
      
     
    </tbody>
    </table>
   
   </div>
   
   <div>
    <Modal
          isOpen={modalIsOpen}
        
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div>
        <table class="table m-5 mt-5 table-dark  table-striped-columns">
  <thead>
    <tr>
      <th scope="col">SI NO</th>
      <th scope="col">Date</th>
      <th scope="col">Booked Court Name</th>
      <th scope="col">Slot Timings</th>
      <th scope="col">Cost</th>
    </tr>
  </thead>
  <tbody>
  
    {singleuserData ?.map((obj,index)=><tr>
        <td>{index+1}</td>
        <td>{obj._id.split('T')[0]}</td>
        <td>{obj.slotsData?.map((details,no)=><tr>
            <td className=''>{no+1}:  {details.courts.name} 
            <img src={`${process.env.REACT_APP_BASE_URL}/uploads/${details.courts.image[0].filename}`} style={{width:'60px'}}/></td>
        </tr>)}</td>
        <td>{obj.slotsData?.map((element,index)=><tr><td>{element.slot.name}</td></tr>)}</td>
        <td>{obj.slotsData?.map((element,index)=><tr><td>{element.cost}</td></tr>)}</td>
        
        </tr>)}
      
     
    </tbody>
    </table>
        <Button onClick={closeModal} className='ms-5'>close</Button>
        </div>  
        </Modal>
      </div>
   </>
  )
}

export default UserData



