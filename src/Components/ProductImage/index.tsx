import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Image } from "antd/lib";
import React, { useState } from "react";
import "./style.scss";

interface ProductImageGalleryProps {
  images: {
    ImageID: number;
    ImageURL: string;
    CreatedAt: string;
  }[];
  selectedImage?: string;
  setSelectedImage: (selectedImage: string) => void;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  selectedImage,
  setSelectedImage,
}) => {
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
