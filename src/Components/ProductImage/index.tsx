import { Button } from "antd";
import { Image } from "antd/lib";
import React, { useState } from "react";
import "./style.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface ProductImageGalleryProps {
  images: {
    ImageID: number;
    ImageURL: string;
    CreatedAt: string;
  }[];
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState(
    images && images.length > 0
      ? images[0].ImageURL
      : "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/6/_/6_130.jpg"
  );
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="product-image">
      <div className="isOpen">
        <Image src={selectedImage} alt="" className="isOpen_image" />
      </div>
      <div className="list-image">
        <div className="image-list">
          {images?.length > 5 && (
            <div className="image-list-actions">
              <Button
                icon={<LeftOutlined />}
                onClick={() => {
                  const newIndex = imageIndex - 4;
                  setImageIndex(newIndex >= 0 ? newIndex : 0);
                }}
              />
              {images?.slice(imageIndex, imageIndex + 4).map((image, index) => (
                <Image
                  src={image.ImageURL}
                  preview={false}
                  alt={`Image ${index + 1}`}
                  key={image.ImageID}
                  onClick={() => setSelectedImage(image.ImageURL)}
                />
              ))}
              <Button
                icon={<RightOutlined />}
                onClick={() => {
                  const newIndex = imageIndex + 4;
                  setImageIndex(
                    newIndex < images.length ? newIndex : imageIndex
                  );
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
