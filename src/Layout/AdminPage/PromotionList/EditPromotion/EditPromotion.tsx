import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminPromotionForm from "../../../../Components/AdminPromotionForm/AdminPromotionFrom";
import { ADMIN_ROUTER_PATH } from "../../../../Routers/Routers";

const EditPromotion: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const promotion = location.state?.promotion;

  const handleSubmit = (values: any) => {
    // Simulate API call
    console.log("Editing promotion:", values);
    navigate(ADMIN_ROUTER_PATH.PROMOTION_LIST, {
      state: { updatedPromotion: { ...promotion, ...values, updated_at: new Date().toISOString().split("T")[0] } },
    });
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