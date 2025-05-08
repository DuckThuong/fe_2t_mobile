import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Input, message, Form, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import "./ProviderList.scss";
import CustomTable, {
  CustomTableRef,
} from "../../../Components/CustomTable/CustomTable";
import { CreateVendorsPayload } from "../../../api/constants";
import { vendorsApi } from "../../../api/api";

interface IProvider {
  id: number;
  vendor_code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  contact_person_id: number;
}

const ProviderList: React.FC = () => {
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProviders, setFilteredProviders] = useState<IProvider[]>([]);
  const tableRef = useRef<CustomTableRef>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProvider, setEditingProvider] = useState<IProvider | null>(null);
  const [form] = Form.useForm();

  // Fetch all providers
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await vendorsApi.getAllVendors();
        setProviders(data);
        setFilteredProviders(data);
      } catch (error) {
        message.error("Lỗi khi tải danh sách nhà cung cấp");
        console.error(error);
      }
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    setFilteredProviders(providers);
  }, [providers]);

  // Handle input change
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle search button click (local filtering)
  const handleSearchClick = async () => {
    if (!searchQuery.trim()) {
      const data = await vendorsApi.getAllVendors();
      setFilteredProviders(data);
      return;
    }

    try {
      const data = await vendorsApi.getAllVendors();
      const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);
      const result = data.filter((provider) =>
        searchTerms.every(
          (term) =>
            provider.id.toString().includes(term) ||
            provider.name.toLowerCase().includes(term) ||
            provider.vendor_code.toLowerCase().includes(term)
        )
      );
      setFilteredProviders(result);
    } catch (error) {
      message.error("Lỗi khi tìm kiếm nhà cung cấp");
      console.error(error);
    }
  };

  // Reload providers
  const handleReload = async () => {
    setSearchQuery("");
    try {
      const data = await vendorsApi.getAllVendors();
      setProviders(data);
      setFilteredProviders(data);
      message.info("Đã tải lại danh sách nhà cung cấp");
    } catch (error) {
      message.error("Lỗi khi tải lại danh sách nhà cung cấp");
      console.error(error);
    }
  };

  // Edit provider - Open modal with pre-filled data
  const handleEdit = (record: IProvider) => {
    setEditingProvider(record);
    form.setFieldsValue({
      name: record.name || "",
      phone: record.phone || "",
      email: record.email || "",
      address: record.address || "",
    });
    setIsModalVisible(true);
  };

  // Handle form submission for editing
  const handleEditSubmit = async (values: any) => {
    if (!editingProvider) return;

    try {
      const updatedData: CreateVendorsPayload = {
        vendor_code: editingProvider.vendor_code,
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address,
        contact_person_id: editingProvider.contact_person_id,
      };

      await vendorsApi.updateVendor(editingProvider.id.toString(), updatedData);
      message.success("Cập nhật nhà cung cấp thành công!");

      const updatedProviders = providers.map((provider) =>
        provider.id === editingProvider.id
          ? { ...provider, ...values }
          : provider
      );
      setProviders(updatedProviders);
      setFilteredProviders(updatedProviders);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error: any) {
      message.error("Cập nhật nhà cung cấp thất bại");
      console.error("Lỗi khi cập nhật:", error.message, error.response?.status, error.response?.data);
    }
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn hủy?",
      onOk: () => {
        setIsModalVisible(false);
        setEditingProvider(null);
        form.resetFields();
      },
    });
  };

  // Delete provider
  const handleDelete = async (id: number | string) => {
    try {
      await vendorsApi.deleteVendor(id.toString());
      setProviders((prev) => prev.filter((p) => p.id !== id));
      setFilteredProviders((prev) => prev.filter((p) => p.id !== id));
      message.success("Xóa nhà cung cấp thành công!");
    } catch (error: any) {
      message.error("Lỗi khi xóa nhà cung cấp");
      console.error("Lỗi khi xóa:", error.message, error.response?.status, error.response?.data);
    }
  };

  const customActions = (record: IProvider) => (
    <Space size="middle">
      <Button type="primary" onClick={() => handleEdit(record)}>
        Sửa
      </Button>
      <Button
        type="primary"
        danger
        onClick={() => tableRef.current?.showDeleteConfirm(record.id)}
      >
        Xóa
      </Button>
    </Space>
  );

  const deleteConfirmMessage = (record: IProvider) =>
    `Bạn có chắc chắn muốn xóa nhà cung cấp "${record.name}" không?`;

  const columns: ColumnsType<IProvider> = [
    { title: "Mã nhà cung cấp", dataIndex: "id", key: "id" },
    { title: "Mã vendor", dataIndex: "vendor_code", key: "vendor_code" },
    { title: "Tên nhà cung cấp", dataIndex: "name", key: "name" },
  ];

  return (
    <div className="provider-list-container">
      <div className="provider-list-header">
        <h1 className="title">Danh sách nhà cung cấp</h1>
      </div>
      <div className="provider-list-actions">
        <div className="left-actions">
          <button className="btn-refresh" onClick={handleReload}>
            Tải lại
          </button>
        </div>
        <div className="right-actions">
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="search-input"
          />
          <button className="btn-search" onClick={handleSearchClick}>
            <SearchOutlined />
          </button>
        </div>
      </div>

      <CustomTable
        ref={tableRef}
        data={filteredProviders}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        loading={false}
        customActions={customActions}
        onDelete={handleDelete}
        deleteConfirmMessage={deleteConfirmMessage}
      />

      {/* Modal chỉnh sửa nhà cung cấp */}
      <Modal
        title="Chỉnh sửa nhà cung cấp"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Form.Item
            label="Tên nhà cung cấp"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", message: "Email không hợp lệ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
            <Button onClick={handleModalCancel} style={{ marginLeft: 10 }}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProviderList;