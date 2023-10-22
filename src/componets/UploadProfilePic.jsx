import React, { useEffect, useState } from 'react'
import {FloatingLabel,Button,Form,Container} from 'react-bootstrap'
import AxiosInstance from '../config/axiosinstance'
function UploadProfilePic() {

const [profilePic,setProfilePic]=useState('')
const selectImage=(e)=>{
 
  setProfilePic(e.target.files[0])
 

}
const submitImage= async (e)=>{
    e.preventDefault()
    console.log(profilePic);
    const result = await AxiosInstance.post('/uploadprofilepic', profilePic,
    { headers: {'Content-Type': 'multipart/form-data'}})
   console.log(result.data)
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
            width={"250px"}
            src={URL.createObjectURL(profilePic)}
          />
          <button onClick={() => setProfilePic(null)}>Remove</button>
        </div>
      )}

        <button>save</button>
        </Form>
    </>

   
  )
}

export default UploadProfilePic