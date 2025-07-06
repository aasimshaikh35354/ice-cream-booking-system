import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faShoppingBasket,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="box-container">
        <div className="box">
          <FontAwesomeIcon icon={['fas', 'faUser']} />
          <h3>
            Nic Ice Cream
            <i>
              <FontAwesomeIcon icon={faShoppingBasket} />
            </i>
          </h3>
          <p>
            This is an E-Commerce website that will help users to buy Ice Creams
            online
          </p>
          <div className="share">
            <a href="/">
              <i>
                <FontAwesomeIcon className="fa-icon" icon={faFacebookF} />
              </i>
            </a>
            <a href="/">
              <i>
                <FontAwesomeIcon className="fa-icon" icon={faTwitter} />
              </i>
            </a>
            <a href="/">
              <i>
                <FontAwesomeIcon className="fa-icon" icon={faInstagram} />
              </i>
            </a>
            <a href="/">
              <i>
                <FontAwesomeIcon className="fa-icon" icon={faLinkedin} />
              </i>
            </a>
          </div>
        </div>
        <div className="box">
          <h3>contact info</h3>
          <a href="/" className="links">
            <i>
              <FontAwesomeIcon icon={faPhone} />
            </i>
            +91 99887 57894
          </a>
          <a href="/" className="links">
            <i>
              <FontAwesomeIcon icon={faPhone} />
            </i>
            +91 99887 57894
          </a>
          <a href="/" className="links" id="emailLink">
            <i>
              <FontAwesomeIcon icon={faEnvelope} />
            </i>
            sagarkhatri@email.com
          </a>
          <a href="/" className="links">
            <i>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </i>
            Ahmedabad, India
          </a>
        </div>
        <div className="box">
          <h3>quick info</h3>
          <a href="/user-home" className="links">
            <i>
              <FontAwesomeIcon icon={faArrowRight} />
            </i>
            home
          </a>
          <a href="/user-home/product" className="links">
            <i>
              <FontAwesomeIcon icon={faArrowRight} />
            </i>
            products
          </a>
          <a href="/user-home/categories" className="links">
            <i>
              <FontAwesomeIcon icon={faArrowRight} />
            </i>
            categories
          </a>
          <a href="/user-home/review" className="links">
            <i>
              <FontAwesomeIcon icon={faArrowRight} />
            </i>
            reviews
          </a>
          <a href="/user-home/blogs" className="links">
            <i>
              <FontAwesomeIcon icon={faArrowRight} />
            </i>
            blogs
          </a>
        </div>
      </div>
      <div className="credits">
        <p>All Rights Reserved</p>
      </div>
    </footer>
  );
}
