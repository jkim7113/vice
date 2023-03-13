import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FooterLinks from './FooterLinks';

const Footer = () => {
  const currentLocation = useLocation();
  return (
    <footer>
        <div id="footer-container">
            <span id="footer-content-left">
              <Link className="footer-links" to="/newsletter-modal" state={{ background: currentLocation }}>Subscribe</Link>
              <a className="footer-links" href="https://www.instagram.com/jkim7113/" target="_blank">
                <img src="/icons/instagram.svg" width="16" style={{ marginBottom : -3 }} />
              </a>
            </span>
            <span id="footer-content-center">
              <p>© 2023 VICE™. All rights reserved.</p>
            </span>
            <span id="footer-content-right">
              <FooterLinks />
            </span>
        </div>
    </footer>
  )
}

export default Footer