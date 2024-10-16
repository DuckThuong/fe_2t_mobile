import React from "react";
import {
  EditOutlined,
  PrinterOutlined,
  FileExcelOutlined,
  AppstoreAddOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { CustomButton } from "../../Components/buttons/CustomButton";
import "./footerWeb.scss";
interface StudentFooterActionsProps {
  editState: boolean;
  setEditState: (state: boolean) => void;
  modalStates: any;
  disAble?: boolean;
  setModalStates: (states: any) => void;
  handleExportExcel?: () => void;
  scrollOptions?: ScrollToOptions;
  shouldScroll?: boolean;
  isPrint?: boolean;
  isExport?: boolean;
  isShowOption?: boolean;
}

const StudentFooterActions: React.FC<StudentFooterActionsProps> = ({
  editState,
  setEditState,
  modalStates,
  setModalStates,
  handleExportExcel,
  disAble,
  scrollOptions,
  shouldScroll,
  isPrint,
  isExport,
  isShowOption,
}) => {
  return (
    <div className="footer-web_footer">
      {editState ? (
        <>
          <CustomButton
            content={"Chỉnh sửa"}
            buttonProps={{
              icon: <EditOutlined />,
              className: "footer-web_footer-edit",
              onClick: () => {
                setEditState(false);
                if (shouldScroll) {
                  window.scrollTo({
                    top: scrollOptions?.top || 0,
                    behavior: scrollOptions?.behavior || "smooth",
                  });
                }
              },
            }}
          />
          <div className="option">
            {isPrint ? (
              <CustomButton
                content={"In thông tin"}
                buttonProps={{
                  icon: <PrinterOutlined />,
                  className: "footer-web_footer-print",
                  onClick: () => {
                    window.print();
                  },
                }}
              />
            ) : (
              <></>
            )}
            {isExport ? (
              <CustomButton
                content="Xuất Excel"
                buttonProps={{
                  className: "footer-web_footer-excel",
                  icon: <FileExcelOutlined />,
                  onClick: handleExportExcel,
                  disabled: disAble,
                }}
              />
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <>
          {isShowOption ? (
            <>
              {" "}
              <div className="option">
                <CustomButton
                  content={"Thêm"}
                  buttonProps={{
                    icon: <AppstoreAddOutlined />,
                    className: "footer-web_footer-add",
                    onClick: () => {
                      setModalStates({
                        ...modalStates,
                        addModal: true,
                        showRegistedNewColumn: false,
                        showDeleteButton: false,
                        showEditButton: false,
                      });
                    },
                  }}
                />
                <CustomButton
                  content={"Sửa"}
                  buttonProps={{
                    icon: <EditOutlined />,
                    className: "footer-web_footer-editTable",
                    onClick: () => {
                      setModalStates({
                        ...modalStates,
                        showRegistedNewColumn: true,
                        showEditButton: true,
                        showDeleteButton: false,
                      });
                    },
                  }}
                />
                <CustomButton
                  content={"Xóa"}
                  buttonProps={{
                    icon: <DeleteOutlined />,
                    className: "footer-web_footer-delete",
                    onClick: () => {
                      setModalStates({
                        ...modalStates,
                        showRegistedNewColumn: true,
                        showDeleteButton: true,
                        showEditButton: false,
                      });
                    },
                  }}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          <CustomButton
            content={"Lưu"}
            buttonProps={{
              icon: <SaveOutlined />,
              className: "footer-web_footer-save",
              onClick: () => {
                setEditState(true);
                setModalStates({
                  ...modalStates,
                  showRegistedNewColumn: false,
                  showDeleteButton: false,
                  showEditButton: false,
                });
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default StudentFooterActions;
