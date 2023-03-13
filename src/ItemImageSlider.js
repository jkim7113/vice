import React, { useState, useEffect, useRef } from 'react';
import useSwipe from './hooks/useSwipe';

const ItemImageSlider = ({ images }) => {
  const [ index, setIndex ] = useState(0);
  const imageRef = useRef("");
  const sliderRef = useRef("");
  const { enableSwipe, disableSwipe } = useSwipe({
    wrapper: document.getElementById("item-image-wrapper"),
    index: index,
    setIndex: setIndex,
    maxIndex: (images?.split(', ')?.length - 1),
  });

  useEffect(() => {
    if (!sliderRef.current) return; //in case there is only one image available
    imageRef.current?.style?.setProperty("transform", `translateX(-${index * 100}%)`, "important");
    for (const child of sliderRef.current?.children){
      child?.classList.remove("item-image-slider-selected");
    }
    sliderRef.current?.children[index]?.classList.add("item-image-slider-selected");

    const handler = () => { //if the user resizes the window, set index to 0 (img container overflow prevention). 
      if (window.innerWidth > 768){
        return setIndex(0);
      } 
      enableSwipe();
    }
    handler();
    window.addEventListener("resize", handler);
    return () => {
      disableSwipe();
      window.removeEventListener("resize", handler);
    }
  }, [index, images]);

  const fetch720 = (imgDir) => {
    return `${imgDir.split('.')[0]}-720.${imgDir.split('.')[1]}`;
  }

  return (
    <>
        <div id="item-image-wrapper">
            <div id="item-image-container" ref={imageRef} >
                {
                    images?.split(', ')?.map((imgDir, index) => {
                        return <img key={index} srcSet={`${imgDir} 540w, ${fetch720(imgDir)} 720w`} />
                    })
                }
            </div>
        </div>
        { images?.split(', ')?.length <= 1 ? <></> :
          <div id="item-image-slider-mobile" ref={sliderRef}>
            { 
              images?.split(', ')?.map((imgDir, index) => {
                return <button key={index} onClick={() => setIndex(index)} className={`item-image-slider-btns ${index == 0 ? "item-image-slider-selected" : ""}`} ></button>
              })
            }
          </div>
        }
    </>
  )
}

export default ItemImageSlider