import React from 'react'
import AdminLayout from './AdminLayout'
import AccountsTable from './AccountsTable'
import AxiosInstance from '../../config/axiosinstance'
import { imageUrl } from '../../config/imageUrl'

const loadCourts=(vendor)=>
  AxiosInstance.get('/admin/getcourtDetails',{params:{id:vendor._id}}).then((resp)=>resp?.data?.data || [])

const renderCourts=(courts)=>
  courts.length===0 ? <div className='adm-empty'>This vendor hasn't registered any courts yet.</div> : (
    <div>
      {courts.map((court)=>(
        <div className='adm-court' key={court._id}>
          {court.image?.[0]
            ? <img src={imageUrl(court.image[0].filename)} alt=''/>
            : <div className='noimg'/>}
          <div>
            <strong>{court.name}</strong>
            <small>{court.location}</small>
          </div>
        </div>
      ))}
    </div>
  )

function VendorData() {
  return (
    <AdminLayout title='Vendors' subtitle='Court owners on the platform. Block accounts or review their courts.'>
      <AccountsTable
        title='All vendors'
        listUrl='/admin/vendordetails'
        noun='vendor'
        detailsLabel='Courts'
        detailsTitle='Registered courts'
        loadDetails={loadCourts}
        renderDetails={renderCourts}
      />
    </AdminLayout>
  )
}

export default VendorData
