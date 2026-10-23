import React from 'react'
import { imageUrl } from '../config/imageUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faArrowRight, faImage } from '@fortawesome/free-solid-svg-icons'

function CourtCard({court, ctaLabel, onOpen}) {
  const images=court.image || []
  const cover=images[0]?.filename

  return (
    <div className='court-card' role='button' tabIndex={0} onClick={onOpen} onKeyDown={(e)=>e.key==='Enter' && onOpen()}>
      <div className='court-img'>
        {cover
          ? <img src={imageUrl(cover)} alt={court.name} loading='lazy'/>
          : <div className='placeholder'><FontAwesomeIcon icon={faImage}/></div>}
        {images.length>1 && <span className='photos'>{images.length} photos</span>}
      </div>
      <div className='court-body'>
        <span className='court-loc'><FontAwesomeIcon icon={faLocationDot}/> {court.location}</span>
        <h3>{court.name}</h3>
        <p>{court.description}</p>
        <div className='court-cta'>
          {ctaLabel}
          <FontAwesomeIcon icon={faArrowRight}/>
        </div>
      </div>
    </div>
  )
}

export default CourtCard
