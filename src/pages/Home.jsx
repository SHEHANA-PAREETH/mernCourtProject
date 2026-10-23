import React from 'react'
import Banner from '../componets/Banner'
import Sports from '../componets/Sports'
import Homesection2 from '../componets/Homesection2'
import Homesection3 from '../componets/Homesection3'
import Homesection5 from '../componets/Homesection5'
import Testimonials from '../componets/Testimonils'
import Footer from '../componets/Footer'
import Navcomponent from '../componets/Navcomponent'
import './home.css'

function Home() {
  return (
    <div className='home'>
      <Navcomponent />
      <Banner/>
      <Sports/>
      <Homesection2/>
      <Homesection3/>
      <Testimonials/>
      <Homesection5/>
      <Footer/>
    </div>
  )
}

export default Home
