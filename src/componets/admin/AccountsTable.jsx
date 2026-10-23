import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal'
import Swal from 'sweetalert2'
import AxiosInstance from '../../config/axiosinstance'
import { ToastError, toastSuccess } from '../../plugins/Toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Avatar, StatusBadge, TableSkeleton } from './adminUtils'

// Shared list for users and vendors: search, block/unblock, delete and a details popup.
// loadDetails(account) must return the data that renderDetails(data) shows.
function AccountsTable({title, listUrl, noun, detailsLabel, detailsTitle, loadDetails, renderDetails}) {
  const [accounts,setAccounts]=useState([])
  const [loading,setLoading]=useState(true)
  const [query,setQuery]=useState('')
  const [selected,setSelected]=useState(null)
  const [details,setDetails]=useState(null)

  useEffect(()=>{
    AxiosInstance.get(listUrl).then((resp)=>{
      setAccounts(resp?.data?.data || [])
    }).catch(()=>ToastError(`Could not load ${noun}s`)).finally(()=>setLoading(false))
  },[listUrl,noun])

  const filtered=useMemo(()=>{
    const q=query.trim().toLowerCase()
    if(!q) return accounts
    return accounts.filter((a)=>`${a.firstName} ${a.lastName} ${a.email} ${a.number}`.toLowerCase().includes(q))
  },[accounts,query])

  const openDetails=(account)=>{
    setSelected(account)
    setDetails(null)
    loadDetails(account).then(setDetails).catch(()=>{
      ToastError('Could not load details')
      setSelected(null)
    })
  }

  const toggleBlock=(account)=>{
    const block=!account.blocked
    Swal.fire({
      title: `${block?'Block':'Unblock'} ${account.firstName}?`,
      text: block ? `They won't be able to log in until you unblock them.` : 'They will be able to log in again.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: block ? '#b42318' : '#0d4a42',
      confirmButtonText: block ? 'Block' : 'Unblock',
    }).then((result)=>{
      if(!result.isConfirmed) return
      AxiosInstance.post('/admin/setblocked',{id:account._id,blocked:block}).then(()=>{
        setAccounts((list)=>list.map((a)=>a._id===account._id?{...a,blocked:block}:a))
        toastSuccess(`${account.firstName} ${block?'blocked':'unblocked'}`)
      }).catch((err)=>ToastError(err?.response?.data?.msg || 'Something went wrong'))
    })
  }

  const remove=(account)=>{
    Swal.fire({
      title: `Delete ${account.firstName} ${account.lastName}?`,
      text: 'This permanently removes the account and cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b42318',
      confirmButtonText: 'Delete',
    }).then((result)=>{
      if(!result.isConfirmed) return
      AxiosInstance.delete('/admin/deleteuser',{params:{id:account._id}}).then(()=>{
        setAccounts((list)=>list.filter((a)=>a._id!==account._id))
        toastSuccess('Account deleted')
      }).catch((err)=>ToastError(err?.response?.data?.msg || 'Something went wrong'))
    })
  }

  return (
    <>
      <div className='adm-card'>
        <div className='adm-card-head'>
          <div>
            <h2>{title}</h2>
            <small>{loading ? 'Loading…' : `${filtered.length} of ${accounts.length} ${noun}s`}</small>
          </div>
          <div className='adm-search'>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input type='text' placeholder={`Search ${noun}s…`} value={query} onChange={(e)=>setQuery(e.target.value)}/>
          </div>
        </div>

        {loading ? <TableSkeleton/> : filtered.length===0 ? (
          <div className='adm-empty'>{accounts.length===0 ? `No ${noun}s have signed up yet.` : `No ${noun}s match “${query}”.`}</div>
        ) : (
          <div className='adm-table-wrap'>
            <table className='adm-table'>
              <thead>
                <tr><th>{noun}</th><th>Mobile</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map((account)=>(
                  <tr key={account._id}>
                    <td>
                      <div className='adm-person'>
                        <Avatar user={account}/>
                        <span>{account.firstName} {account.lastName}<small>{account.email}</small></span>
                      </div>
                    </td>
                    <td data-label='Mobile'>{account.number}</td>
                    <td data-label='Status'><StatusBadge blocked={account.blocked}/></td>
                    <td data-label='Actions'>
                      <div className='adm-actions'>
                        <button className='adm-btn primary' onClick={()=>openDetails(account)}>{detailsLabel}</button>
                        <button className={`adm-btn ${account.blocked?'':'warn'}`} onClick={()=>toggleBlock(account)}>{account.blocked?'Unblock':'Block'}</button>
                        <button className='adm-btn danger' onClick={()=>remove(account)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={Boolean(selected)} onRequestClose={()=>setSelected(null)} className='adm-modal' overlayClassName='adm-overlay' ariaHideApp={false} contentLabel={detailsTitle}>
        <div className='adm-modal-head'>
          <h3>{detailsTitle}{selected ? ` · ${selected.firstName} ${selected.lastName}` : ''}</h3>
          <button onClick={()=>setSelected(null)} aria-label='Close'><FontAwesomeIcon icon={faXmark}/></button>
        </div>
        <div className='adm-modal-body'>
          {details===null ? <TableSkeleton/> : renderDetails(details)}
        </div>
      </Modal>
    </>
  )
}

export default AccountsTable
