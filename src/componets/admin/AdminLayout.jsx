import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faUsers, faStore, faTicket, faBan, faBars, faFutbol } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from './adminUtils'
import './admin.css'

const LINKS=[
  { to:'/adminhome', label:'Dashboard', icon:faGauge, section:'Overview' },
  { to:'/userdetailsforadmin', label:'Users', icon:faUsers, section:'Manage' },
  { to:'/vendordetails', label:'Vendors', icon:faStore },
  { to:'/Bookedcourts', label:'Bookings', icon:faTicket, section:'Activity' },
  { to:'/cancelledcourts', label:'Cancellations', icon:faBan },
]

function AdminLayout({title, subtitle, children}) {
  const navigate=useNavigate()
  const { pathname }=useLocation()
  const { user }=useSelector((state)=>state.user)
  const [open,setOpen]=useState(false)

  const logout=()=>{
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className='adm'>
      {open && <div className='adm-scrim' onClick={()=>setOpen(false)}/>}
      <aside className={`adm-side${open?' open':''}`}>
        <div className='adm-logo'><span><FontAwesomeIcon icon={faFutbol}/></span> bookmycourt</div>
        <nav className='adm-nav'>
          {LINKS.map((link)=>(
            <React.Fragment key={link.to}>
              {link.section && <small>{link.section}</small>}
              <Link to={link.to} className={`adm-link${pathname.toLowerCase()===link.to.toLowerCase()?' active':''}`} onClick={()=>setOpen(false)}>
                <FontAwesomeIcon icon={link.icon}/> {link.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>
        <div className='adm-me'>
          <Avatar user={user}/>
          <div>
            <strong>{user.firstName} {user.lastName}</strong>
            <button onClick={logout}>Log out</button>
          </div>
        </div>
      </aside>

      <div className='adm-main'>
        <header className='adm-top'>
          <button className='adm-burger' aria-label='Open menu' onClick={()=>setOpen(true)}><FontAwesomeIcon icon={faBars}/></button>
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </header>
        <div className='adm-body'>{children}</div>
      </div>
    </div>
  )
}

export default AdminLayout
