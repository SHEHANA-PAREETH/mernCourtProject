import React from 'react'

const steps=[
  { title:'Find a court', text:'Search courts by sport and location, and compare what each venue offers.' },
  { title:'Pick your slot', text:'Choose a date and time from the live calendar and confirm the details.' },
  { title:'Pay and play', text:'Pay securely online, get your confirmation and just turn up and play.' },
]

function Homesection3() {
  return (
    <section className='home-section'>
      <div className='home-wrap home-head'>
        <span className='home-eyebrow'>How it works</span>
        <h2 className='home-title'>Booked in three simple steps</h2>
        <p className='home-lead'>From searching to playing in under a minute.</p>
        <div className='steps'>
          {steps.map((step,index)=>(
            <div className='step' key={step.title}>
              <div className='num'>{index+1}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Homesection3
