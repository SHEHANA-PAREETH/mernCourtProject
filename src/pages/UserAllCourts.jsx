import React, { useEffect, useState } from 'react'
import AxiosInstance from '../config/axiosinstance'
import SingleCourtUser from './SingleCourtUser'
import Navcomponent from '../componets/Navcomponent'
import {useNavigate } from 'react-router-dom'

import { ToastError } from '../plugins/Toast'

function UserAllCourts() {
  const navigate=useNavigate()
  const[courtData,setCourtData]=useState([])
  useEffect(() => {
    getAllcourtData()
  }, [])
  
  const getAllcourtData=()=>{
    try{
      AxiosInstance.get('/getallcourts').then((res)=>{
  
        setCourtData(res?.data?.data);
        console.log(courtData);
    }).catch((res)=>{
  if(res.response.data.message==="unauthorized request"){
    ToastError('something went wrong')
    localStorage.clear()
    navigate('/')
  }
    })
    }
    catch(error){
      console.log(error);
      alert('something went wrong')
    }
   
  }
    return (
    <>

    < Navcomponent />
    {
        courtData.map((element)=><SingleCourtUser data={element}/>)
    }
    </>
  )
}

export default UserAllCourts