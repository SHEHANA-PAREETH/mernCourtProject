import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className='site-footer'>
      <div className='home-wrap'>
        <div className='footer-grid'>
          <div className='footer-brand'>
            <strong>bookmycourt</strong>
            <p>Court booking in your hand. Find, book and play, anytime.</p>
            <div className='footer-social'>
              <a href='#facebook' aria-label='Facebook'><FontAwesomeIcon icon={faFacebookF}/></a>
              <a href='#twitter' aria-label='Twitter'><FontAwesomeIcon icon={faTwitter}/></a>
              <a href='#instagram' aria-label='Instagram'><FontAwesomeIcon icon={faInstagram}/></a>
              <a href='#linkedin' aria-label='LinkedIn'><FontAwesomeIcon icon={faLinkedinIn}/></a>
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href='#about'>About us</a></li>
              <li><a href='#blog'>Blog</a></li>
              <li><a href='#contact'>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><a href='/userallcourts'>Browse courts</a></li>
              <li><a href='/registercourt'>List your court</a></li>
              <li><a href='#developers'>Developers</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href='#terms'>Terms of use</a></li>
              <li><a href='#privacy'>Privacy policy</a></li>
            </ul>
          </div>
        </div>
        <div className='footer-bottom'>© {new Date().getFullYear()} bookmycourt. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer
