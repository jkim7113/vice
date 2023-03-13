import React, { useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import setTitle from './utilities/setTitle';

const Login = () => {
  setTitle("Sign In | VICE™ Official Website");

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    }
  });
  return (
    <div id="modal-login-bg" onClick={() => navigate(-1)}>
      <div id="modal-login" onClick={(e) => e.stopPropagation()}>
        <div id="modal-login-header">
          <h3>Sign In</h3>
          <img src="/icons/close.svg" onClick={() => navigate(-1)} width="20px"/>
        </div>
        <div id="modal-login-body">
          <label htmlFor="email">Email Address</label>
          <input id="email" spellCheck='false' autoComplete="off" type="text" name="email"></input>
          <label htmlFor="password">Password</label>
          <input id="password" spellCheck='false' autoComplete="off" type="text" name="password"></input>
          <div id="modal-login-body-footer">
            <span id="modal-login-body-checkbox-container">
              <input type="checkbox" id="modal-login-checkbox" />
              <label id="modal-login-checkbox-label" htmlFor="modal-login-checkbox">Remember Me</label>
            </span>
            <Link id="modal-login-forgotpw" to="/">I forgot my password</Link>
          </div>
          <button id="modal-login-btn" type="button">Sign In</button>
          {/* <Link id="modal-login-signup-btn" to="/signup">Create account</Link> */}
        </div>
      </div>
    </div>
  )
}

export default Login