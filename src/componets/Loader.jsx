import React from 'react'

// full screen overlay, used for the global loading state and as the Suspense fallback
function Loader() {
  return (
    <div style={{position:'fixed',inset:0,zIndex:3000,display:'grid',placeItems:'center',background:'rgba(255,255,255,0.78)',backdropFilter:'blur(2px)'}} role='status' aria-label='Loading'>
      <style>{`@keyframes bmc-spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{width:54,height:54,border:'5px solid #e6f1ef',borderTopColor:'#0d4a42',borderRadius:'50%',animation:'bmc-spin 0.8s linear infinite'}}/>
    </div>
  )
}

export default Loader
