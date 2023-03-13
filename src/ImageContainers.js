import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ImageContainers = ({ itemImage, itemId }) => {
  const imgDirLength = itemImage.split(', ').length;
  const [ index, setIndex ] = useState(0);
  const imageRef = useRef("");

  const moveToNextSlide = () => {
    if (index >= imgDirLength - 1) return setIndex(0);
    setIndex(index + 1);
  }

  const moveToPreviousSlide = () => {
    if (index <= 0) return setIndex(imgDirLength - 1);
    setIndex(index - 1);
  }

  useEffect(() => {
    imageRef.current.style.transform = `translateX(-${index * 100}%)`;
  }, [index]);
  
  return (
    <>
    <img className="item-slider-btns item-slider-btns-left" src="/icons/arrow-left.svg" onClick={moveToPreviousSlide} />
    <img className="item-slider-btns item-slider-btns-right" src="/icons/arrow-right.svg" onClick={moveToNextSlide} />
    <Link to={`/items/${itemId}`}>
    <div className='item-image-containers' ref={imageRef}>
        {
            itemImage.split(', ').map((imgDir, i) => {
                return <img className='item-images' key={imgDir + i} src={imgDir} />
            })
        }
    </div>
    </Link>
    </>
  )
}

export default ImageContainers