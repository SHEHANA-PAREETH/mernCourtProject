import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function VendorAuthorization() {
    const token=localStorage.getItem('token')
const user=JSON.parse(localStorage.getItem('user'))
  return (
    (token && (user.role=== 2)) ? <Outlet/>:< Navigate to="/" />
  )
}

export function LoginPageAuth(){
  const token=localStorage.getItem('token')
  return(
    token ?  <Navigate to="/home"/> :<Outlet/>
  )
}

export function AdminAuthorization() {
  const token=localStorage.getItem('token')
const user=JSON.parse(localStorage.getItem('user'))
return (
  (token && user.role=== 3) ? <Outlet/>:< Navigate to="/" />
)
}
export function UserAuthorization() {
  const token=localStorage.getItem('token')
const user=JSON.parse(localStorage.getItem('user'))
return (
  (token && user.role=== 1) ? <Outlet/>:< Navigate to="/" />
)
}
export function HomeAuthorization() {
  const token=localStorage.getItem('token')
const user=JSON.parse(localStorage.getItem('user'))
return (
  (token && user.role=== 1) ||  (token && user.role=== 2) ? <Outlet/>:< Navigate to="/" />
)
}
