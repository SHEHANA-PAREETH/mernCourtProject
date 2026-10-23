import React from "react";

const reviews=[
  { name:'Arjun Menon', role:'Weekend footballer', text:'I used to spend half an hour calling around for a turf. Now I book our Saturday game in under a minute.' },
  { name:'Priya Nair', role:'Badminton league organiser', text:'Live availability means no more double bookings. Our whole league schedules through bookmycourt.' },
  { name:'Rahul Verma', role:'Court owner', text:'Listing my courts was easy, and the bookings dashboard shows me exactly how busy each slot is.' },
]

export default function Testimonials()
{
  return (
    <section className="home-section alt">
      <div className="home-wrap home-head">
        <span className="home-eyebrow">Testimonials</span>
        <h2 className="home-title">Loved by players and venues</h2>
        <p className="home-lead">Here is what people say about booking with us.</p>
        <div className="review-grid" style={{textAlign:'left'}}>
          {reviews.map((review)=>(
            <div className="review" key={review.name}>
              <div className="stars">★★★★★</div>
              <p>“{review.text}”</p>
              <div className="review-user">
                <span className="avatar">{review.name.charAt(0)}</span>
                <div>
                  <strong>{review.name}</strong>
                  <small>{review.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
