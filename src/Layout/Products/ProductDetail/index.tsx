import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Input, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { cartApi, productApi, reviewApi } from "../../../api/api";
import { QUERY_KEY } from "../../../api/apiConfig";
import { ProductImageGallery } from "../../../Components/ProductImage";
import ToastError from "../../../Components/Toast/ToastError";
import ToastSuccess from "../../../Components/Toast/ToastSuccess";
import { FooterWeb } from "../../FooterWeb";
import Navbar from "../../HeaderWeb";
import { ListProduct } from "../../TrangChu/ListProducts";
import "./style.scss";
export interface ICreateCart {
  UserID: number;
  CartItems: { ProductID: string | undefined; Quantity: number }[];
}

interface ReviewPayload {
  ProductID: string | undefined;
  UserID: number;
  Rating: number;
  Comment: string;
}

export const ProductDetail = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [form] = useForm();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>(
    undefined
  );
  const { data: productDetailData } = useQuery({
    queryKey: [QUERY_KEY.GET_PRODUCTS, id],
    queryFn: () => productApi.getProductById(id as string),
  });

  const { data: reviewData, refetch } = useQuery({
    queryKey: [QUERY_KEY.GET_REVIEW],
    queryFn: () => reviewApi.getAllReviewByProductId(id as string),
  });

  const createCart = useMutation({
    mutationFn: (payload: ICreateCart) => cartApi.addCartItem(payload),
  });

  const handleCreateCart = () => {
    const payload = {
      UserID: 3,
      CartItems: [{ ProductID: id, Quantity: 1 }],
    };
    createCart.mutate(payload);
  };

  const renderStars = (rating: number) => {
    const stars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return stars;
  };
  const addReviews = useMutation({
    mutationFn: (payload: ReviewPayload) => reviewApi.createReview(payload),
    onSuccess: () => {
      refetch();
      form.resetFields();
      setRating(0);
      ToastSuccess({
        content: "Bình luận thành công",
      });
    },
    onError: () => {
      ToastError({
        content: "Bình luận th��t bại",
      });
    },
  });
  const handleAddReview = () => {
    const payload = {
      ProductID: id,
      UserID: 3,
      Rating: rating,
      Comment: form.getFieldValue("reviews"),
    };
    addReviews.mutate(payload);
  };
  const handleColorChange = (colorId: number) => {
    const productImageUrl = productDetailData?.productById?.productImage?.find(
      (image) => image.ColorID === colorId
    )?.ImageURL;
    setSelectedImageUrl(productImageUrl);
  };
  return (
    <>
      <Navbar />
      <div className="product-detail">
        <div className="product-detail_headerContent">
          <h1>Chi tiết sản phẩm</h1>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <ProductImageGallery
                images={productDetailData?.productById?.productImage}
                selectedImage={selectedImageUrl}
                setSelectedImage={setSelectedImageUrl}
              />
            </Col>
            <Col span={12}>
              <div className="product-detail_headerContent-name">
                <span>Tên sản phẩm: </span>
                {productDetailData?.productById?.productInfo?.ProductName}
              </div>
              <div className="product-detail_headerContent-description">
                <span>Chi tiết sản phẩm: </span>
                {productDetailData?.productById?.productInfo?.Description}
              </div>
              <p className="product-detail_headerContent-price">
                <span>Giá: </span>
                {productDetailData?.productById?.productInfo?.Price}
              </p>
              <p className="product-detail_headerContent-stock">
                <span>Đã mua: </span>
                {productDetailData?.productById?.productInfo?.Stock}
              </p>
              <div className="product-colors">
                {productDetailData?.productById?.productInfo?.productColors?.map(
                  (color) => (
                    <span
                      key={color.ColorID}
                      style={{
                        backgroundColor: color.color.ColorName,
                        padding: "5px",
                        margin: "2px",
                        border: "1px solid black",
                        cursor: "pointer",
                      }}
                      onClick={() => handleColorChange(color.ColorID)}
                    />
                  )
                )}
              </div>
              <Button type="primary" className="buy-now-button">
                Mua Ngay
              </Button>
              <Button
                onClick={() => handleCreateCart()}
                type="default"
                className="add-to-cart-button"
              >
                Thêm Vào Giỏ Hàng
              </Button>
            </Col>
          </Row>
        </div>
        <div className="product-detail_middleContent">
          <h1>Bình Luận</h1>
          <div className="underline" />
          {reviewData?.ReviewList?.length > 0 ? (
            reviewData.ReviewList.map((review) => (
              <div key={review.ReviewID} className="review-item">
                <h2>{review.user.FullName}</h2>
                <p>Rating: {renderStars(review.Rating)}</p>
                <p>{review.Comment}</p>
                <p>{new Date(review.CreatedAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>Không có bình luận</p>
          )}
          <div className="product-detail_middleContent-add-review">
            <Form form={form}>
              <Form.Item name={"reviews"}>
                <Input.TextArea
                  rows={4}
                  placeholder="Thêm bình luận của bạn..."
                  className="review-textarea"
                />
              </Form.Item>
              <div className="rating-container">
                <p>Đánh giá: </p>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(rating === star ? 0 : star)}
                    className={rating >= star ? "star filled" : "star unfilled"}
                  >
                    ★
                  </span>
                ))}
              </div>
              <Button
                type="primary"
                onClick={handleAddReview}
                className="submit-review-button"
              >
                Gửi Bình Luận
              </Button>
            </Form>
          </div>
        </div>
        <div className="product-detail_bottomContent">
          <h1>Các sản phẩm tiêu biểu khác</h1>
          <ListProduct itemPerPage={8} />
        </div>
      </div>
      <FooterWeb />
    </>
  );
};
