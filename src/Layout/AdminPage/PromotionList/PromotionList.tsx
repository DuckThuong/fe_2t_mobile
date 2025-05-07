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
import { discountApi } from "../../../api/api";

interface IPromotion {
  id: string;
  title: string;
  description: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

const PromotionList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const updatedPromotion = location.state?.updatedPromotion as IPromotion | undefined;

  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPromotions, setFilteredPromotions] = useState<IPromotion[]>([]);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<CustomTableRef>(null);

  // Fetch promotions from API
  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true);
      try {
        const response = await discountApi.getAllDiscounts();
        setPromotions(response.data); // Giả sử response.data chứa danh sách khuyến mãi
        setFilteredPromotions(response.data);
      } catch (error) {
        message.error("Không thể tải danh sách khuyến mãi");
        console.error("Error fetching promotions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  // Handle updated promotion
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

  // Update filtered promotions when promotions change
  useEffect(() => {
    setFilteredPromotions(promotions);
  }, [promotions]);

  const columns: ColumnsType<IPromotion> = [
    { title: "Mã khuyến mãi", dataIndex: "id", key: "id" },
    { title: "Tên khuyến mãi", dataIndex: "title", key: "title" },
    {
      title: "Loại giảm giá",
      dataIndex: "discount_type",
      key: "discount_type",
      render: (value: string) => (value === "percentage" ? "Phần trăm" : value === "fixed" ? "Cố định" : "N/A"),
    },
    {
      title: "Giá trị giảm",
      dataIndex: "discount_value",
      key: "discount_value",
      render: (value: number | undefined, record: IPromotion) => {
        if (value === undefined || record.discount_type === undefined) {
          return "N/A";
        }
        return record.discount_type === "percentage" ? `${value}%` : `${value.toLocaleString()} VNĐ`;
      },
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
      key: "start_date",
      render: (value: string) => (value ? new Date(value).toLocaleDateString("vi-VN") : "N/A"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      key: "end_date",
      render: (value: string) => (value ? new Date(value).toLocaleDateString("vi-VN") : "N/A"),
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      render: (value: boolean) => (value ? "Hoạt động" : "Không hoạt động"),
    },
  ];

  const handleAddPromotion = () => {
    navigate(ADMIN_ROUTER_PATH.ADD_PROMOTION);
  };

  const handleReload = async () => {
    setSearchQuery("");
    setLoading(true);
    try {
      const response = await discountApi.getAllDiscounts();
      setPromotions(response.data);
      setFilteredPromotions(response.data);
      message.info("Đã tải lại danh sách khuyến mãi");
    } catch (error) {
      message.error("Không thể tải lại danh sách khuyến mãi");
      console.error("Error reloading promotions:", error);
    } finally {
      setLoading(false);
    }
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
          promotion.title.toLowerCase().includes(term)
      )
    );
    setFilteredPromotions(result);
  };

  const handleEdit = (record: IPromotion) => {
    navigate(ADMIN_ROUTER_PATH.EDIT_PROMOTION(record.id), { state: { promotion: record } });
  };

  const handleDelete = async (id: string) => {
    try {
      await discountApi.deleteDiscount(id);
      setPromotions((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        return updated;
      });
      setFilteredPromotions((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        return updated;
      });
      message.success(`Đã xóa khuyến mãi!`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Không thể xóa khuyến mãi";
      message.error(errorMessage);
      console.error("Error deleting promotion:", error);
    }
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
    `Bạn có chắc chắn muốn xóa khuyến mãi "${record.title}" không?`;

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
        loading={loading}
        customActions={customActions}
        onDelete={handleDelete}
        deleteConfirmMessage={deleteConfirmMessage}
      />
    </div>
  );
};

export default PromotionList;