import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import AdminProviderForm from "../../../../Components/AdminProviderForm/AdminProviderForm";
import { ADMIN_ROUTER_PATH } from "../../../../Routers/Routers";

const ProviderEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID từ URL

  // Giả sử đang lấy dữ liệu nhà cung cấp từ đâu đó (API, state,...)
  const providerData = {
    name: "Nhà cung cấp A",
    phone: "0909123456",
    email: "ncc@example.com",
    address: "Hà Nội",
  };

  const handleSubmit = (values: any) => {
    console.log("Dữ liệu chỉnh sửa:", values);
    message.success("Cập nhật nhà cung cấp thành công!");
    navigate(ADMIN_ROUTER_PATH.PROVIDER_LIST); // Chuyển hướng về danh sách nhà cung cấp
  };

  return (
    <AdminProviderForm
      isEdit={true}
      initialValues={providerData}
      onSubmit={handleSubmit}
      onCancel={() => navigate(ADMIN_ROUTER_PATH.PROVIDER_LIST)}
    />
  );
};

export default ProviderEdit;
