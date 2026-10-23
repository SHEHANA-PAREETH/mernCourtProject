import React, { useEffect, useState } from 'react'
import AxiosInstance from '../config/axiosinstance'
import { Link, useNavigate } from 'react-router-dom';
import { ToastError } from '../plugins/Toast';
import Navcomponent from '../componets/Navcomponent';
import CourtCard from '../componets/CourtCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus, faWarehouse } from '@fortawesome/free-solid-svg-icons'
import './courts.css'

function MyCourts() {
  const navigate=useNavigate()
  const[mycourtData,setMycourtData]=useState([])
  const [loading,setLoading]=useState(true)
  const [query,setQuery]=useState('')

  useEffect(()=>{
    getMyCourts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getMyCourts=()=>{
    AxiosInstance.get('vendor/mycourts').then((resp)=>{
      setMycourtData(resp.data.data || []);
    }).catch((err)=>{
      if(err?.response?.data?.message==="unauthorized request"){
        localStorage.clear()
        ToastError('Session expired, please log in again')
        navigate('/')
      }
      else{
        ToastError('Could not load your courts')
      }
    }).finally(()=>setLoading(false))
  }

  const filtered=mycourtData.filter((court)=>
    `${court.name} ${court.location} ${court.description}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className='courts-page'>
      <Navcomponent/>
      <section className='courts-hero'>
        <div className='courts-wrap courts-hero-row'>
          <div>
            <h1>My courts</h1>
            <p>Manage your venues, update slots and keep an eye on bookings.</p>
          </div>
          <Link to='/registercourt' className='courts-btn'><FontAwesomeIcon icon={faPlus}/> Register new court</Link>
        </div>
      </section>

      <div className='courts-wrap'>
        <div className='courts-toolbar'>
          <div className='courts-search'>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input type='text' placeholder='Search your courts…' value={query} onChange={(e)=>setQuery(e.target.value)}/>
          </div>
        </div>

        {!loading && mycourtData.length>0 && (
          <div className='courts-count'>
            You have <strong>{mycourtData.length}</strong> {mycourtData.length===1?'court':'courts'}
            {query && <> · <strong>{filtered.length}</strong> match “{query}”</>}
          </div>
        )}
        {(loading || mycourtData.length===0) && <div className='courts-count'>{loading?'Loading your courts…':''}</div>}

        {loading ? (
          <div className='courts-grid'>
            {[1,2,3].map((n)=><div className='court-skeleton' key={n}/>)}
          </div>
        ) : mycourtData.length===0 ? (
          <div className='courts-empty'>
            <div className='icon'><FontAwesomeIcon icon={faWarehouse}/></div>
            <h3>You haven't registered a court yet</h3>
            <p>Add your first court with photos and a description, then set the slots players can book.</p>
            <Link to='/registercourt' className='courts-btn'><FontAwesomeIcon icon={faPlus}/> Register a court</Link>
          </div>
        ) : filtered.length===0 ? (
          <div className='courts-empty'>
            <div className='icon'><FontAwesomeIcon icon={faMagnifyingGlass}/></div>
            <h3>No courts match your search</h3>
            <p>Try a different name or location.</p>
            <button className='courts-btn' onClick={()=>setQuery('')}>Clear search</button>
          </div>
        ) : (
          <div className='courts-grid'>
            {filtered.map((court)=>(
              <CourtCard key={court._id} court={court} ctaLabel='Manage court & slots' onOpen={()=>navigate(`/openCourtEdit/${court._id}`)}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCourts
