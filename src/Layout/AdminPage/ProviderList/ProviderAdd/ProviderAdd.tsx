import React from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import AdminProviderForm from "../../../../Components/AdminProviderForm/AdminProviderForm";
import { ADMIN_ROUTER_PATH } from "../../../../Routers/Routers";


const ProviderAdd: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    console.log("Dữ liệu thêm:", values);
    message.success("Thêm nhà cung cấp thành công!");
    navigate(ADMIN_ROUTER_PATH.PROVIDER_LIST); 

  };

  return (
    <AdminProviderForm
      isEdit={false}
      onSubmit={handleSubmit}
      onCancel={() => navigate(ADMIN_ROUTER_PATH.PROVIDER_LIST)}
    />
  );
};

export default ProviderAdd;
