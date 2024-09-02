import { HeartFilled, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import Rating from './Rating';

function Carousel({ data, onActiveChange }) {
  const [slides, setSlides] = useState(
    [data[data.length - 1]].concat(data.slice(0, data.length - 1)).map((item, index) => ({
      id: item.id,
      link: item.link,
      name: item.name,
      order: index
    }))
  );

  const next = () => {
    const newSlides = slides.map((slide) => ({
      ...slide,
      order: slide.order - 1 < 0 ? slides.length - 1 : slide.order - 1
    }));

    const activeSlide = newSlides.find((slide) => slide.order === 1);
    onActiveChange(data.findIndex((item) => item.id === activeSlide.id));
    setSlides(newSlides);
  };

  const previous = () => {
    setSlides((prev) =>
      prev.map((slide) => ({
        ...slide,
        order: slide.order + 1 > slides.length - 1 ? 0 : slide.order + 1
      }))
    );
  };

  return (
    <div className="carousel">
      {slides.map((img, index) => (
        <div
          key={img.id}
          className={`carousel-item ${img.order === 1 ? 'active' : ''}`}
          style={{ left: ((img.order - 1) * 100) / 3 + '%', opacity: [1, 2, 3].includes(img.order) ? 1 : 0, zIndex: slides.length - img.order }}>
          <div className="info">
            <h3>{img.name}</h3>
            <Rating rate={5} />
          </div>
          <div className="image">
            <Button className={`heart-icon ${index < 2 ? 'active' : ''}`} shape="circle" icon={<HeartFilled />} />
            <img src={img.link} />
          </div>
        </div>
      ))}

      <div className="controller">
        <Button className="ctl-btn" shape="circle" icon={<LeftOutlined />} onClick={previous} />
        <Button className="ctl-btn " shape="circle" icon={<RightOutlined />} onClick={next} />
      </div>
    </div>
  );
}

export default Carousel;
