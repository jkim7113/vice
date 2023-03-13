import React from 'react'

const Like = ({ itemId }) => {
  return (
    <img key={itemId} className="like-btns" src="/icons/heart-gray.svg" />
  )
}

export default Like