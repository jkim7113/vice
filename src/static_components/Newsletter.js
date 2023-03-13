import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import './newsletter.css';

const Newsletter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    }
  });

  return (
    <div id="modal-newsletter-bg" onClick={() => navigate(-1)}>
      <div id="modal-newsletter" onClick={(e) => e.stopPropagation()}>
        <div id="modal-newsletter-header">
          <h3 id="modal-newsletter-title">NEWSLETTER</h3>
          <img src="/icons/close.svg" onClick={() => navigate(-1)} width="16px"/>
        </div>
        <div id="modal-newsletter-body">
          <p>Sign up to our newsletter to stay in contact with us. You can unsubscribe at any time.</p>
          <input type='text' placeholder='Email Address'></input>
          <button>SUBSCRIBE</button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter