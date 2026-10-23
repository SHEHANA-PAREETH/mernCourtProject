import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPage } from '../toolkit/userSlice';

const PAGE_SIZE=5

function PaginationComponent({totalDocuments}) {
  const dispatch=useDispatch()
  const {selectedPage}=useSelector((state)=>state.user)
  const totalPages=Math.ceil((totalDocuments||0)/PAGE_SIZE)

  if(totalPages<=1) return null

  const goTo=(page)=>{
    dispatch(setSelectedPage(page))
    window.scrollTo({top:0,behavior:'smooth'})
  }

  return (
    <div className='courts-pagination'>
      <button disabled={selectedPage<=1} onClick={()=>goTo(selectedPage-1)}>‹ Prev</button>
      {Array.from({length:totalPages},(_,index)=>index+1).map((page)=>(
        <button key={page} className={page===selectedPage?'active':''} onClick={()=>goTo(page)}>{page}</button>
      ))}
      <button disabled={selectedPage>=totalPages} onClick={()=>goTo(selectedPage+1)}>Next ›</button>
    </div>
  )
}

export default PaginationComponent
