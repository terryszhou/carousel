import React, { useEffect, useRef, useState } from 'react';

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export const VanillaCarousel = ({ images }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [img, setImg] = useState();
  const carouselRef = useRef([]);

  useEffect(() => {
    if (images && images[0]) {
      carouselRef.current = carouselRef.current.slice(0, images.length);
      setImgIdx(0);
      setImg(images[0]);
    };
  }, [images]);

  const handleImgChange = (newIdx) => {
    if (images && images.length > 0) {
      setImg(images[newIdx]);
      setImgIdx(newIdx);
      if (carouselRef?.current[newIdx]) {
        carouselRef?.current[newIdx]?.scrollIntoView({
          inline: "center",
          behavior: "smooth",
        });
      };
    };
  };

  const clickRight = () => {
    if (images && images.length > 0) {
      let newIdx = imgIdx + 1;
      if (newIdx >= images.length) {
        newIdx = 0
      };
      handleImgChange(newIdx);
    };
  };

  const clickLeft = () => {
    if (images && images.length > 0) {
      let newIdx = imgIdx - 1;
      if (newIdx < 0) {
        newIdx = images.length - 1;
      };
      handleImgChange(newIdx);
    };
  };

  return (
    <div className="carousel-container">
      <h2 className="header">Image Carousel</h2>
      <div className="selected-image" style={{ backgroundImage: `url(${img?.url})` }}>
        <button className="selected-button-outer" onClick={clickLeft}>
          <div className="selected-button-inner selected-button-left">
            <FaArrowLeft />
          </div>
        </button>
        <button className="selected-button-outer" onClick={clickRight}>
          <div className="selected-button-inner selected-button-right">
            <FaArrowRight />
          </div>
        </button>
      </div>
      <div className="carousel">
        <button className="carousel__button carousel__button-left" onClick={clickLeft}>
          <FaArrowLeft />
        </button>
        <div className="carousel__images">
          {images &&
            images.map((image, idx) => (
              <div
                className={`carousel__image ${imgIdx === idx && "carousel__image-selected"}`}
                onClick={() => handleImgChange(idx)}
                key={image.id}
                ref={(e) => carouselRef.current[idx] = e}
                style={{ backgroundImage: `url(${image.url})` }} />
            ))
          }
        </div>
        <button className="carousel__button carousel__button-right" onClick={clickRight}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};