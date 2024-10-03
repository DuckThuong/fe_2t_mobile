import { Table } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import "./tableWrap.scss";
import { TableProps } from "antd/es/table/InternalTable";
import CustomPanigation from "../CustomPagination";

export interface IScrollTable {
  x?: number | string;
  y?: number | string;
}

export interface ITableWrapProps<T> {
  data?: T[];
  isLoading?: boolean;
  page?: number;
  size?: number;
  total?: number;
  children?: any;
  rowKey?: string;
  isHidePagination?: boolean;
  isScroll?: boolean;
  isPointer?: boolean;
  scrollValue?: IScrollTable;
  setSize: (size: number) => void;
  setPage?: (page: number) => void;
  showSizeChanger?: boolean;
  onRowClick?: (record: T) => void;
  isRowAvatar?: boolean;
  rootClassName?: string;
  rowClassName?:
    | string
    | ((record: T, index?: number, indent?: number) => string);
  noDataContent?: ReactNode;
  tableProps?: TableProps;
  tableWrapperRef?: React.RefObject<HTMLDivElement>;
  tableWidth?: number;
  onChange?: (page: number) => void; // Update prop type if needed
  totalItems?: number;
}

function TableWrap<T extends object>(props: ITableWrapProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(props.page || 1);
  const [pageSize, setPageSize] = useState<number>(props.size || 10);

  useEffect(() => {
    if (props.page) {
      setCurrentPage(props.page);
    }
  }, [props.page]);

  useEffect(() => {
    if (props.size) {
      setPageSize(props.size);
    }
  }, [props.size]);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    if (props.setPage) {
      props.setPage(page);
    }
    if (props.onChange) {
      props.onChange(page);
    }
  };

  return (
    <>
      <div
        ref={props.tableWrapperRef}
        style={{ overflowX: "auto", overflowY: "hidden" }}
      >
        <div
          className="table-wrap__container"
          style={{
            minWidth: props.tableWidth ? `${props.tableWidth}px` : "auto",
          }}
        >
          <Table
            loading={props.isLoading}
            pagination={false}
            rowKey={props.rowKey || "id" || "key"}
            rowSelection={undefined}
            scroll={props.isScroll ? props.scrollValue : {}}
            className={`${props.isPointer ? "table-wrap__pointer" : ""} ${
              props.isRowAvatar ? "table-wrap__avatar" : ""
            }`}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  if (props.onRowClick) {
                    props.onRowClick(record);
                  }
                },
              };
            }}
            rootClassName={props?.rootClassName}
            rowClassName={props?.rowClassName}
            {...props.tableProps}
            locale={{
              emptyText: (
                <div className="d-flex flex-column align-items-center justify-content-center m-t-40">
                  {props.noDataContent}
                </div>
              ),
            }}
          >
            {props.children}
          </Table>
        </div>
      </div>
      {!props.isHidePagination && (
        <CustomPanigation
          total={props.total || 0}
          page={currentPage}
          onChange={handlePaginationChange}
          isLoadding={props.isLoading}
          totalItems={props.totalItems || 0}
        />
      )}
    </>
  );
}

export default TableWrap;
