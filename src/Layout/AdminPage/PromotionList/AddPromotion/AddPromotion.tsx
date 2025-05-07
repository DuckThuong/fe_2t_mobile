import React from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTER_PATH } from "../../../../Routers/Routers";

import { message } from "antd";
import { CreateDiscountsPayload } from "../../../../api/constants";
import { discountApi } from "../../../../api/api";
import AdminPromotionForm from "../../../../Components/AdminPromotionForm/AdminPromotionFrom";


const AddPromotion: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: CreateDiscountsPayload) => {
    try {
      const response = await discountApi.createDiscount(values);
      message.success("Thêm khuyến mãi thành công");
      navigate(ADMIN_ROUTER_PATH.PROMOTION_LIST, {
        state: { updatedPromotion: response.data }, // 
      });
    } catch (error) {
      message.error("Không thể thêm khuyến mãi");
      console.error("Error adding promotion:", error);
    }
  };

  const handleCancel = () => {
    navigate(ADMIN_ROUTER_PATH.PROMOTION_LIST);
  };

  return (
    <AdminPromotionForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default AddPromotion;