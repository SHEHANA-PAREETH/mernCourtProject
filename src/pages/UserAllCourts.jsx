import React, { useEffect, useState } from 'react'
import AxiosInstance from '../config/axiosinstance'
import SingleCourtUser from './SingleCourtUser'
import Navcomponent from '../componets/Navcomponent'
import {useNavigate } from 'react-router-dom'

import { ToastError } from '../plugins/Toast'
import { useDispatch, useSelector } from 'react-redux'
import PaginationComponent from '../componets/PaginationComponent'
import { setOpenLoader } from '../toolkit/userSlice'

function UserAllCourts() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[courtData,setCourtData]=useState([])
  const [totalDocuments,setTotalDocuments]=useState()
  const {selectedPage}=useSelector((state)=>state.user)
  const {searchText}=useSelector((state)=>state.user)
  useEffect(() => {
    getAllcourtData()
  }, [searchText,selectedPage])
  
  const getAllcourtData=()=>{
    try{
      console.log(selectedPage);
      dispatch(setOpenLoader(true))
      AxiosInstance.get('/getallcourts',{params:{searchText:searchText ?? null,selectedPage:selectedPage}}).then((res)=>{
  
        setCourtData(res?.data?.data);
       console.log(res?.data?.totaldocuments);//get documents
       setTotalDocuments(res?.data?.totaldocuments)
        console.log(courtData);
    }).catch((res)=>{
  if(res.response.data.message==="unauthorized request"){
    ToastError('something went wrong')
    localStorage.clear()
    navigate('/')
  }
    })
    dispatch(setOpenLoader(false))
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
  <div>
  <PaginationComponent totalDocuments={totalDocuments}/>
  </div>
    </>
  )
}

export default UserAllCourts