import React from 'react'


function VendorTable({singleCourtData}) {
  return (
    <table class="table mt-5 table-dark  table-striped-columns" >
  <thead>
    <tr>
      <th scope="col">SI NO</th>
      <th scope="col">Registered Court Name</th>
      <th scope="col">Location</th>
      <th scope="col">Image</th>
   
    </tr>
  </thead>
  <tbody>
  

{singleCourtData.map((obj,index)=>
<tr>
<td>{index+1}</td>
<td>{obj.name}</td>
<td>{obj.location}</td>
<td className='d-flex'><img className='me-3' src={`${process.env.REACT_APP_BASE_URL}/uploads/${obj.image[0].filename}`} style={{width:'100px'}} alt="" />
<img className="me-3" src={`${process.env.REACT_APP_BASE_URL}/uploads/${obj.image[1].filename}`}style={{width:'50px'}} alt="" />
<img className='me-3' src={`${process.env.REACT_APP_BASE_URL}/uploads/${obj.image[2].filename}`} style={{width:'50px'}} alt="" /></td>


</tr>
  
)}

      
     
    </tbody>
    </table>
  )
     
}

export default VendorTable