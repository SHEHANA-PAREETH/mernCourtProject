import React, { useEffect, useState } from "react";
import {FloatingLabel,Button,Form} from 'react-bootstrap'
import axios from 'axios'


const Newproduct = () => {
  const [selectedImages, setSelectedImages] = useState([]);
const[files,setFile]=useState([])

const [productdata,setProductData]=useState({
  name:'',
  category:'',
  description:'',
  price:''
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
    setProductData((prevFormData) => 
    ({ ...prevFormData, [name]:value}))
  
  
   }
   
const handleSubmit= async (e)=>{
  e.preventDefault()

const formData = new FormData()
files.forEach((value) => { 
  formData.append('fieldName[]', value); 
});

  Object.entries(productdata).forEach(([key, value]) => {
    formData.append(key, value);})
  console.log(formData);

const result = await axios.post('http://localhost:4000/admin/newproduct', formData,
   { headers: {'Content-Type': 'multipart/form-data'}})
  console.log(result.data)
}

useEffect(()=>{
  console.log(files);
},[files])
  return (
    <>

<Form onSubmit={handleSubmit} className='w-75 mx-auto my-5' > 
   
   
   
   <Form.Group className="mb-3 " >
     <Form.Label className=''>name</Form.Label>
     <Form.Control type="text" placeholder="name" name='name' value={productdata.name} onChange={(e)=>handleInputChange(e)}/>

   </Form.Group>
  
 <Form.Group>
   <Form.Select aria-label="Default select example" name='category' value={productdata.category} onChange={(e)=>handleInputChange(e)}>
      <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
    </Form.Group>
   
   <Form.Group>
      <Form.Label>
       
        up to 10 images
        <Form.Control
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp" className="my-3"
        />
      </Form.Label>
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
        ) : (
          <button
            className="upload-btn"
            onClick={() => {
              console.log(selectedImages);
            }}
          >
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </button>
        ))}

      <div className="d-flex">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image} className="">
                <img src={image} height="100" alt="upload" />
                <button onClick={() => deleteHandler(image)} className="btn btn-danger">
                  delete image
                </button>
                
              </div>
            );
          })}
      </div>
    </Form.Group>
     
   <Form.Group className="mb-3" >
     <Form.Label className=''>price</Form.Label>
     <Form.Control type="number" placeholder="price" name='price' value={productdata.price} onChange={(e)=>handleInputChange(e)}/>
   </Form.Group>
   
   <FloatingLabel
        controlId="floatingTextarea"
        label="Description"
        className="mb-3"
      >
        <Form.Control name="description" placeholder="Leave a comment here" value={productdata.description} onChange={(e)=>handleInputChange(e)}/>
      </FloatingLabel>
   
   
 

   

   
   <Button variant="danger w-25 mb-3 " className='mx-auto' type="submit">
     Save
   </Button>
   
 </Form>
    
    
      

   

     
  
    </>
    
  );
};

export default Newproduct;