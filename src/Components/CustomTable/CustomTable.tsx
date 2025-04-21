import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Table, Modal } from "antd";
import { ColumnsType } from "antd/es/table";

interface ITableData {
  id: number | string;
  [key: string]: any;
}

interface ICustomTableProps<T extends ITableData> {
  data: T[];
  columns?: ColumnsType<T>;
  rowKey?: string;
  pagination?: false | { [key: string]: any };
  scroll?: { x?: number | string; y?: number | string };
  loading?: boolean;
  customActions?: (record: T) => React.ReactNode;
  onDelete?: (id: number | string) => void;
  deleteConfirmMessage?: (record: T) => string;
}

export interface CustomTableRef {
  showDeleteConfirm: (id: number | string) => void;
}

const CustomTable = forwardRef<CustomTableRef, ICustomTableProps<any>>(
  (
    {
      data,
      columns: externalColumns,
      rowKey = "id",
      pagination = { pageSize: 10 },
      scroll = { x: "max-content" },
      loading = false,
      customActions,
      onDelete,
      deleteConfirmMessage,
    },
    ref
  ) => {
    const [deleteId, setDeleteId] = useState<number | string | null>(null);

    const showDeleteConfirm = (id: number | string) => {
      setDeleteId(id);
    };

    const handleOk = () => {
      if (deleteId !== null && onDelete) {
        onDelete(deleteId);
      }
      setDeleteId(null);
    };

    const handleCancel = () => {
      setDeleteId(null);
    };

    // Expose showDeleteConfirm ra ngoài qua ref
    useImperativeHandle(ref, () => ({
      showDeleteConfirm,
    }));

    const actionColumn: ColumnsType<any> = customActions
      ? [
          {
            title: "Hành động",
            key: "action",
            render: (_, record) => customActions(record),
          },
        ]
      : [];

    const finalColumns = externalColumns
      ? [...externalColumns, ...actionColumn]
      : actionColumn;

    const recordToDelete = data.find((item) => item.id === deleteId);

    return (
      <div className="custom-table-wrapper">
        <Table<any>
          columns={finalColumns}
          dataSource={data}
          rowKey={rowKey}
          pagination={pagination}
          scroll={scroll}
          loading={loading}
          locale={{ emptyText: "Không có dữ liệu" }}
          className="custom-table"
        />
        {onDelete && (
          <Modal
            title="Xác nhận xóa"
            open={deleteId !== null}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <p>
              {deleteConfirmMessage && recordToDelete
                ? deleteConfirmMessage(recordToDelete)
                : `Bạn có chắc chắn muốn xóa bản ghi này không?`}
            </p>
          </Modal>
        )}
      </div>
    );
  }
);

export default CustomTable;