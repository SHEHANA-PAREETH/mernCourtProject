import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AxiosInstance from '../config/axiosinstance'
import Navcomponent from '../componets/Navcomponent'
import { ToastError, toastSuccess } from '../plugins/Toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp, faXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import './courts.css'
import './registerCourt.css'

const MAX_IMAGES=5// the backend accepts at most 5 images per court
const MAX_DESCRIPTION=500

function RegisterCourt() {
  const navigate=useNavigate()
  const inputRef=useRef(null)
  const [images,setImages]=useState([])// [{file,url}]
  const [dragging,setDragging]=useState(false)
  const [saving,setSaving]=useState(false)
  const [courtData,setCourtData]=useState({ name:'', location:'', description:'' })

  // free the preview urls when leaving the page
  useEffect(()=>()=>images.forEach((image)=>URL.revokeObjectURL(image.url)),[]) // eslint-disable-line react-hooks/exhaustive-deps

  const addFiles=(fileList)=>{
    const valid=Array.from(fileList).filter((file)=>['image/png','image/jpeg','image/webp'].includes(file.type))
    if(valid.length<fileList.length) ToastError('Only PNG, JPG and WEBP images are allowed')
    const room=MAX_IMAGES-images.length
    if(valid.length>room) ToastError(`You can add up to ${MAX_IMAGES} images`)
    setImages((current)=>[...current,...valid.slice(0,room).map((file)=>({file,url:URL.createObjectURL(file)}))])
  }

  const removeImage=(image)=>{
    URL.revokeObjectURL(image.url)
    setImages((current)=>current.filter((item)=>item!==image))
  }

  const handleInputChange=(e)=>{
    const {name,value}=e.target
    setCourtData((previous)=>({ ...previous, [name]:value }))
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    if(images.length===0 || Object.values(courtData).some((value)=>value.trim()==='')){
      ToastError('Please fill in every field and add at least one photo')
      return
    }
    const formData=new FormData()
    images.forEach((image)=>formData.append('images',image.file))
    Object.entries(courtData).forEach(([key,value])=>formData.append(key,value.trim()))

    setSaving(true)
    try{
      const result=await AxiosInstance.post('/vendor/newcourtregistration',formData,{ headers:{'Content-Type':'multipart/form-data'} })
      if(result?.data?.courtregister){
        toastSuccess('Court registered successfully')
        navigate('/mycourts')
      }
      else{
        ToastError('Something went wrong, please try again')
      }
    }
    catch(error){
      ToastError('Could not register the court, please try again')
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
          <h1>Register a new court</h1>
          <p>Add the details and photos players will see, then set up bookable slots from My Courts.</p>
        </div>
      </section>

      <div className='courts-wrap'>
        <form className='rc-grid' onSubmit={handleSubmit} noValidate>
          <div className='rc-card'>
            <h2>Court details</h2>
            <p className='sub'>Tell players what makes your court worth booking.</p>

            <div className='rc-field'>
              <label htmlFor='rc-name'>Court name</label>
              <input id='rc-name' className='rc-input' type='text' name='name' placeholder='e.g. Downtown Arena Football Turf' value={courtData.name} onChange={handleInputChange}/>
            </div>
            <div className='rc-field'>
              <label htmlFor='rc-location'>Location</label>
              <input id='rc-location' className='rc-input' type='text' name='location' placeholder='e.g. Kochi, Kerala' value={courtData.location} onChange={handleInputChange}/>
            </div>
            <div className='rc-field'>
              <label htmlFor='rc-description'>Description <small>{courtData.description.length}/{MAX_DESCRIPTION}</small></label>
              <textarea id='rc-description' className='rc-input' name='description' maxLength={MAX_DESCRIPTION} placeholder='Surface, floodlights, changing rooms, parking, rules…' value={courtData.description} onChange={handleInputChange}/>
            </div>
          </div>

          <div>
            <div className='rc-card' style={{marginBottom:24}}>
              <h2>Photos</h2>
              <p className='sub'>Add up to {MAX_IMAGES} photos. The first one is the cover image.</p>

              <label
                className={`rc-drop${dragging?' over':''}`}
                onDragOver={(e)=>{e.preventDefault();setDragging(true)}}
                onDragLeave={()=>setDragging(false)}
                onDrop={(e)=>{e.preventDefault();setDragging(false);addFiles(e.dataTransfer.files)}}
              >
                <span className='icon'><FontAwesomeIcon icon={faCloudArrowUp}/></span>
                <span><strong>Click to upload</strong> or drag and drop</span>
                <small>PNG, JPG or WEBP · {images.length}/{MAX_IMAGES} added</small>
                <input ref={inputRef} type='file' accept='image/png, image/jpeg, image/webp' multiple disabled={images.length>=MAX_IMAGES} onChange={(e)=>{addFiles(e.target.files);e.target.value=''}}/>
              </label>

              {images.length>0 && (
                <div className='rc-previews'>
                  {images.map((image,index)=>(
                    <div className='rc-preview' key={image.url}>
                      <img src={image.url} alt={`Upload ${index+1}`}/>
                      {index===0 && <span className='cover'>Cover</span>}
                      <button type='button' aria-label='Remove photo' onClick={()=>removeImage(image)}><FontAwesomeIcon icon={faXmark}/></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='rc-card'>
              <h2>Good to know</h2>
              <ul className='rc-tips' style={{marginTop:14}}>
                <li><FontAwesomeIcon icon={faCircleCheck}/><span>After saving, open the court from <b>My Courts</b> to add dates, time slots and prices.</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck}/><span>Bright, landscape photos get the most bookings.</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck}/><span>Mention facilities like floodlights, parking and changing rooms.</span></li>
              </ul>
              <div className='rc-actions' style={{marginTop:22}}>
                <Link to='/mycourts' className='rc-ghost'>Cancel</Link>
                <button type='submit' className='courts-btn' disabled={saving} style={{cursor:'pointer'}}>{saving?'Saving…':'Register court'}</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterCourt
