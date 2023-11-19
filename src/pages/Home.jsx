
import React from 'react'
import Banner from '../componets/Banner'
import Homesection2 from '../componets/Homesection2'
import { Container,Row } from 'react-bootstrap'
import Homesection3 from '../componets/Homesection3'

import Homesection5 from '../componets/Homesection5'
import Testimonials from '../componets/Testimonils'
import Footer from '../componets/Footer'
import Navcomponent from '../componets/Navcomponent'
function Home() {
  return (
  

<>
< Navcomponent />
<Banner/> 
<Homesection2/> 
<Homesection3/>
<Homesection5/>
< Testimonials/>
<Footer/>
</>
  )
}

export default Home