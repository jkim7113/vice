import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { itemSlice } from './store';
import ItemImageSlider from './ItemImageSlider';
import ErrorPage from "./static_components/ErrorPage";
import setTitle from './utilities/setTitle';

const Item = () => {
  const { id } = useParams();
  const data = useSelector(state => {
    return state.item.data;
  });
  const dispatch = useDispatch();
  const [ error, setError ] = useState(null);
  setTitle(data?.name);

  useEffect(() => {
    fetch(`/api/items/${id}`)
    .then(res => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then(json => dispatch(itemSlice.actions.update(json)))
    .catch((error) => setError(error.message));
    window.scrollTo(0,0);

    return () => dispatch(itemSlice.actions.empty());
  }, [id]);

  return (
    <>
    {  
        error ? <ErrorPage type={error} /> :
        <div id="item-container">
          <ItemImageSlider images={data?.image} />
          <div id="item-info">
              <div id="item-info-container">
                  <h2>{data?.name}</h2>
                  <p id="item-price">{"$" + (data?.price / 100).toFixed(2)}</p>
                  <p>{data?.description}</p>
                  <p id="item-info-detail-link"><Link>Size Details</Link></p>
                  <div id="item-clothing-size-container">
                    {
                      data?.size?.split(', ')?.map((size, index) => {
                          return <div className="item-clothing-size-btns" key={index}>{size}</div>
                        }
                      )
                    }
                  </div>
                  <div id="item-addtocart-container">
                    <button id="item-addtocart">Add to Cart</button>
                    <button id="item-like"><img src="/icons/heart-gray.svg" width="24px"/></button>
                  </div>
              </div>
          </div>
          {/* <div id="item-clothing-size-description">
            {
              data?.size_description?.split(', ')?.map((description, index) => {
                return <p key={index}>- {description}</p>
              })
            }
          </div> */}
          <div id="item-suggested-container">
              <div id="item-suggested-title-container">
                <h3>You May Also Like...</h3>
              </div>
          </div>
        </div>
    }
    </>
  )
}

export default Item