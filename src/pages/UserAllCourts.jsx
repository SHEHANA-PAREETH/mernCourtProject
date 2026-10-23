import React, { useEffect, useState } from 'react'
import AxiosInstance from '../config/axiosinstance'
import Navcomponent from '../componets/Navcomponent'
import CourtCard from '../componets/CourtCard'
import PaginationComponent from '../componets/PaginationComponent'
import { useNavigate } from 'react-router-dom'
import { ToastError } from '../plugins/Toast'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchText, setSelectedPage } from '../toolkit/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faFutbol } from '@fortawesome/free-solid-svg-icons'
import './courts.css'

const QUICK_FILTERS=['Football','Cricket','Badminton','Basketball','Tennis']

function UserAllCourts() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[courtData,setCourtData]=useState([])
  const [totalDocuments,setTotalDocuments]=useState(0)
  const [loading,setLoading]=useState(true)
  const {selectedPage,searchText}=useSelector((state)=>state.user)

  useEffect(() => {
    getAllcourtData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText,selectedPage])

  const getAllcourtData=()=>{
    setLoading(true)
    AxiosInstance.get('/getallcourts',{params:{searchText:searchText || null,selectedPage:selectedPage}}).then((res)=>{
      setCourtData(res?.data?.data || []);
      setTotalDocuments(res?.data?.totaldocuments || 0)
    }).catch((err)=>{
      if(err?.response?.data?.message==="unauthorized request"){
        ToastError('Session expired, please log in again')
        localStorage.clear()
        navigate('/')
      }
      else{
        ToastError('Could not load courts')
      }
    }).finally(()=>setLoading(false))
  }

  const changeSearch=(value)=>{
    dispatch(setSearchText(value))
    dispatch(setSelectedPage(1))
  }

  return (
    <div className='courts-page'>
      <Navcomponent />
      <section className='courts-hero'>
        <div className='courts-wrap'>
          <h1>Find your perfect court</h1>
          <p>Browse courts, check live availability and book your slot in a few clicks.</p>
        </div>
      </section>

      <div className='courts-wrap'>
        <div className='courts-toolbar'>
          <div className='courts-search'>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input type='text' placeholder='Search by name, location or sport…' value={searchText} onChange={(e)=>changeSearch(e.target.value)}/>
          </div>
          <div className='courts-chips'>
            <button className={`courts-chip${!searchText?' active':''}`} onClick={()=>changeSearch('')}>All</button>
            {QUICK_FILTERS.map((sport)=>(
              <button key={sport} className={`courts-chip${searchText.toLowerCase()===sport.toLowerCase()?' active':''}`} onClick={()=>changeSearch(sport)}>{sport}</button>
            ))}
          </div>
        </div>

        {!loading && <div className='courts-count'>Showing <strong>{courtData.length}</strong> of <strong>{totalDocuments}</strong> courts{searchText ? <> for “{searchText}”</> : ''}</div>}
        {loading && <div className='courts-count'>Loading courts…</div>}

        {loading ? (
          <div className='courts-grid'>
            {[1,2,3].map((n)=><div className='court-skeleton' key={n}/>)}
          </div>
        ) : courtData.length===0 ? (
          <div className='courts-empty'>
            <div className='icon'><FontAwesomeIcon icon={faFutbol}/></div>
            <h3>No courts found</h3>
            <p>We couldn't find a court matching your search. Try a different name, location or sport.</p>
            <button className='courts-btn' onClick={()=>changeSearch('')}>Clear search</button>
          </div>
        ) : (
          <div className='courts-grid'>
            {courtData.map((court)=>(
              <CourtCard key={court._id} court={court} ctaLabel='View & book' onOpen={()=>navigate(`/openUserCourtEdit/${court._id}`)}/>
            ))}
          </div>
        )}

        <PaginationComponent totalDocuments={totalDocuments}/>
      </div>
    </div>
  )
}

export default UserAllCourts
