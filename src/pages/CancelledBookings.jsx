import React from 'react'
import UserBooking from './UserBooking'

// the cancelled list now lives in a tab of the My Bookings page
function CancelledBookings() {
  return <UserBooking initialTab='cancelled'/>
}

export default CancelledBookings
