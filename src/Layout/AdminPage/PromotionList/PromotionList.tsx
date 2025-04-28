import React, { useState, useRef, useEffect } from "react";
import { Button, Space, Input, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import "./PromotionList.scss";
import CustomTable, {
  CustomTableRef,
} from "../../../Components/CustomTable/CustomTable";
import { useNavigate, useLocation } from "react-router-dom";
import { ADMIN_ROUTER_PATH } from "../../../Routers/Routers";

interface IPromotion {
  id: number;
  name: string;
  discountPercentage: number;
  minInvoiceAmount: number;
  created_at: string;
  updated_at: string;
}

const PromotionList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const updatedPromotion = location.state?.updatedPromotion as IPromotion | undefined;

  const [promotions, setPromotions] = useState<IPromotion[]>([
    {
      id: 1,
      name: "Khuyến mãi mùa hè",
      discountPercentage: 20,
      minInvoiceAmount: 1000000,
      created_at: "2023-06-01",
      updated_at: "2023-06-01",
    },
    {
      id: 2,
      name: "Black Friday",
      discountPercentage: 30,
      minInvoiceAmount: 2000000,
      created_at: "2023-11-01",
      updated_at: "2023-11-01",
    },
    {
      id: 3,
      name: "Tết Nguyên Đán",
      discountPercentage: 15,
      minInvoiceAmount: 500000,
      created_at: "2024-01-15",
      updated_at: "2024-01-15",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPromotions, setFilteredPromotions] = useState<IPromotion[]>(promotions);
  const tableRef = useRef<CustomTableRef>(null);

  useEffect(() => {
    if (updatedPromotion) {
      setPromotions((prev) => {
        const index = prev.findIndex((p) => p.id === updatedPromotion.id);
        if (index >= 0) {
          const newPromotions = [...prev];
          newPromotions[index] = updatedPromotion;
          return newPromotions;
        } else {
          return [...prev, updatedPromotion];
        }
      });
    }
  }, [updatedPromotion]);

  useEffect(() => {
    setFilteredPromotions(promotions);
  }, [promotions]);

  const columns: ColumnsType<IPromotion> = [
    { title: "Mã khuyến mãi", dataIndex: "id", key: "id" },
    { title: "Tên khuyến mãi", dataIndex: "name", key: "name" },
    {
      title: "Phần trăm khuyến mãi",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (value: number) => `${value}%`,
    },
    {
      title: "Hóa đơn áp dụng",
      dataIndex: "minInvoiceAmount",
      key: "minInvoiceAmount",
      render: (value: number) => `${value.toLocaleString()} VNĐ`,
    },
  ];

  const handleAddPromotion = () => {
    navigate(ADMIN_ROUTER_PATH.ADD_PROMOTION);
  };

  const handleReload = () => {
    setSearchQuery("");
    setFilteredPromotions(promotions);
    message.info("Đã tải lại danh sách khuyến mãi");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setFilteredPromotions(promotions);
    }
  };

  const handleSearchClick = () => {
    if (!searchQuery.trim()) {
      setFilteredPromotions(promotions);
      return;
    }

    const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);
    const result = promotions.filter((promotion) =>
      searchTerms.every(
        (term) =>
          promotion.id.toString().includes(term) ||
          promotion.name.toLowerCase().includes(term)
      )
    );
    setFilteredPromotions(result);
  };

  const handleEdit = (record: IPromotion) => {
    navigate(ADMIN_ROUTER_PATH.EDIT_PROMOTION(record.id), { state: { promotion: record } });
  };

  const handleDelete = (id: number | string) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
    setFilteredPromotions((prev) => prev.filter((p) => p.id !== id));
    message.success(`Đã xóa khuyến mãi với ID: ${id}`);
  };

  const customActions = (record: IPromotion) => (
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

  const deleteConfirmMessage = (record: IPromotion) =>
    `Bạn có chắc chắn muốn xóa khuyến mãi "${record.name}" không?`;

  return (
    <div className="provider-list-container">
      <div className="provider-list-header">
        <h1 className="title">Danh sách khuyến mãi</h1>
      </div>
      <div className="provider-list-actions">
        <div className="left-actions">
          <button className="btn-create" onClick={handleAddPromotion}>
            Thêm mới
          </button>
          <button className="btn-refresh" onClick={handleReload}>
            Tải lại
          </button>
        </div>
        <div className="right-actions">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <button className="btn-search" onClick={handleSearchClick}>
            <SearchOutlined />
          </button>
        </div>
      </div>

      <CustomTable
        ref={tableRef}
        data={filteredPromotions}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        loading={false}
        customActions={customActions}
        onDelete={handleDelete}
        deleteConfirmMessage={deleteConfirmMessage}
      />
    </div>
  );
};

export default PromotionList;