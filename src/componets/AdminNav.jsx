import React, { useEffect, useState } from 'react'
import './AdminNav.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Navbar ,Col} from 'react-bootstrap'
import logo from './images/download.png'
function AdminNav() {
    const navigate=useNavigate()
const{user}=useSelector((state)=>state.user)
const logout=()=>{
    localStorage.clear()
    navigate('/')
}
  return (
<Col className='adminhome' >
<Navbar.Brand href="#"><img
              src={logo}
              width="100"
              height="100"
              className=" mt-5 d-inline-block align-top"
              alt="logo"
              
            /></Navbar.Brand>

<ul className="nav flex-column mt-5">
<li className="nav-item mt-5">
      <a className="nav-link active" aria-current="page" href="#"><h4>{`${user.firstName}  ${user.lastName}`}</h4></a>
    </li>
    <li className="nav-item">
      <a className="nav-link active" aria-current="page" href="/userdetailsforadmin">Users</a>
    </li>
    <li className="nav-item">
      <a class="nav-link" href="/vendordetails">Vendors</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/Bookedcourts">Booked Courts</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/cancelledcourts">cancelled Courts</a>
    </li>
   
    <li className="nav-item">
      <a className="nav-link" onClick={logout} >Log out</a>
    </li>
  </ul>
</Col>
    
  )
}

export default AdminNav