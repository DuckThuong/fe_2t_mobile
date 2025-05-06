import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./style.scss";
import Navbar from "../../HeaderWeb";
import { FooterWeb } from "../../FooterWeb";
import { ListProduct } from "../../TrangChu/ListProducts";
import { useNavigate, useParams } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../../Routers/Routers";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "../../../api/api";
import { cartApi } from "../../../api/api"; // Import cartApi

interface Capacity {
  id: number;
  value: number;
  unit: string;
  display_name: string;
  price: {
    id: number;
    price: string;
    discount_price: string;
  };
}

interface Color {
  id: number;
  name: string;
  color_code: string;
}

interface Image {
  id: number;
  imageUrl: string;
  isThumbnail: boolean;
  sortOrder: number;
}

interface ProductDetailItem {
  id: number;
  stock_quantity: number;
  serial_number: string;
  import_price: string;
  selling_price: string;
  color_id: number;
  color: Color;
  capacity: Capacity;
}

interface Provider {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ProductDetail {
  id: number;
  name: string;
  model: string;
  description: string;
  warranty_period: number;
  release_year: number;
  is_featured: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  vendor: Provider;
  productDetails: ProductDetailItem[];
  images: Image[];
  specs: {
    id: number;
    screen_size: string;
    resolution: string;
    chipset: string;
    ram: string;
    os: string;
    battery_capacity: string;
    charging_tech: string;
  }[];
  productColor: Color[];
}

type ApiResponse = ProductDetail;

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["productDetail", productId],
    queryFn: async () => {
      const response = await productApi.getProductById(productId.toString());
      console.log("Product Detail Response:", response);
      return response;
    },
  });

  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [selectedCapacityId, setSelectedCapacityId] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showNavButtons, setShowNavButtons] = useState(false);

  // Khởi tạo selectedColorId và selectedCapacityId khi product thay đổi
  useEffect(() => {
  if (product && product.productDetails.length > 0) {
    const firstDetail = product.productDetails[0];
    // Khởi tạo với giá trị mặc định an toàn
    const defaultColorId = product.productColor[0]?.id || (firstDetail.color?.id || 0);
    const defaultCapacityId = firstDetail.capacity?.id || null;
    setSelectedColorId(defaultColorId);
    setSelectedCapacityId(defaultCapacityId);
    setSelectedImageIndex(0);
    console.log("Selected Color on Load:", product.productColor[0]?.name || firstDetail.color?.name || "N/A");
  } else {
    setSelectedColorId(0); // Giá trị mặc định nếu không có dữ liệu
    setSelectedCapacityId(null);
    setSelectedImageIndex(0);
  }
}, [product]);
  const handlePrevImage = () => {
    const images = product?.images || [];
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    const images = product?.images || [];
    setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
  };

  // Hàm kiểm tra và thêm sản phẩm vào giỏ hàng
    const addToCart = async (redirectPath: string) => {
      if (!product || !selectedDetail) {
        message.error("Vui lòng chọn sản phẩm hợp lệ!");
        return;
      }

      // const userId = localStorage.getItem("13");
      // if (!userId) {
      //   message.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      //   return;
      // }
      const userId = "13"; // Fix cứng userId

      try {
        // Kiểm tra xem người dùng đã có giỏ hàng chưa
        const cartResponse = await cartApi.GetCartByUserId(userId);
        console.log("Cart Response:", cartResponse); // Debug response từ GetCartByUserId
        let cartId = cartResponse?.data?.id || cartResponse?.data?.cart_id; // Thử cả hai trường hợp

        // Nếu chưa có giỏ hàng, tạo giỏ hàng mới
        if (!cartId) {
          const createCartResponse = await cartApi.creatCart(userId);
          console.log("Create Cart Response:", createCartResponse); // Debug response từ creatCart
          cartId = createCartResponse?.data?.id || createCartResponse?.data?.cart_id; // Thử cả hai trường hợp
          if (!cartId) {
            throw new Error("Không thể lấy cart_id từ response khi tạo giỏ hàng");
          }
        }

        // Thêm sản phẩm vào giỏ hàng dựa trên selectedDetail
        const itemData = {
          cart_id: cartId,
          product_detail_id: selectedDetail.id,
          quantity: 1,
          price: totalPrice.toString(),
        };

        await cartApi.addCartItem(itemData);
        message.success("Đã thêm sản phẩm vào giỏ hàng thành công!");
        navigate(redirectPath);
      } catch (err: any) {
        console.error("Error adding to cart:", err.response?.data || err.message); // Debug lỗi chi tiết
        message.error("Không thể thêm sản phẩm vào giỏ hàng: " + (err.response?.data?.message || err.message));
      }
    };



  if (isLoading) return <div>Đang tải...</div>;
  if (error || !product)
    return (
      <div>
        Không thể tải chi tiết sản phẩm: {(error as Error)?.message || "Sản phẩm không tồn tại"}
      </div>
    );

  // Lấy danh sách dung lượng duy nhất
  const uniqueCapacities = Array.from(
    new Set(product.productDetails.map((detail) => detail.capacity?.id))
  )
    .map((capacityId) =>
      product.productDetails.find((detail) => detail.capacity?.id === capacityId)?.capacity
    )
    .filter((capacity): capacity is Capacity => !!capacity);

  // Lấy danh sách màu sắc
  const availableColors = product.productColor;

  // Tìm productDetail phù hợp với color_id và capacity_id đã chọn
  const selectedDetail = product.productDetails.find(
    (detail) =>
      detail.color_id === selectedColorId &&
      detail.capacity?.id === selectedCapacityId
  ) || product.productDetails.find(
    (detail) => detail.color_id === selectedColorId
  ) || product.productDetails.find(
    (detail) => detail.capacity?.id === selectedCapacityId
  ) || product.productDetails[0];

  // Tính giá bán: selling_price + capacity.price.price
  const sellingPrice = selectedDetail.selling_price
    ? parseFloat(selectedDetail.selling_price.replace(/[^0-9.-]+/g, "")) || 0
    : 0;
  const capacityPrice = selectedDetail.capacity?.price?.price
    ? parseFloat(selectedDetail.capacity.price.price.replace(/[^0-9.-]+/g, "")) || 0
    : 0;
  const totalPrice = sellingPrice + capacityPrice;

  // Lấy danh sách ảnh từ sản phẩm
  const images = product.images || [];
  const thumbnailImage = images.find((img) => img.isThumbnail)?.imageUrl || "";
  const otherImages = images.filter((img) => !img.isThumbnail);

  return (
    <>
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail">
          {/* Phần ảnh (chiếm 3/5) */}
          <div className="product-gallery">
            <div
              className="main-image-container"
              onMouseEnter={() => setShowNavButtons(true)}
              onMouseLeave={() => setShowNavButtons(false)}
            >
              {thumbnailImage ? (
                <img src={thumbnailImage} alt={product.name} className="main-image" />
              ) : (
                <div className="image-placeholder">Ảnh sản phẩm (chưa có)</div>
              )}
              {showNavButtons && images.length > 1 && (
                <>
                  <button className="nav-button prev" onClick={handlePrevImage}>
                    <LeftOutlined />
                  </button>
                  <button className="nav-button next" onClick={handleNextImage}>
                    <RightOutlined />
                  </button>
                </>
              )}
            </div>
            {/* Hiển thị các ảnh phụ */}
            <div className="thumbnail-gallery">
              {images.map((img, index) => (
                <img
                  key={img.id}
                  src={img.imageUrl}
                  alt={`${product.name} - ${index}`}
                  className={`thumbnail-image ${index === selectedImageIndex ? "active" : ""}`}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Phần thông tin (chiếm 2/5) */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>

            {/* Phần chọn dung lượng */}
            <div className="option-group">
              <span className="option-title">Dung lượng</span>
              <div className="option-list">
                {uniqueCapacities.map((capacity, index) => (
                  <div
                    key={index}
                    className={`option-item ${selectedCapacityId === capacity.id ? "active" : ""}`}
                    onClick={() => setSelectedCapacityId(capacity.id)}
                  >
                    {capacity.display_name}
                  </div>
                ))}
              </div>
            </div>

            {/* Phần chọn màu sắc */}
            <div className="option-group">
              <span className="option-title">Màu sắc</span>
              <div className="option-list">
                {availableColors.map((color, index) => (
                  <div
                    key={index}
                    className={`option-item ${selectedColorId === color.id ? "active" : ""}`}
                    onClick={() => setSelectedColorId(color.id)}
                    
                  >
                    {color.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Phần giá */}
            <div className="price-section">
              <div className="current-price">{formatPrice(totalPrice)}</div>
            </div>

            {/* Nút hành động */}
            <div className="action-buttons">
              <Button
                type="primary"
                className="btn btn-primary"
                size="large"
                onClick={() => addToCart(CUSTOMER_ROUTER_PATH.CATERGORIES)} // Thêm vào giỏ hàng và chuyển đến trang giỏ hàng
              >
                Mua Ngay
              </Button>
              <Button
                type="default"
                className="btn btn-secondary"
                size="large"
                onClick={() => addToCart(CUSTOMER_ROUTER_PATH.TRANG_CHU)} // Thêm vào giỏ hàng và chuyển về trang chủ
              >
                Thêm Vào Giỏ Hàng
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="tech-specs-container">
        <div className="tech-specs-header">
          <h2>Thông số kỹ thuật</h2>
        </div>
        <div className="tech-specs-content">
          <div className="tech-specs-column">
            <div className="spec-item">
              <span className="spec-title">Mô hình:</span>
              <span className="spec-value">{product.model || "N/A"}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Mô tả:</span>
              <span className="spec-value">{product.description || "Không có mô tả"}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Thời gian bảo hành:</span>
              <span className="spec-value">{product.warranty_period || "N/A"} tháng</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Năm phát hành:</span>
              <span className="spec-value">{product.release_year || "N/A"}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Trạng thái:</span>
              <span className="spec-value">{product.status || "N/A"}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Nhà cung cấp:</span>
              <span className="spec-value">{product.vendor?.name || "N/A"}</span>
            </div>
            {product.specs.map((spec, index) => (
              <div key={index}>
                <div className="spec-item">
                  <span className="spec-title">Kích thước màn hình:</span>
                  <span className="spec-value">{spec.screen_size || "N/A"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-title">Độ phân giải:</span>
                  <span className="spec-value">{spec.resolution || "N/A"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-title">Chipset:</span>
                  <span className="spec-value">{spec.chipset || "N/A"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-title">RAM:</span>
                  <span className="spec-value">{spec.ram || "N/A"} GB</span>
                </div>
                <div className="spec-item">
                  <span className="spec-title">Hệ điều hành:</span>
                  <span className="spec-value">{spec.os || "N/A"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-title">Dung lượng pin:</span>
                  <span className="spec-value">{spec.battery_capacity || "N/A"} mAh</span>
                </div>
                <div className="spec-item">
                  <span className="spec-title">Công nghệ sạc:</span>
                  <span className="spec-value">{spec.charging_tech || "N/A"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="home_content">
        <div className="home-list_header">
          <p className="home-list_header-title">Danh sách sản phẩm liên quan</p>
        </div>
        <ListProduct itemPerPage={4} />
      </div>
      <div style={{ width: "auto", height: "30px" }}></div>
      <FooterWeb />
    </>
  );
};

export default ProductDetail;