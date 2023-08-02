import React from 'react';

const Banner = ({ className, title, description, img }) => {
  return (
    <div className={`banner ${className}`}>
      <div className="banner-bg" style={{ backgroundImage: `url(${img})` }}>
        <h2 className="banner-title">{title}</h2>
        <p className="banner-description">{description}</p>
      </div>
    </div>
  )
}

export default Banner;