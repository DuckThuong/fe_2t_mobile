import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined, CloseCircleFilled } from "@ant-design/icons";
import "./EditProduct.scss";
import { ADMIN_ROUTER_PATH } from "../../../../Routers/Routers";


interface ISpecs {
  screen_size: string;
  resolution: string;
  chipset: string;
  ram: string;
  os: string;
  battery_capacity: string;
  charging_tech: string;
}

interface IProduct {
  id: number;
  name: string;
  capacity: string;
  color: string;
  quantity: number;
  price: number;
  shipmentId: string;
  image: string;
  createdAt: string;
  specs?: ISpecs;
}

interface ImageFile {
  uid: string;
  url: string;
  name: string;
}

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingProduct = location.state?.product as IProduct | undefined;
  const [form] = Form.useForm();
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);

  // Initialize imageFiles and handle missing product
  useEffect(() => {
    if (!editingProduct) {
      message.error("Không tìm thấy sản phẩm để chỉnh sửa!");
      navigate(ADMIN_ROUTER_PATH.PRODUCT_LIST);
    } else {
      setImageFiles([
        {
          uid: "-1",
          url: editingProduct.image,
          name: "image.png",
        },
      ]);
    }
  }, [editingProduct, navigate]);

  // Render nothing until redirect happens
  if (!editingProduct) {
    return null;
  }

  const handleImageChange = (info: any) => {
    const newFiles = info.fileList.map((file: any) => ({
      uid: file.uid,
      url: file.originFileObj ? URL.createObjectURL(file.originFileObj) : file.url,
      name: file.name,
    }));
    setImageFiles(newFiles);
  };

  const handleRemoveImage = (uid: string) => {
    setImageFiles((prev) => prev.filter((file) => file.uid !== uid));
  };

  const handleSubmit = (values: any) => {
    const updatedProduct: IProduct = {
      ...editingProduct,
      name: values.name,
      capacity: values.capacity,
      color: values.color,
      quantity: parseInt(values.quantity) || 0,
      price: parseFloat(values.price) || 0,
      shipmentId: values.shipmentId,
      image: imageFiles[0]?.url || "",
      specs: {
        screen_size: values.screen_size || "",
        resolution: values.resolution || "",
        chipset: values.chipset || "",
        ram: values.ram || "",
        os: values.os || "",
        battery_capacity: values.battery_capacity || "",
        charging_tech: values.charging_tech || "",
      },
    };
    navigate(ADMIN_ROUTER_PATH.PRODUCT_LIST, { state: { updatedProduct } });
    message.success("Cập nhật sản phẩm thành công!");
  };

  const handleCancel = () => {
    navigate(ADMIN_ROUTER_PATH.PRODUCT_LIST);
  };

  return (
    <div className="product-form-page">
      <h2>Sửa sản phẩm</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: editingProduct.name,
          capacity: editingProduct.capacity,
          color: editingProduct.color,
          quantity: editingProduct.quantity,
          price: editingProduct.price,
          shipmentId: editingProduct.shipmentId,
          screen_size: editingProduct.specs?.screen_size || "",
          resolution: editingProduct.specs?.resolution || "",
          chipset: editingProduct.specs?.chipset || "",
          ram: editingProduct.specs?.ram || "",
          os: editingProduct.specs?.os || "",
          battery_capacity: editingProduct.specs?.battery_capacity || "",
          charging_tech: editingProduct.specs?.charging_tech || "",
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Dung lượng"
          name="capacity"
          rules={[{ required: true, message: "Vui lòng nhập dung lượng" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Màu sắc"
          name="color"
          rules={[{ required: true, message: "Vui lòng nhập màu sắc" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
        >
          <Input type="number" min={0} />
        </Form.Item>
        <Form.Item
          label="Giá gốc"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá gốc" }]}
        >
          <Input type="number" min={0} />
        </Form.Item>
        <Form.Item
          label="Mã lô hàng"
          name="shipmentId"
          rules={[{ required: true, message: "Vui lòng nhập mã lô hàng" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Ảnh">
          <Upload
            listType="picture"
            showUploadList={false} // Hide default vertical list
            beforeUpload={() => false} // Prevent auto-upload
            onChange={handleImageChange}
            multiple
          >
            <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
          </Upload>
          <div className="image-preview-container">
            {imageFiles.map((file) => (
              <div key={file.uid} className="image-preview-wrapper">
                <img src={file.url} alt="Preview" className="image-preview" />
                <CloseCircleFilled
                  className="delete-image"
                  onClick={() => handleRemoveImage(file.uid)}
                />
              </div>
            ))}
          </div>
        </Form.Item>
        <h3>Thông số kỹ thuật</h3>
        <Form.Item label="Kích thước màn hình" name="screen_size">
          <Input />
        </Form.Item>
        <Form.Item label="Độ phân giải" name="resolution">
          <Input />
        </Form.Item>
        <Form.Item label="Chipset" name="chipset">
          <Input />
        </Form.Item>
        <Form.Item label="RAM" name="ram">
          <Input />
        </Form.Item>
        <Form.Item label="Hệ điều hành" name="os">
          <Input />
        </Form.Item>
        <Form.Item label="Dung lượng pin" name="battery_capacity">
          <Input />
        </Form.Item>
        <Form.Item label="Công nghệ sạc" name="charging_tech">
          <Input />
        </Form.Item>
        <div className="form-actions">
          <Button type="primary" htmlType="submit" className="btn-submit">
            Lưu thay đổi
          </Button>
          <Button className="btn-cancel" onClick={handleCancel}>
            Hủy
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProduct;