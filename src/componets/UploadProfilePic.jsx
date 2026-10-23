import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import AxiosInstance from '../config/axiosinstance'
import { imageUrl } from '../config/imageUrl'
import Navcomponent from './Navcomponent'
import { ToastError, toastSuccess } from '../plugins/Toast'
import defaultpic from './images/profile.png'
import '../pages/courts.css'
import '../pages/registerCourt.css'

const MAX_SIZE=5*1024*1024

function UploadProfilePic() {
  const navigate=useNavigate()
  const { user }=useSelector((state)=>state.user)
  const [profilePic,setProfilePic]=useState(null)
  const [preview,setPreview]=useState('')
  const [currentUrl,setCurrentUrl]=useState('')
  const [saving,setSaving]=useState(false)

  useEffect(()=>{
    AxiosInstance.get('/getprofiepic').then((resp)=>{
      if(resp?.data?.url) setCurrentUrl(imageUrl(resp.data.url))
    }).catch(()=>{})
  },[])

  useEffect(()=>{
    if(!profilePic){
      setPreview('')
      return
    }
    const url=URL.createObjectURL(profilePic)
    setPreview(url)
    return ()=>URL.revokeObjectURL(url)
  },[profilePic])

  const selectImage=(e)=>{
    const file=e.target.files[0]
    e.target.value=''
    if(!file) return
    if(!['image/png','image/jpeg','image/webp'].includes(file.type)){
      ToastError('Please choose a PNG, JPG or WEBP image')
      return
    }
    if(file.size>MAX_SIZE){
      ToastError('The image must be smaller than 5 MB')
      return
    }
    setProfilePic(file)
  }

  const submitImage=async (e)=>{
    e.preventDefault()
    if(!profilePic){
      ToastError('Choose a photo first')
      return
    }
    const formData=new FormData()
    formData.append('image',profilePic)
    setSaving(true)
    try{
      const result=await AxiosInstance.post('/uploadprofilepic',formData,{ headers:{'Content-Type':'multipart/form-data'} })
      if(result.data.msg==='success'){
        toastSuccess('Profile photo updated')
        navigate('/home')
      }
      else{
        ToastError('Could not upload the photo')
      }
    }
    catch(error){
      ToastError('Could not upload the photo')
    }
    finally{
      setSaving(false)
    }
  }

  return (
    <div className='courts-page'>
      <Navcomponent/>
      <section className='courts-hero' style={{paddingBottom:90}}>
        <div className='courts-wrap'>
          <h1>Profile photo</h1>
          <p>Add a photo so vendors and friends can recognise you.</p>
        </div>
      </section>

      <div className='courts-wrap' style={{maxWidth:560}}>
        <form className='rc-card' onSubmit={submitImage} style={{marginTop:-34,marginBottom:60,position:'relative',zIndex:2,textAlign:'center'}}>
          <div style={{position:'relative',width:160,height:160,margin:'6px auto 18px'}}>
            <img
              src={preview || currentUrl || defaultpic}
              alt='Profile preview'
              style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:'cover',border:'4px solid #f59e0b',background:'#fff',boxShadow:'0 14px 30px rgba(8,51,45,0.18)'}}
            />
            <label className='courts-btn' style={{position:'absolute',right:-4,bottom:4,width:44,height:44,padding:0,justifyContent:'center',borderRadius:'50%',cursor:'pointer'}} title='Choose photo'>
              <FontAwesomeIcon icon={faCamera}/>
              <input type='file' accept='image/png, image/jpeg, image/webp' onChange={selectImage} style={{display:'none'}}/>
            </label>
          </div>

          <h2 style={{marginBottom:2}}>{user.firstName} {user.lastName}</h2>
          <p className='sub' style={{marginBottom:24}}>
            {profilePic ? `Selected: ${profilePic.name}` : 'PNG, JPG or WEBP, up to 5 MB'}
          </p>

          <div className='rc-actions'>
            {profilePic
              ? <button type='button' className='rc-ghost' onClick={()=>setProfilePic(null)} style={{cursor:'pointer'}}>Remove selection</button>
              : <button type='button' className='rc-ghost' onClick={()=>navigate(-1)} style={{cursor:'pointer'}}>Cancel</button>}
            <button type='submit' className='courts-btn' disabled={saving || !profilePic} style={{cursor:'pointer',opacity:profilePic?1:0.55}}>{saving?'Uploading…':'Save photo'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadProfilePic
