import React, { useState, useEffect, useRef } from 'react';
import setTitle from "../utilities/setTitle";
import "./brand.css";

const Brand = () => {
  setTitle("About Us | VICE™ Official Website");

  const imageDirList = ["/icons/vice.svg", "/icons/vice.png"];
  const [ index, setIndex ] = useState(0);
  const ref = useRef();

  const changeIndex = () => {
    if (index < 1) return setIndex(index + 1);
    setIndex(0);
  } 

  useEffect(() => {
    ref.current.src = imageDirList[index];
  }, [index]);

  return (
    <div id="brand-container">
      <div id="brand-header">
        <h3 id="all-about">All About...</h3>
        <img ref={ref} onClick={changeIndex} id="brand-vice-img" src="/icons/vice.svg"/>
      </div>
      <div className="brand-text-center">
        <div className="brand-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    </div>
  )
}

export default Brand