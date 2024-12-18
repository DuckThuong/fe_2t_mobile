import { Carousel, Image } from "antd";
import React from "react";

interface Props {
  image?: string[];
}
const ImageCarousel: React.FC<Props> = ({ image }) => (
  <Carousel className="image-carousel" autoplay>
    {image?.map((img, index) => (
      <Image
        className="image-carousel_item"
        key={index}
        src={img}
        style={{ objectFit: "cover", width: "100%", height: "auto" }}
      />
    ))}
  </Carousel>
);

export default ImageCarousel;
