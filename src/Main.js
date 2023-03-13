import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categorySlice } from './store'
import Like from './static_components/Like';
import ImageContainer from './ImageContainers';
import setTitle from './utilities/setTitle';

const Main = () => {
  setTitle("VICE™ Official Website");

  const data = useSelector(state => {
    return state.category.data;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/categories/all').then(data => data.json())
    .then(json => dispatch(categorySlice.actions.update(json)));
    window.scrollTo(0,0);
  }, []);

  return (
    <div className='item-containers'>{
        data?.map(item => {
          return (
            <div key={item.id} className='item-boxes'>
              <div className='item-image-wrappers'>
                { item.image?.split(', ')?.length > 1 ? 
                  <ImageContainer itemImage={item.image} /> : 
                  <div className='item-image-containers'>
                    <img className='item-images' src={item.image} />
                  </div>
                }
                <Like itemId={item.id} />
              </div>
              <h4 className='item-names'>{item.name}</h4>
              <p className='item-prices'>{"$" + (item.price / 100).toFixed(2)}</p>
            </div>
          );
        })
    }</div>
  )
}

export default Main