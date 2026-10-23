import React from 'react'
import Modal from 'react-modal'

const fmtDate=(value)=>new Date(value).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})
const fmtDateTime=(value)=>new Date(value).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'})

// shows who booked a slot (or that it is still free)
function SingleSlotDetailsModal({slotData, onClose}) {
  const slot=slotData[0]
  const booked=Boolean(slot?.users)
  const payment=slot?.paymentOrders?.[0]

  return (
    <Modal isOpen onRequestClose={onClose} className='vc-modal' overlayClassName='vc-overlay' ariaHideApp={false} contentLabel='Slot details' style={{content:{maxWidth:460}}}>
      <div className='vc-modal-head'>
        <h3>Slot details</h3>
        <p>{slot ? `${slot.slot.name} · ${fmtDate(slot.date)}` : ''}</p>
      </div>
      <div className='vc-modal-body'>
        <span className={`vc-status ${booked?'booked':'free'}`}>{booked?'Booked':'Not booked yet'}</span>
        <dl className='vc-detail'>
          <div><dt>Price</dt><dd>₹{slot?.cost}</dd></div>
          {booked && (
            <>
              <div><dt>Booked by</dt><dd>{slot.users.firstName} {slot.users.lastName}</dd></div>
              {slot.users.email && <div><dt>Email</dt><dd>{slot.users.email}</dd></div>}
              {slot.users.number && <div><dt>Mobile</dt><dd>{slot.users.number}</dd></div>}
              {payment?.timeStamp && <div><dt>Booked on</dt><dd>{fmtDateTime(payment.timeStamp)}</dd></div>}
              {payment && <div><dt>Payment</dt><dd>{payment.razorpayPaymentId ? 'Razorpay' : 'Wallet'}</dd></div>}
            </>
          )}
        </dl>
      </div>
      <div className='vc-modal-foot'>
        <button className='vc-btn' onClick={onClose}>Close</button>
      </div>
    </Modal>
  )
}

export default SingleSlotDetailsModal
