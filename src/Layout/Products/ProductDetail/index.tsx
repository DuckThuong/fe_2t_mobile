import { useMutation, useQuery } from "@tanstack/react-query";
import { Col, Row, Button } from "antd";
import { QUERY_KEY } from "../../../configs/apiConfig";
import { cartApi, productApi, reviewApi } from "../../../api/api";
import { useParams } from "react-router-dom";
import Navbar from "../../HeaderWeb";
import { FooterWeb } from "../../FooterWeb";
import { ListProduct } from "../../TrangChu/ListProducts";
export interface ICreateCart {
  UserID: number;
  ProductID: string;
  Quantity: number;
}
export const ProductDetail = () => {
  const { id } = useParams();

  const { data: productDetailData } = useQuery({
    queryKey: [QUERY_KEY.GET_PRODUCTS, id],
    queryFn: () => productApi.getProductById(id as string),
  });

  const { data: reviewData } = useQuery({
    queryKey: [QUERY_KEY.GET_REVIEW],
    queryFn: () => reviewApi.getAllReviewByProductId(id as string),
  });
  const createCart = useMutation({
    mutationFn: (payload: ICreateCart) => cartApi.addCartItem(payload),
  });
  const handleCreateCart = (userId: number, quantity: number) => {
    const payload = {
      UserID: userId,
      ProductID: id as string,
      Quantity: quantity,
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

  return (
    <>
      <Navbar />
      <div className="product-detail">
        <div className="product-detail_headerContent">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="product-detail_headerContent-image">
                <p>Hình ảnh sản phẩm</p>
                <img
                  src={productDetailData?.productById?.ImageURL}
                  alt={productDetailData?.productById?.Name}
                  className="product-detail_headerContent-image"
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="product-detail_headerContent-name">
                <span>Tên sản phẩm: </span>
                {productDetailData?.productById?.Name}
              </div>
              <div className="product-detail_headerContent-description">
                <span>Chi tiết sản phẩm: </span>
                {productDetailData?.productById?.Description}
              </div>
              <p className="product-detail_headerContent-price">
                <span>Giá: </span>
                {productDetailData?.productById?.Price}
              </p>
              <p className="product-detail_headerContent-stock">
                <span>Đã mua: </span>
                {productDetailData?.productById?.Stock}
              </p>
              <Button type="primary" className="buy-now-button">
                Mua Ngay
              </Button>
              <Button
                onClick={() => handleCreateCart(3, 1)}
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
          {reviewData?.reviews?.length > 0 ? (
            reviewData.reviews.map((review) => (
              <div key={review.ReviewID} className="review-item">
                <h2>{review.User.FullName}</h2>
                <p>Rating: {renderStars(review.Rating)}</p>
                <p>{review.Comment}</p>
                <p>{new Date(review.CreatedAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>Không có bình luận</p>
          )}
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
