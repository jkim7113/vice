import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Brand from './static_components/Brand';
import Contact from './static_components/Contact';
import ErrorPage from './static_components/ErrorPage';

const Pages = () => {
  const { page } = useParams();
  useEffect(() => {
    window.scrollTo(0,0);
  }, [page]);

  return (
    <>
      {
        page == "brand" ? <Brand /> : 
        page == "contact" ? <Contact /> :
        <ErrorPage type={404}/>
      }
    </>
  )
}

export default Pages