import React, { useState } from 'react'
import './TimesheduleComponent.css'

import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import AxiosInstance from '../config/axiosinstance';
import { BASEURL } from '../Constants/baseURL';

function TimesheduleComponent({data}) {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
const [book,setbook]=useState(false)
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#0D4A42';
      
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
      function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
}

const paymentFromWallet= async ()=>{
const result= await AxiosInstance.get('/payment/walletpayment',{params:{id:data._id}})
console.log(result);
if(result.data.message==="success"){
  alert('success')
  setbook(true)
  setIsOpen(false);
}
if(result.data.message==="insufficient balance"){
  alert("insufficient balance, pay through Razorpay")

}

}
      async function displayRazorpay() {

        if(book){
          alert("already booked")
          setIsOpen(false);
          return;
        }
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await AxiosInstance.post(`${BASEURL}/payment/orders`,{id:data._id});//pass id as body not params

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        

        // Getting the order details back
        const { amount, id: order_id, currency,receipt} = result.data;


        const options = {
            key: "rzp_test_NoYR40PqzyjRNX", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Book my court.",
            description: "Test Transaction",
            //image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    receipt,//same reciept:reciept
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await AxiosInstance.post(`${BASEURL}/payment/success`, data);
               setbook(true)
                alert(result.data.msg);
            },
            prefill: {
                name: "Shehana pareeth",
                email: "shehanapareeth@gmail.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        setIsOpen(false);
       
}
  return (
    <>
    <div  onClick={openModal} className={`${data.bookedBy||book?'booked':'notbooked'}`}>{data.slot.name}</div>
  <div>
      
     {data.bookedBy||book?<Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h4 ref={(_subtitle) => (subtitle = _subtitle)}  >already booked</h4>
        <Button onClick={closeModal}> close</Button> 
      </Modal>:<Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{textAlign:'center'}}>BOOK SLOT</h2>
        <Button onClick={closeModal} style={{margin:'5px auto',backgroundColor:'#0D4A42'}} >close</Button>
        <div className='my-3'>
        <h4>Name: {data.courts.name}</h4>
        <h5>Slot: {data.slot.name}</h5>
        <h5>Location: {data.courts.location}</h5>
        <h5>Cost: {data.cost}</h5>
       
        </div>
        
        <Button onClick={displayRazorpay} className='me-5 ms-5' style={{backgroundColor:'#0D4A42'}}>Book By Razorpay</Button>
        <Button onClick={paymentFromWallet}  style={{backgroundColor:'#0D4A42'}}>Book From Wallet</Button>
      </Modal>} 
    </div>
    </>
  )
}

export default TimesheduleComponent