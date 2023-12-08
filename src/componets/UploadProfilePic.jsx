import React, { useEffect, useState } from 'react'
import {FloatingLabel,Button,Form,Container} from 'react-bootstrap'
import AxiosInstance from '../config/axiosinstance'
import { ToastError, toastSuccess } from '../plugins/Toast'
import { useNavigate } from 'react-router-dom'
function UploadProfilePic() {
const navigate=useNavigate()
const [profilePic,setProfilePic]=useState('')
const selectImage=(e)=>{
  setProfilePic(e.target.files[0])
}
const submitImage= async (e)=>{
    e.preventDefault()
    console.log(profilePic);
    if(profilePic){
      const formData = new FormData();
      formData.append('image', profilePic);
      const result = await AxiosInstance.post('/uploadprofilepic',formData,
      { headers: {'Content-Type': 'multipart/form-data'}})
     console.log(result.data)
     if(result.data.msg ==="success"){

      toastSuccess('uploaded suucessfully')
      setTimeout(()=>{
        navigate('/home')
      },1000)
    
     }
    }
    else{
      ToastError('upload image')
    }
    
}

  return (
    <>
    
   
         <Form  className='w-75 mx-auto my-5 p-5
         shadow-lg' style={{ border:'1px solid grey'}}  onSubmit={submitImage}>
         
        <Form.Control
          type='file'
          name="image"
          onChange={selectImage}
        />
       {profilePic && (
        <div>
          <img className='mt-3'
            alt="not found"
            style={{height:'200px',width:'200px'}}
            src={URL.createObjectURL(profilePic)}
          />
          <Button className='mt-3' onClick={() => setProfilePic(null)}>Remove</Button>
        </div>
      )}

        <Button className='mt-3' type="submit">save</Button>
        </Form>
    </>

   
  )
}

export default UploadProfilePic