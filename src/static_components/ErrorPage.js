import React from 'react';
import "./static_components.css";
import setTitle from '../utilities/setTitle';

const ErrorPage = ({ type }) => {
  setTitle(type);
  return (
    <div id="error-container">
      <h2>Sorry for the inconvenience.</h2>
      <p>We couldn't find the page you requested. It might have been removed from the server or is temporarily unavailable at this time.</p>
      <p>Error Code: {type}</p>
    </div>
  )
}

export default ErrorPage