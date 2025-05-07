import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreateDiscountsPayload } from "../../../../api/constants";
import { message } from "antd";
import { discountApi } from "../../../../api/api";
import { ADMIN_ROUTER_PATH } from "../../../../Routers/Routers";
import AdminPromotionForm from "../../../../Components/AdminPromotionForm/AdminPromotionFrom";


const EditPromotion: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const promotion = location.state?.promotion as CreateDiscountsPayload & { id: string };

  const handleSubmit = async (values: CreateDiscountsPayload) => {
    if (!promotion?.id) {
      message.error("Không tìm thấy ID khuyến mãi");
      return;
    }

    try {
      const response = await discountApi.updateDiscount(promotion.id, values);
      console.log("API response.data:", response.data); // Debug dữ liệu trả về
      const updatedPromotion = {
        id: promotion.id,
        ...values, // Merge values để đảm bảo đầy đủ các trường
        ...response.data, // Merge response.data để cập nhật các trường từ API
      };
      message.success("Cập nhật khuyến mãi thành công");
      navigate(ADMIN_ROUTER_PATH.PROMOTION_LIST, {
        state: { updatedPromotion },
      });
    } catch (error) {
      message.error("Không thể cập nhật khuyến mãi");
      console.error("Error updating promotion:", error);
    }
  };

  const handleCancel = () => {
    navigate(ADMIN_ROUTER_PATH.PROMOTION_LIST);
  };

  return (
    <AdminPromotionForm
      initialValues={promotion}
      isEdit={true}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default EditPromotion;