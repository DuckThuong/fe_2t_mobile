import React from "react";
import Slider from "react-slick";
import { Card, Image } from "antd";

interface Props {
  image: string[];
}
const ImageCarousel: React.FC<Props> = ({ image }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Card title="Thẻ ảnh cuộn tự động">
      <Slider {...settings}>
        {image.map((src, index) => (
          <div key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </div>
        ))}
      </Slider>
    </Card>
  );
};

export default ImageCarousel;
