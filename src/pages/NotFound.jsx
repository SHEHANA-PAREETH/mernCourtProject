import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'

function NotFound() {
  return (
    <div className='auth-page' style={{gridTemplateColumns:'1fr'}}>
      <section className='auth-panel' style={{background:'#f6faf9'}}>
        <div className='auth-card' style={{textAlign:'center'}}>
          <div style={{fontSize:'5rem',fontWeight:800,letterSpacing:'-0.05em',color:'#0d4a42',lineHeight:1}}>404</div>
          <h2 style={{marginTop:12}}>Out of bounds</h2>
          <p className='auth-sub'>The page you're looking for doesn't exist or has moved.</p>
          <Link to='/' className='auth-btn' style={{display:'inline-flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}>Back to home</Link>
        </div>
      </section>
    </div>
  )
}

export default NotFound
