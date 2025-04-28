import React from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTER_PATH } from "../../../../Routers/Routers";
import AdminPromotionForm from "../../../../Components/AdminPromotionForm/AdminPromotionFrom";


const AddPromotion: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    // Simulate API call
    console.log("Adding promotion:", values);
    navigate(ADMIN_ROUTER_PATH.PROMOTION_LIST, {
      state: { updatedPromotion: { id: Date.now(), ...values, created_at: new Date().toISOString().split("T")[0], updated_at: new Date().toISOString().split("T")[0] } },
    });
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