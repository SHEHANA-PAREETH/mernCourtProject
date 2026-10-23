import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const getSession=()=>{
  const token=localStorage.getItem('token')
  let user=null
  try{
    user=JSON.parse(localStorage.getItem('user'))
  }
  catch(error){
    user=null
  }
  return { token, role: token && user ? user.role : null }
}

const homeFor=(role)=>role===3 ? '/adminhome' : '/home'

// lets the given roles through, everyone else goes to the login page
const guard=(roles)=>function Guard(){
  const { role }=getSession()
  return roles.includes(role) ? <Outlet/> : <Navigate to="/" />
}

export const VendorAuthorization=guard([2])
export const UserAuthorization=guard([1])
export const HomeAuthorization=guard([1,2])
export const AdminAuthorization=guard([3])
export const AdminLoginPageAuth=guard([3])

// login, sign up and forgot password: anyone already logged in is sent to their own home
export function LoginPageAuth(){
  const { role }=getSession()
  return role ? <Navigate to={homeFor(role)}/> : <Outlet/>
}
