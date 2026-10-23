import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faBasketball, faBaseballBatBall, faTableTennisPaddleBall, faVolleyball, faPersonRunning } from '@fortawesome/free-solid-svg-icons'

const sports=[
  { name:'Football', icon:faFutbol },
  { name:'Basketball', icon:faBasketball },
  { name:'Cricket', icon:faBaseballBatBall },
  { name:'Tennis', icon:faTableTennisPaddleBall },
  { name:'Volleyball', icon:faVolleyball },
  { name:'Athletics', icon:faPersonRunning },
]

function Sports() {
  const { user }=useSelector((state)=>state.user)
  const target=user.role===2 ? '/mycourts' : '/userallcourts'

  return (
    <section className='home-section'>
      <div className='home-wrap home-head'>
        <span className='home-eyebrow'>Pick your sport</span>
        <h2 className='home-title'>Whatever you play, we have a court</h2>
        <p className='home-lead'>Browse courts by sport and book the slot that suits you.</p>
        <div className='sports-grid'>
          {sports.map((sport)=>(
            <Link to={target} className='sport-tile' key={sport.name}>
              <span className='icon'><FontAwesomeIcon icon={sport.icon}/></span>
              {sport.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sports
