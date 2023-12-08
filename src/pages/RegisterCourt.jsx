import React, { useEffect, useState } from 'react'
import {FloatingLabel,Button,Form,Container} from 'react-bootstrap'
import './registerCourt.css'
import Swal from 'sweetalert2'

import {useNavigate} from 'react-router-dom'
import AxiosInstance from '../config/axiosinstance'
import Navcomponent from '../componets/Navcomponent'
import { ToastError } from '../plugins/Toast'
function RegisterCourt() {
  const [selectedImages, setSelectedImages] = useState([]);
  const[files,setFile]=useState([])
const navigate=useNavigate()
  const [courtData,setCourtData]=useState({
    name:'',
  location:'',
    description:'',
   
  })
    const onSelectFile = (event) => {
  
      const selectedFiles = event.target.files;
  
      const selectedFilesArray = Array.from(selectedFiles);
  setFile(selectedFilesArray)
      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });
  
      setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  
      // FOR BUG IN CHROME
      event.target.value = "";
    };
  
    function deleteHandler(image) {
      setSelectedImages(selectedImages.filter((e) => e !== image));
      URL.revokeObjectURL(image);
    }
    const handleInputChange=(e)=>{
      const {name,value}=e.target
      setCourtData((prevFormData) => 
      ({ ...prevFormData, [name]:value}))
     }

    
     
const handleSubmit= async (e)=>{
      
  e.preventDefault()
    
   const formData = new FormData()
   for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }
    
  for ( var key in courtData ) {
    formData.append(key, courtData[key]);
}
    function hasEmptyValue(obj){
      return Object.values(obj).some(value=> value === "")
    }

if(files.length === 0 || hasEmptyValue(courtData)){
  ToastError('fields cannot be empty')
}
else{
  const result = await AxiosInstance.post('/vendor/newcourtregistration', formData,
  { headers: {'Content-Type': 'multipart/form-data'}})
 console.log(result.data)
 if(result?.data?.courtregister){

   Swal.fire({  
      
     text: 'Register successfully.',
     icon: 'success'
   }).then(
    // window.location.reload()
    
    navigate('/mycourts')
   )
 }
 else{
   Swal.fire({  
      
     text: 'something went wrong ',
   
   })
 } 
}
  
    }



  return (
<>
<Navcomponent/>
<Container fluid className='registerpage' style={{ height:'633px'}}>
      
        <Form onSubmit={handleSubmit} className='w-75 mx-auto my-5 p-5
         shadow-lg' style={{ border:'1px solid grey'}} > 
   <Form.Group className="mb-3 " >
     <Form.Label className=''>Court name</Form.Label>
     <Form.Control type="text" placeholder="name" name='name' value={courtData.name} onChange={(e)=>handleInputChange(e)} />

   </Form.Group>
   <Form.Group className="mb-3 " >
     <Form.Label className=''>Location</Form.Label>
     <Form.Control type="text" placeholder="" name='location' value={courtData.location} onChange={(e)=>handleInputChange(e)} />

   </Form.Group>
   
   
   
   <FloatingLabel
        controlId="floatingTextarea"
        label="Description"
        className="mb-3"
      >
      <Form.Control name="description" placeholder="Leave a comment here" value={courtData.description} onChange={(e)=>handleInputChange(e)} />
      </FloatingLabel>
   
      <Form.Group>
     
        <Form.Control
          type="file"
          name="images"
          onChange={onSelectFile}
          
          multiple
          accept="image/png , image/jpeg, image/webp" className="my-3"
        />
     
    </Form.Group>

    <Form.Group>
    {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            You can't upload more than 10 images! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) :'')}

      <div className="d-flex">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image} className="me-2">
                <img src={image} height="100" width="150px" alt="upload" /><br/>
                <button onClick={() => deleteHandler(image)} className="btn btn-dark mt-2">
                  delete image
                </button>
                
              </div>
            );
          })}
      </div>
    </Form.Group>
   <Button  variant=" w-25 my-3 " className='mx-auto text-light' type="submit" style={{backgroundColor:'#0D4A42'}}>
     Save
   </Button>
   
 </Form>

 </Container>
</>
   
  )
}

export default RegisterCourt