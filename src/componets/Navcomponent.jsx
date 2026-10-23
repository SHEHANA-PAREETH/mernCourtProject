import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from './images/download.png'
import defaultpic from './images/profile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faImage, faRightFromBracket, faWallet } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AxiosInstance from '../config/axiosinstance';
import { imageUrl } from '../config/imageUrl';
import { setSearchText } from '../toolkit/userSlice';
import './Navcomponent.css'

function Navcomponent() {
const [wallet,setWallet]=useState()
const [imageurl,setUrl]=useState()
const dispatch= useDispatch()
const navigate=useNavigate()
const { pathname }=useLocation()

const{user}=useSelector((state)=>state.user)

useEffect(()=>{
  AxiosInstance.get(`/getprofiepic`).then((resp)=>{
    if(resp?.data?.url){
      setUrl(resp?.data?.url)
    }
  }).catch((error)=>{
    console.log(error);
  })
},[])

const getWallet= async()=>{
  try{
    const result= await AxiosInstance.get('payment/getwalletBalance')
    setWallet(result.data.amount)
  }
  catch(error){
    console.log(error);
  }
}

const handlelogout=()=>{
  localStorage.clear()
  navigate('/')
}

const links=[
  { to:'/home', label:'Home', show:true },
  { to:'/userallcourts', label:'Courts', show:user.role===1 },
  { to:'/userBookings', label:'My Bookings', show:user.role===1 },
  { to:'/mycourts', label:'My Courts', show:user.role===2 },
  { to:'/registercourt', label:'Register Court', show:user.role===2 },
].filter((link)=>link.show)

const profileImage=imageurl ? imageUrl(imageurl) : defaultpic
const fullName=`${user.firstName} ${user.lastName}`

  return (
    <Navbar expand="lg" className='bmc-nav'>
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img src={logo} alt="bookmycourt" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="bmc-navbar" />
        <Navbar.Collapse id="bmc-navbar">
          <Nav className="me-auto ms-lg-3 align-items-lg-center">
            {links.map((link)=>(
              <Nav.Link key={link.to} as={Link} to={link.to} className={`bmc-link${pathname===link.to?' active':''}`}>
                {link.label}
              </Nav.Link>
            ))}
          </Nav>

          {!['/home','/userallcourts','/mycourts'].includes(pathname) && (
            <div className='bmc-search'>
              <FontAwesomeIcon icon={faMagnifyingGlass}/>
              <input type="text" placeholder="Search…" aria-label="Search" onChange={(e)=>dispatch(setSearchText(e.target.value))}/>
            </div>
          )}

          <Nav className='bmc-profile'>
            <NavDropdown
              align="end"
              id="bmc-profile-dropdown"
              onToggle={(open)=>open && getWallet()}
              title={<><img src={profileImage} alt="profile"/><span>{fullName}</span></>}
            >
              <div className='bmc-profile-head'>
                <strong>{fullName}</strong>
                {user.email && <small>{user.email}</small>}
              </div>
              <div className='bmc-wallet'>
                <span><FontAwesomeIcon icon={faWallet} className='me-2'/>Wallet</span>
                <b>₹{wallet ?? '—'}</b>
              </div>
              <NavDropdown.Item as={Link} to="/uploadprofilepic"><FontAwesomeIcon icon={faImage}/> Change profile picture</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item className='danger' onClick={handlelogout}><FontAwesomeIcon icon={faRightFromBracket}/> Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navcomponent
