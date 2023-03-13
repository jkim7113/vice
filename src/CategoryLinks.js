import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CategoryLinks = () => {
  const location = useLocation();
  const category = location.pathname?.split('/')[2];
  const categories = ['All', 'New In', 'T-shirts', 'Sweatshirts', 'Bottoms', 'Brand'];
  const categoryLinks = ['all', 'new-in', 't-shirts', 'sweatshirts', 'bottoms', 'brand'];
  const capitalize = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  return (
    <>
      {
        categoryLinks.map((item, index) => {
          if(item == "brand" && category == "brand"){
            return <Link key={index} className="nav-category-links current-category" to={"/pages/" + item}>{categories[index]}</Link>
          }
          if(item == "brand"){
            return <Link key={index} className="nav-category-links" to={"/pages/" + item}>{categories[index]}</Link>
          } 
          if (item == category){
            return <Link key={index} className="nav-category-links current-category" to={"/categories/" + item}>{categories[index]}</Link>
          }
          return <Link key={index} className="nav-category-links" to={"/categories/" + item}>{categories[index]}</Link>  
        }) 
      }
    </>
  )
}

export default CategoryLinks