import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Upload,
  message,
  Select,
  Spin,
  Checkbox,
} from "antd";
import { UploadOutlined, CloseCircleFilled } from "@ant-design/icons";
import "./EditProduct.scss";
import { ADMIN_ROUTER_PATH } from "../../../../Routers/Routers";
import { productApi, vendorsApi } from "../../../../api/api";
import axios from "axios";
import { UpdateProductPayload } from "../../../../api/constants";

interface ISpecs {
  screen_size?: string;
  resolution?: string;
  chipset?: string;
  ram?: string;
  os?: string;
  battery_capacity?: string;
  charging_tech?: string;
}

interface IProduct {
  id: number;
  name: string;
  model: string;
  description?: string;
  warranty_period?: number;
  release_year?: number;
  is_featured?: boolean;
  status?: "Active" | "Inactive";
  vendor_id: number;
  serial_number?: string;
  import_price?: string;
  selling_price: string;
  specs: ISpecs;
  image_urls?: string[];
}

interface IVendor {
  id: number;
  name: string;
}

interface ImageFile {
  uid: string;
  url?: string;
  file?: File;
  name: string;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3300";

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [form] = Form.useForm();
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [vendors, setVendors] = useState<IVendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(null);

  const initialProductData = (location.state as { productData?: IProduct })?.productData;

  // Fetch vendors
  useEffect(() => {
    let isMounted = true;
    const fetchVendors = async () => {
      try {
        const vendorsData = await vendorsApi.getAllVendors();
        if (isMounted) setVendors(vendorsData);
      } catch (err) {
        if (isMounted) message.error("Không thể tải danh sách nhà cung cấp!");
        console.error("Lỗi fetch vendors:", err);
      }
    };
    fetchVendors();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch product data
  useEffect(() => {
    if (!id) {
      message.error("Không tìm thấy ID sản phẩm!");
      navigate(ADMIN_ROUTER_PATH.PRODUCT_LIST);
      return;
    }

    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const productData = initialProductData || (await productApi.getProductById(id));
        if (!isMounted) return;

        const normalizedData: IProduct = {
          id: productData.id,
          name: productData.name || "",
          model: productData.model || "",
          description: productData.description || "",
          warranty_period: productData.warranty_period || 0,
          release_year: productData.release_year || new Date().getFullYear(),
          is_featured: productData.is_featured || false,
          status: productData.status || "Active",
          vendor_id: productData.vendor?.id || productData.vendor_id || 0,
          serial_number: productData.serial_number || "",
          import_price: productData.import_price || undefined,
          selling_price: productData.selling_price || "",
          specs: {
            screen_size: productData.specs?.screen_size || "",
            resolution: productData.specs?.resolution || "",
            chipset: productData.specs?.chipset || "",
            ram: productData.specs?.ram || "",
            os: productData.specs?.os || "",
            battery_capacity: productData.specs?.battery_capacity || "",
            charging_tech: productData.specs?.charging_tech || "",
          },
          image_urls: productData.image_urls?.filter((url: string | null) => url !== null) || [],
        };

        setProduct(normalizedData);
        form.setFieldsValue({
          ...normalizedData,
          specs: normalizedData.specs,
        });

        if (normalizedData.image_urls?.length) {
          setImageFiles(
            normalizedData.image_urls.map((url, index) => ({
              uid: `-${index + 1}`,
              url,
              name: `image-${index + 1}.png`,
            }))
          );
        }
      } catch (err) {
        if (isMounted) {
          message.error("Không thể tải dữ liệu sản phẩm!");
          navigate(ADMIN_ROUTER_PATH.PRODUCT_LIST);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [id, navigate, form, initialProductData]);

  // Handle image changes
  const handleImageChange = useCallback((info: any) => {
    const newFiles = info.fileList.map((file: any) => ({
      uid: file.uid,
      file: file.originFileObj,
      url: file.originFileObj ? URL.createObjectURL(file.originFileObj) : file.url,
      name: file.name,
    }));
    setImageFiles(newFiles);
  }, []);

  // Remove image
  const handleRemoveImage = useCallback((uid: string) => {
    setImageFiles((prev) => prev.filter((file) => file.uid !== uid));
  }, []);

  // Upload images to backend
  const uploadImages = async (files: ImageFile[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      if (file.file) {
        const formData = new FormData();
        formData.append("image", file.file);
        const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploadedUrls.push(response.data.url);
      } else if (file.url) {
        uploadedUrls.push(file.url);
      }
    }
    return uploadedUrls;
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    if (!product) return;

    setLoading(true);
    try {
      // Upload new images
      const uploadedImageUrls = await uploadImages(imageFiles);

      const updatedProductData: UpdateProductPayload = {
        id: Number(id),
        name: values.name || product.name,
        model: values.model || product.model,
        description: values.description || product.description || "",
        warranty_period: Number(values.warranty_period) || product.warranty_period || 0,
        release_year: Number(values.release_year) || product.release_year || new Date().getFullYear(),
        is_featured: values.is_featured ?? product.is_featured ?? false,
        status: values.status || product.status || "Active",
        vendor_id: Number(values.vendor_id) || product.vendor_id,
        serial_number: values.serial_number || product.serial_number || "",
        import_price: values.import_price || product.import_price || "",
        selling_price: values.selling_price || product.selling_price || "",
        specs: {
          screen_size: values.specs?.screen_size || product.specs.screen_size || "",
          resolution: values.specs?.resolution || product.specs.resolution || "",
          chipset: values.specs?.chipset || product.specs.chipset || "",
          ram: values.specs?.ram || product.specs.ram || "",
          os: values.specs?.os || product.specs.os || "",
          battery_capacity: values.specs?.battery_capacity || product.specs.battery_capacity || "",
          charging_tech: values.specs?.charging_tech || product.specs.charging_tech || "",
        },
        image_urls: uploadedImageUrls,
      };

      await axios.put(`${API_BASE_URL}/product/update-product`, updatedProductData);
      message.success("Cập nhật sản phẩm thành công!");
      navigate(ADMIN_ROUTER_PATH.PRODUCT_LIST);
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Lỗi khi cập nhật sản phẩm!");
      console.error("Lỗi update sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(ADMIN_ROUTER_PATH.PRODUCT_LIST);
  };

  if (loading || !product) {
    return (
      <div className="loading-container">
        <Spin tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <div className="product-form-page">
      <h2>Sửa sản phẩm</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Model"
          name="model"
          rules={[{ required: true, message: "Vui lòng nhập model!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Thời gian bảo hành (tháng)" name="warranty_period">
          <Input type="number" min={0} />
        </Form.Item>
        <Form.Item label="Năm ra mắt" name="release_year">
          <Input type="number" min={1900} max={new Date().getFullYear()} />
        </Form.Item>
        <Form.Item label="Nổi bật" name="is_featured" valuePropName="checked">
          <Checkbox />
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select>
            <Select.Option value="Active">Hoạt động</Select.Option>
            <Select.Option value="Inactive">Ngưng hoạt động</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Nhà cung cấp"
          name="vendor_id"
          rules={[{ required: true, message: "Vui lòng chọn nhà cung cấp!" }]}
        >
          <Select
            placeholder="Chọn nhà cung cấp"
            loading={vendors.length === 0}
            showSearch
            optionFilterProp="children"
          >
            {vendors.map((vendor) => (
              <Select.Option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Số serial" name="serial_number">
          <Input />
        </Form.Item>
        {/* <Form.Item label="Giá nhập" name="import_price">
          <Input type="text" />
        </Form.Item> */}
        <Form.Item
          label="Giá bán"
          name="selling_price"
          rules={[{ required: true, message: "Vui lòng nhập giá bán!" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Ảnh" name="image_urls">
          <Upload
            listType="picture"
            showUploadList={false}
            beforeUpload={() => false}
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
        <Form.Item label="Kích thước màn hình" name={["specs", "screen_size"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Độ phân giải" name={["specs", "resolution"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Chipset" name={["specs", "chipset"]}>
          <Input />
        </Form.Item>
        <Form.Item label="RAM" name={["specs", "ram"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Hệ điều hành" name={["specs", "os"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Dung lượng pin" name={["specs", "battery_capacity"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Công nghệ sạc" name={["specs", "charging_tech"]}>
          <Input />
        </Form.Item>
        <div className="form-actions">
          <Button
            type="primary"
            htmlType="submit"
            className="btn-submit"
            loading={loading}
          >
            Lưu thay đổi
          </Button>
          <Button
            className="btn-cancel"
            onClick={handleCancel}
            disabled={loading}
          >
            Hủy
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProduct;