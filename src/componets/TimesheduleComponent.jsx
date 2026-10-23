import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal';
import AxiosInstance from '../config/axiosinstance';
import { ToastError, toastSuccess } from '../plugins/Toast';

function TimesheduleComponent({data}) {
const [modalIsOpen, setIsOpen] = useState(false);
const [book,setbook]=useState(false)
const { user }=useSelector((state)=>state.user)
const isBooked=Boolean(data.bookedBy||book)

function closeModal() {
  setIsOpen(false);
}

function loadScript(src) {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
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
  try{
    const result= await AxiosInstance.get('/payment/walletpayment',{params:{id:data._id}})
    const message=result.data.message
    if(message==="success"){
      toastSuccess("Slot booked successfully")
      setbook(true)
      setIsOpen(false);
    }
    else if(message==="insufficient balance"){
      ToastError("Insufficient wallet balance, pay with Razorpay instead")
    }
    else if(message==="already slot booked"){
      ToastError("Sorry, this slot was just booked by someone else")
      setIsOpen(false);
    }
    else{
      ToastError("This slot can't be booked any more")
      setIsOpen(false);
    }
  }
  catch(error){
    ToastError("Could not complete the payment, please try again")
  }
}

async function displayRazorpay() {
  if(book){
    ToastError("This slot is already booked")
    setIsOpen(false);
    return;
  }
  const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
    ToastError("Razorpay SDK failed to load. Are you online?");
    return;
  }

  // creating a new order
  let result;
  try{
    result = await AxiosInstance.post(`/payment/orders`,{id:data._id});//pass id as body not params
  }
  catch(error){
    ToastError(error?.response?.data?.message || "Could not start the payment. Please try again later.");
    return;
  }

  // Getting the order details back
  const { amount, id: order_id, currency, key} = result.data;

  const options = {
    key, // Key ID comes from the backend (RAZORPAY_KEY_ID)
    amount: amount.toString(),
    currency: currency,
    name: "Book my court.",
    description: `${data.courts.name} · ${data.slot.name}`,
    order_id: order_id,
    handler: async function (response) {
      const payment = {
        orderCreationId: order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };

      try{
        await AxiosInstance.post(`/payment/success`, payment);
        setbook(true)
        toastSuccess("Slot booked successfully");
      }
      catch(error){
        ToastError(error?.response?.data?.msg || "We received your payment but could not confirm the booking. Please contact support.");
      }
    },
    prefill: {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      contact: user.number ? String(user.number) : undefined,
    },
    theme: {
      color: "#0d4a42",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  setIsOpen(false);
}

  return (
    <>
      <button
        type='button'
        className={`slot${isBooked?' booked':''}`}
        onClick={()=>setIsOpen(true)}
      >
        {data.slot.name}
        <small>{isBooked?'Booked':`₹${data.cost}`}</small>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='bmc-modal'
        overlayClassName='bmc-overlay'
        contentLabel={isBooked?'Slot booked':'Book slot'}
        ariaHideApp={false}
      >
        {isBooked ? (
          <>
            <h3>Slot already booked</h3>
            <p className='sub'>{data.slot.name} is no longer available. Please pick another slot.</p>
            <div className='bmc-modal-actions'>
              <button className='bmc-pay' onClick={closeModal}>Close</button>
            </div>
          </>
        ) : (
          <>
            <h3>Confirm your booking</h3>
            <p className='sub'>Review the details and choose how to pay.</p>
            <dl>
              <div><dt>Court</dt><dd>{data.courts.name}</dd></div>
              <div><dt>Location</dt><dd>{data.courts.location}</dd></div>
              <div><dt>Date</dt><dd>{new Date(data.date).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})}</dd></div>
              <div><dt>Slot</dt><dd>{data.slot.name}</dd></div>
              <div><dt>Total</dt><dd className='price'>₹{data.cost}</dd></div>
            </dl>
            <div className='bmc-modal-actions'>
              <button className='bmc-pay' onClick={displayRazorpay}>Pay with Razorpay</button>
              <button className='bmc-pay alt' onClick={paymentFromWallet}>Pay from wallet</button>
              <button className='bmc-cancel' onClick={closeModal}>Cancel</button>
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

export default TimesheduleComponent
