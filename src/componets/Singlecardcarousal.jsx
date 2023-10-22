import React, { useEffect, useState } from 'react'
import './Singlecardcarousal.css'
import { BASEURL } from '../Constants/baseURL';
import { Container,Row,Col } from 'react-bootstrap';

function Singlecardcarousal({courtsdetails}) {
  useEffect(()=>{
  console.log({courtsdetails});
  },[])  
    
 
  return (
   <>
  
   <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src={`${BASEURL}/uploads/${courtsdetails.image1}`} class="d-block w-" alt="..." style={{height:'550px'}}/>
      <div className="carousel-caption d-none d-md-block">
       <div className='carousal-text'>
       <h2 >{courtsdetails.name}</h2>
        <p>{courtsdetails.description}</p>
       </div>
       
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src={`${BASEURL}/uploads/${courtsdetails.image2}`} class="d-block w-100" alt="..." style={{height:'550px'}}/>
      <div className="carousel-caption d-none d-md-block">
      <div className='carousal-text'>
       <h2  >{courtsdetails.name}</h2>
        <p>{courtsdetails.description}</p>
       </div>
      </div>
    </div>
    <div className="carousel-item">
      <img src={`${BASEURL}/uploads/${courtsdetails.image3}`} class="d-block w-100" alt="..." style={{height:'550px'}}/>
      <div className="carousel-caption d-none d-md-block">
      <div className='carousal-text'>
       <h2  >{courtsdetails.name}</h2>
        <p>{courtsdetails.description}</p>
       </div>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

   
  
   </>

  )
}

export default Singlecardcarousal