import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { categorySlice } from './store';
import Like from './static_components/Like';
import ImageContainer from './ImageContainers';
import setTitle from './utilities/setTitle';

const Category = () => {
  setTitle("VICE™ Official Website");
  const { category } = useParams();
  const data = useSelector(state => {
    return state.category.data;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/api/categories/${category}`).then(data => data.json())
    .then(json => dispatch(categorySlice.actions.update(json)));
    window.scrollTo(0,0);
  }, [category]);

  return (
    <div className='item-containers'>
      {
        data?.map(item => {
          return (
            <div key={item.id} className='item-boxes'>
              <div className='item-image-wrappers'>
                { item.image?.split(', ')?.length > 1 ? 
                  <ImageContainer itemImage={item.image} itemId={item.id} /> : 
                  <Link to={`/items/${item.id}`}>
                    <div className='item-image-containers'>
                      <img className='item-images' src={item.image} />
                    </div>
                  </Link>
                 }
                <Like itemId={item.id} />
              </div>
              <Link to={`/items/${item.id}`} className="item-names">{item.name}</Link>
              <p className='item-prices'>{"$" + (item.price / 100).toFixed(2)}</p>
            </div>
          );
        })
      }
    </div>
  )
}

export default Category