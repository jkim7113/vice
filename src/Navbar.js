import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import CategoryLinks from './CategoryLinks';

const Navbar = () => {
  const currentLocation = useLocation();
  return (
    <>
    <nav>
        <div id='nav-container'>
            <div id='nav-content-left'>
                <Link to="/"><img src='/icons/vice.jpg' width='100%' /></Link>
            </div>
            <div id='nav-content-center'>
                <span id='nav-category'>
                    <CategoryLinks />
                </span>
            </div>
            <div id='nav-content-right'>
                <Link><img id='search-icon' src='/icons/search.png' /></Link>
                <Link to="/login" state={{ background: currentLocation }}><img id='login-icon' src='/icons/ricardo.png' height='100%'/></Link>
            </div>
        </div>
    </nav>
    <span id='nav-category-mobile'>
        <CategoryLinks />
    </span>
    </>
  )
}

export default Navbar