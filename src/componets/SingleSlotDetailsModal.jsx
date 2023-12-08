
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import Modal from 'react-modal';
function SingleSlotDetailsModal({showSlotData}) {
    
    useEffect(()=>{
        openModal()
    },[showSlotData])
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding:'50px',
         
        },
      };
     
      const[alreadyBooked,setAlreadyBooked]=useState()
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
   
    console.log(showSlotData);
    if(showSlotData[0].users){
        setAlreadyBooked(true)
    }
    else{
        setAlreadyBooked(false)
    }
    setIsOpen(true);
  }
 
  

  function closeModal() {
    setIsOpen(false);
  }
  return (

    <div>
      
      <Modal
        isOpen={modalIsOpen}
       
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        
        <Button className='btn-success' onClick={closeModal}>close</Button>
        <div>
            {alreadyBooked?<h6>Slot booked</h6>:<h6>Slot is not booked yet</h6>}
           {alreadyBooked?<div><h5 className='text-uppercase'>Booked By:{showSlotData[0]?.users?.firstName+' '+showSlotData[0]?.users?.lastName}</h5>
            <h6 className='p-2'>Booked on:{showSlotData[0]?.paymentOrders[0]?.timeStamp.split('T')[0]}, at : {showSlotData[0]?.paymentOrders[0]?.timeStamp.split('T')[1].split('.')[0]}</h6>
        Payment Mode:{showSlotData[0]?.paymentOrders[0]?.razorpayPaymentId?<h6>Razor Pay</h6>:<h6>Wallet</h6>}
        <h6>Amount:{showSlotData[0].cost}</h6>
                </div> :''} 
        </div>
       
      </Modal>
    </div>
  );
}

export default SingleSlotDetailsModal