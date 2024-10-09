import { useEffect, useRef, useState } from "react";
import { SvgMagnifyingGlassSubmit } from "../../Components/@svg/SvgMagnifyingGlassSubmit";
import { CustomButton } from "../../Components/buttons/CustomButton";
import ColWrap from "../../Components/ColWrap";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormInputSearch } from "../../Components/Form/FormInputSearch";
import FormWrap from "../../Components/Form/FormWrap";
import RowWrap from "../../Components/RowWrap";
import TableWrap from "../../Components/TableWrap";
import { HeaderWeb } from "../HeaderWeb";
import CustomSelectCheckbox from "./../../Components/Form/FormSelectCheckbox/index";
import CustomSelectRadio from "./../../Components/Form/FormSelectRadio/index";
import "./listStudents.scss";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  EditOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import { TableRowSelection } from "antd/es/table/interface";
import { FormInput } from "../../Components/Form/FormInput";
import { Modal } from "antd";
import { FormSelect } from "../../Components/Form/FormSelect";
import { useForm } from "antd/es/form/Form";
import NotificationPopup from "../Notification";
enum classSelector {
  SIX = "Lớp 6",
  SEVEN = "Lớp 7",
  EIGHT = "Lớp 8",
  NINE = "Lớp 9",
}
enum stateSelector {
  ALL = "ALL",
  ON_STUDY = "Đang học",
  OUT_STUDY = "Nghỉ học",
  GRADUATE = "Tốt nghiệp",
  RESERVED = "Bảo lưu",
}
interface AnyObject {
  [key: string]: any;
}
export const ListStudents = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [form] = useForm();
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const classOption = Object.values(classSelector).map((major) => ({
    label: major,
    value: major,
  }));
  const stateOption = Object.values(stateSelector).map((course) => ({
    label: course,
    value: course,
  }));
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [editState, setEditState] = useState<boolean>(true);
  const [modalStates, setModalStates] = useState({
    editModal: false,
    deleteModal: false,
    addModal: false,
    addStudent: false,
    showDeleteButton: false,
    showEditButton: false,
    showNewColumn: false,
    showRegistedNewColumn: false,
    showEditstudent: false,
  });
  const option = [
    { value: "Đang học", label: "Đang học" },
    { value: "Nghỉ học", label: "Nghỉ học" },
    { value: "Bảo lưu", label: "Bảo lưu" },
    { value: "Tốt nghiệp", label: "Tốt nghiệp" },
  ];
  const conlumns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => {
        return (
          <p style={{ color: "black", fontWeight: "600" }}>{record.key}</p>
        );
      },
    },
    {
      title: "MÃ HỌC SINH",
      dataIndex: "studentMsv",
      key: "studentsMsv",
      render: (record) => {
        return (
          <>
            <p className="list-student_data-studentsMsv">{record}</p>
          </>
        );
      },
    },
    {
      title: "HỌ VÀ TÊN",
      dataIndex: "studentName",
      key: "studentName",
      render: (record) => {
        return (
          <>
            <p className="list-student_data-studentName">{record}</p>
          </>
        );
      },
    },
    {
      title: "LỚP",
      dataIndex: "studentClass",
      key: "studentClass",
      render: (record) => {
        return (
          <>
            <p className="list-student_data-studentClass">{record}</p>
          </>
        );
      },
    },
    {
      title: "KHÓA",
      dataIndex: "studentCourse",
      key: "studentCourse",
      render: (record) => {
        return (
          <>
            <p className="list-student_data-studentCourse">{record}</p>
          </>
        );
      },
    },
    {
      title: "NGÀY SINH",
      dataIndex: "studentDob",
      key: "studentDob",
      render: (record) => {
        return (
          <>
            <p className="m-0 list-student_data-studentDob">{record}</p>
          </>
        );
      },
    },
    {
      title: "GIỚI TÍNH",
      dataIndex: "studentGender",
      key: "studentGender",
      render: (record) => {
        return (
          <>
            <p className="list-student_data-studentGender">{record}</p>
          </>
        );
      },
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "studentState",
      key: "studentState",
      render: (record) => {
        const stateDisplay = stateOption.find(
          (option) => option.value === record
        )?.label;
        const stateClass = `list-student_data-studentState ${
          stateDisplay ? stateDisplay.toLowerCase().replace(/\s+/g, "-") : ""
        }`;
        return (
          <>
            <p className={stateClass}>{stateDisplay || record}</p>
          </>
        );
      },
    },
    {
      title: "CHI TIẾT",
      dataIndex: "studentOption",
      key: "studentOption",
      render: () => {
        return (
          <>
            <CustomButton
              content="Chi tiết"
              buttonProps={{
                className: "list-student_data-studentOption",
                icon: <FontAwesomeIcon icon={faCircleInfo} />,
                onClick: () => {
                  navigate(CUSTOMER_ROUTER_PATH.STUDENT_INFORMATION);
                },
              }}
            />
          </>
        );
      },
    },
    {
      title: "CHỨC NĂNG",
      dataIndex: "cn",
      key: "cn",
      render: (text) => {
        return (
          <>
            {modalStates.showEditButton && (
              <CustomButton
                content="Sửa"
                buttonProps={{
                  onClick: () => {
                    setModalStates({
                      ...modalStates,
                      editModal: true,
                    });
                  },
                  icon: <EditOutlined />,
                  className: "list-student_footer-editTable",
                }}
              />
            )}
            {modalStates.showDeleteButton && (
              <CustomButton
                content="Xóa"
                buttonProps={{
                  icon: <DeleteOutlined />,
                  onClick: () => {
                    setModalStates({
                      ...modalStates,
                      deleteModal: true,
                    });
                  },
                  className: "list-student_footer-delete",
                }}
              />
            )}
          </>
        );
      },

      hidden: !modalStates.showRegistedNewColumn,
    },
  ];
  const [data, setNewData] = useState<any[]>([
    {
      key: "1",
      studentMsv: "21A100100373",
      studentName: "Trịnh Đức Thưởng",
      studentClass: "8",
      studentCourse: "K21",
      studentDob: "28/07/2003",
      studentGender: "Nam",
      studentState: "Đang học",
      studentOption: "Details",
    },
    {
      key: "2",
      studentMsv: "21A100100140",
      studentName: "Lương Thu Hoài",
      studentClass: "8",
      studentCourse: "K21",
      studentDob: "1/10/2003",
      studentGender: "Nữ",
      studentState: "Đang học",
      studentOption: "Details",
    },
    {
      key: "3",
      studentMsv: "21A100100137",
      studentName: "Nguyễn Minh Hòa",
      studentClass: "8",
      studentCourse: "K21",
      studentDob: "15/11/2003",
      studentGender: "Nữ",
      studentState: "Tốt nghiệp",
      studentOption: "Details",
    },
    {
      key: "4",
      studentMsv: "21A100100331",
      studentName: "Nguyễn Minh Tuấn",
      studentClass: "8",
      studentCourse: "K21",
      studentDob: "15/01/2003",
      studentGender: "Nam",
      studentState: "Bảo lưu",
      studentOption: "Details",
    },
    {
      key: "5",
      studentMsv: "21A100100337",
      studentName: "Trần Minh Thư",
      studentClass: "8",
      studentCourse: "K21",
      studentDob: "25/11/2003",
      studentGender: "Nữ",
      studentState: "Nghỉ học",
      studentOption: "Details",
    },
    {
      key: "6",
      studentMsv: "21A100100327",
      studentName: "Trần Minh Tuấn",
      studentClass: "8",
      studentCourse: "K21",
      studentDob: "25/5/2003",
      studentGender: "Nam",
      studentState: "Nghỉ học",
      studentOption: "Details",
    },
    {
      key: "7",
      studentMsv: "21A100100344",
      studentName: "Trịnh Văn Mạnh",
      studentClass: "8",
      studentCourse: "K21",
      studentDob: "25/11/2003",
      studentGender: "Nam",
      studentState: "Đang học",
      studentOption: "Details",
    },
    {
      key: "8",
      studentMsv: "21A100100437",
      studentName: "Hoàng Bảo Ngọc",
      studentClass: "8",
      studentCourse: "K21",
      studentDob: "03/02/2003",
      studentGender: "Nữ",
      studentState: "Đang học",
      studentOption: "Details",
    },
    {
      key: "9",
      studentMsv: "21A100100537",
      studentName: "Trần Khánh Hùng",
      studentClass: "8",
      studentCourse: "K21",
      studentDob: "25/11/2003",
      studentGender: "Nam",
      studentState: "Đang học",
      studentOption: "Details",
    },
    {
      key: "10",
      studentMsv: "21A100100347",
      studentName: "Phạm Duy Trường",
      studentClass: "8",
      studentCourse: "K21",
      studentDob: "25/11/2003",
      studentGender: "Nam",
      studentState: "Tốt nghiệp",
      studentOption: "Details",
    },
  ]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    if (selectedRowKeys?.length > 0) {
      setSelectedRowKeys(
        newSelectedRowKeys?.filter((item) => item !== selectedRowKeys[0])
      );
    } else {
      setSelectedRowKeys(newSelectedRowKeys);
    }
  };
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleExportExcel = () => {
    const headers = [
      { header: "STT", key: "key" },
      { header: "Mã học sinh", key: "studentMsv" },
      { header: "Họ và Tên", key: "studentName" },
      { header: "Lớp", key: "studentClass" },
      { header: "Khóa", key: "studentCourse" },
      { header: "Ngày Sinh", key: "studentDob" },
      { header: "Giới Tính", key: "studentGender" },
      { header: "Trạng Thái", key: "studentState" },
      { header: "Chi Tiết", key: "studentOption" },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: headers.map((h) => h.key),
    });
    const workbook = XLSX.utils.book_new();
    headers.forEach((h, index) => {
      const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 });
      worksheet[cellAddress].v = h.header;
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, "StudentsList");
    XLSX.writeFile(workbook, "DanhSachSinhVien.xlsx");
  };
  useEffect(() => {
    const handleTableScroll = () => {
      if (tableWrapperRef.current && scrollRef.current) {
        scrollRef.current.scrollLeft = tableWrapperRef.current.scrollLeft;
      }
    };

    const handleDivScroll = () => {
      if (tableWrapperRef.current && scrollRef.current) {
        tableWrapperRef.current.scrollLeft = scrollRef.current.scrollLeft;
      }
    };

    if (tableWrapperRef.current && scrollRef.current) {
      tableWrapperRef.current.addEventListener("scroll", handleTableScroll);
      scrollRef.current.addEventListener("scroll", handleDivScroll);
    }
    return () => {
      if (tableWrapperRef.current && scrollRef.current) {
        tableWrapperRef.current.removeEventListener(
          "scroll",
          handleTableScroll
        );
        scrollRef.current.removeEventListener("scroll", handleDivScroll);
      }
    };
  }, []);

  return (
    <div className="list-student">
      <HeaderWeb name="QUẢN LÝ HỌC SINH" disAble={true} />
      <NotificationPopup
        message={notification?.message}
        type={notification?.type}
      />
      <div className="list-student_header">
        <h1 className="list-student_header-title">Danh sách học sinh</h1>
        <p className="list-student_header-sub">
          Trang này hiển thị thông tin liên quan đến thông tin học sinh{" "}
        </p>
      </div>
      <div className="list-student_content">
        <div className="list-student_sidebar" ref={scrollRef}>
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[16, 16]}
            className="list-student_sidebar-scroll"
          >
            <ColWrap
              colProps={{ span: 8 }}
              className="list-student_sidebar-colLeft"
            >
              <CustomSelectRadio
                options={classOption}
                onChange={() => {}}
                placeholder="Lớp"
                radioProps={{
                  rootClassName: "radio-colLeft-select",
                }}
                selectProps={{
                  popupClassName: "radio-popup",
                }}
              />
              <CustomSelectCheckbox
                options={stateOption}
                onChange={() => {}}
                placeholder="Trạng thái"
                footerDropdown={
                  <div className="list-student_sidebar-button">
                    <CustomButton
                      content="Hiển thị"
                      buttonProps={{
                        className: "width-40 height-24",
                        type: "primary",
                        onClick: () => {},
                      }}
                    />
                  </div>
                }
                selectProps={{
                  rootClassName: "list-student_sidebar-checkbox",
                  popupClassName: "checkbox-popup",
                }}
              />
            </ColWrap>
            <ColWrap
              colProps={{ span: 8 }}
              className="list-student_sidebar-colRight"
            >
              <FormWrap
                className="list-student_sidebar-colRight-formSearch"
                name="search-product"
                layout={"inline"}
                initialValues={{
                  select: "Dữ liệu",
                }}
                onFinish={() => {}}
              >
                <FormInputSearch
                  name={"fullrecordSearch"}
                  isShowIcon={false}
                  formItemProps={{
                    className: "list-student_sidebar-colRight-formSearch-input",
                  }}
                  inputProps={{
                    placeholder: "Mã học sinh",
                  }}
                />
                <FormButtonSubmit
                  content={<SvgMagnifyingGlassSubmit />}
                  formItemProps={{
                    className:
                      "list-student_sidebar-colRight-formSearch-button",
                  }}
                />
              </FormWrap>
            </ColWrap>
          </RowWrap>
        </div>
        <div className="list-student_table">
          <TableWrap
            setSize={() => {}}
            scrollValue={{ x: 1366 }}
            tableWidth={1416}
            rootClassName="list-student_table-wrap"
            tableWrapperRef={tableWrapperRef}
            tableProps={{
              columns: conlumns,
              dataSource: data,
              rowSelection: rowSelection,
            }}
          />
        </div>
        <div className="list-student_footer">
          {editState ? (
            <>
              <CustomButton
                content={"Chỉnh sửa"}
                buttonProps={{
                  icon: <EditOutlined />,
                  className: "list-student_footer-edit",
                  onClick: () => {
                    setEditState(false);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  },
                }}
              />
              <div className="option">
                <CustomButton
                  content={"In thông tin"}
                  buttonProps={{
                    icon: <PrinterOutlined />,
                    className: "list-student_footer-print",
                    onClick: () => {
                      window.print();
                    },
                  }}
                />
                <CustomButton
                  content="Xuất Excel"
                  buttonProps={{
                    className: "list-student_footer-excel",
                    icon: <FileExcelOutlined />,
                    onClick: handleExportExcel,
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="option">
                <CustomButton
                  content={"Thêm"}
                  buttonProps={{
                    icon: <AppstoreAddOutlined />,
                    className: "list-student_footer-add",
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
                    className: "list-student_footer-editTable",
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
                    className: "list-student_footer-delete",
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
              <CustomButton
                content={"Lưu"}
                buttonProps={{
                  icon: <SaveOutlined />,
                  className: "list-student_footer-save",
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
        <div className="list-student_modal-popup">
          {/* Modal Add */}
          <Modal
            className="list-student_modal-add"
            open={modalStates.addModal}
            onCancel={() => {
              setModalStates({
                ...modalStates,
                addModal: false,
              });
            }}
            onOk={() => {
              setModalStates({
                ...modalStates,
                addModal: false,
                addStudent: true,
              });
            }}
          >
            <h1 className="list-student_modal-header">
              Bạn muốn thêm một học sinh?
            </h1>
            <div className="list-student_underLine" />
          </Modal>
          {/* Modal Delete */}
          <Modal
            className="list-student_modal-delete"
            open={modalStates.deleteModal}
            onCancel={() => {
              setModalStates({
                ...modalStates,
                showDeleteButton: true,
                deleteModal: false,
              });
            }}
            onOk={() => {}}
          >
            <h1 className="list-student_modal-header">
              Bạn muốn xóa học sinh này ?
            </h1>
            <div className="list-student_underLine" />
          </Modal>
          {/* Modal Edit */}
          <Modal
            className="list-student_modal-edit"
            open={modalStates.editModal}
            onCancel={() => {
              setModalStates({
                ...modalStates,
                editModal: false,
                showEditButton: true,
              });
            }}
            onOk={() => {
              setModalStates({
                ...modalStates,
                showEditstudent: true,
                editModal: false,
              });
            }}
          >
            <h1 className="list-student_modal-header">
              Bạn muốn sửa thông tin học sinh này ?
            </h1>
            <div className="list-student_underLine" />
          </Modal>
          {/* Modal Add Student */}
          <Modal
            className="list-student_modal-addStudent"
            open={modalStates.addStudent}
            onCancel={() => {
              setModalStates({
                ...modalStates,
                addStudent: false,
              });
            }}
            onOk={() => {
              if (
                form.getFieldValue("studentMsv") &&
                form.getFieldValue("studentName") &&
                form.getFieldValue("studentClass") &&
                form.getFieldValue("studentCourse") &&
                form.getFieldValue("studentDob") &&
                form.getFieldValue("studentGender") &&
                form.getFieldValue("studentState")
              ) {
                const newData = {
                  key: data.length + 1,
                  studentMsv: form.getFieldValue("studentMsv"),
                  studentName: form.getFieldValue("studentName"),
                  studentClass: form.getFieldValue("studentClass"),
                  studentCourse: form.getFieldValue("studentCourse"),
                  studentDob: form.getFieldValue("studentDob"),
                  studentGender: form.getFieldValue("studentGender"),
                  studentState: form.getFieldValue("studentState"),
                };
                setNewData([...data, newData]);
                setModalStates({
                  ...modalStates,
                  addStudent: false,
                });
              } else {
                setNotification({
                  message: "Vui lòng điền đầy đủ dữ liệu",
                  type: "error",
                });
              }
            }}
            afterClose={() => {
              form.setFieldValue("studentMsv", "");
              form.setFieldValue("studentName", "");
              form.setFieldValue("studentClass", "");
              form.setFieldValue("studentCourse", "");
              form.setFieldValue("studentDob", "");
              form.setFieldValue("studentGender", "");
              form.setFieldValue("studentState", "");
            }}
          >
            <h1 className="list-student_modal-header">THÊM HỌC SINH</h1>
            <div className="list-student_underLine" />
            <div className="list-student_modal-addStudent-content">
              <FormWrap form={form} className="list-student_form">
                {/* Hàng 1 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[8, 8]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 16 }}>
                    <p className="list-student_row-label">HỌ VÀ TÊN</p>
                    <FormInput
                      name={"studentName"}
                      formItemProps={{
                        className: "list-student_form-studentName",
                      }}
                      inputProps={{
                        placeholder: "HỌ VÀ TÊN",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                {/* Hàng 2 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ HỌC SINH</p>
                    <FormInput
                      name={"studentMsv"}
                      formItemProps={{
                        className: "list-student_form-studentClass",
                      }}
                      inputProps={{
                        placeholder: "MÃ HỌC SINH",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">TRẠNG THÁI</p>
                    <FormSelect
                      name={"studentState"}
                      formItemProps={{
                        className: "list-student_form-studentMsv",
                      }}
                      placeholder="TRẠNG THÁI"
                      selectProps={{
                        options: option,
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                {/* Hàng 3 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">LỚP</p>
                    <FormInput
                      name={"studentClass"}
                      formItemProps={{
                        className: "list-student_form-studentID",
                      }}
                      inputProps={{
                        placeholder: "LỚP",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">KHÓA</p>
                    <FormInput
                      name={"studentCourse"}
                      formItemProps={{
                        className: "list-student_form-studentDob",
                      }}
                      inputProps={{
                        placeholder: "Lịch học",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                {/* Hàng 4 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_row-modal"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">NGÀY SINH</p>
                    <FormInput
                      name={"studentDob"}
                      formItemProps={{
                        className: "list-student_form-studentEmail",
                      }}
                      inputProps={{
                        placeholder: "NGÀY SINH",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">GIỚI TÍNH</p>
                    <FormInput
                      name={"studentGender"}
                      formItemProps={{
                        className: "list-student_form-studentNumber",
                      }}
                      inputProps={{
                        placeholder: "Phòng học",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
              </FormWrap>

              <div className="list-student_underLine" />
            </div>
          </Modal>
          {/* Modal Edit student */}
          <Modal
            className="list-student_modal-editStudent"
            open={modalStates.showEditstudent}
            onCancel={() => {
              setModalStates({
                ...modalStates,
                showEditstudent: false,
              });
            }}
          >
            <h1 className="list-student_modal-header">
              SỬA THÔNG TIN HỌC SINH
            </h1>
            <div className="list-student_underLine" />
            <div className="list-student_modal-addStudent-content">
              <FormWrap form={form} className="list-student_form">
                {/* Hàng 1 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[8, 8]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 16 }}>
                    <p className="list-student_row-label">HỌ VÀ TÊN</p>
                    <FormInput
                      name={"studentName"}
                      formItemProps={{
                        className: "list-student_form-studentName",
                      }}
                      inputProps={{
                        placeholder: "HỌ VÀ TÊN",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                {/* Hàng 2 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ HỌC SINH</p>
                    <FormInput
                      name={"studentMsv"}
                      formItemProps={{
                        className: "list-student_form-studentClass",
                      }}
                      inputProps={{
                        placeholder: "MÃ HỌC SINH",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">TRẠNG THÁI</p>
                    <FormSelect
                      name={"studentState"}
                      formItemProps={{
                        className: "list-student_form-studentMsv",
                      }}
                      placeholder="TRẠNG THÁI"
                      selectProps={{
                        options: option,
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                {/* Hàng 3 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">LỚP</p>
                    <FormInput
                      name={"studentClass"}
                      formItemProps={{
                        className: "list-student_form-studentID",
                      }}
                      inputProps={{
                        placeholder: "LỚP",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">KHÓA</p>
                    <FormInput
                      name={"studentCourse"}
                      formItemProps={{
                        className: "list-student_form-studentDob",
                      }}
                      inputProps={{
                        placeholder: "Lịch học",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                {/* Hàng 4 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_row-modal"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">NGÀY SINH</p>
                    <FormInput
                      name={"studentDob"}
                      formItemProps={{
                        className: "list-student_form-studentEmail",
                      }}
                      inputProps={{
                        placeholder: "NGÀY SINH",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">GIỚI TÍNH</p>
                    <FormInput
                      name={"studentGender"}
                      formItemProps={{
                        className: "list-student_form-studentNumber",
                      }}
                      inputProps={{
                        placeholder: "Phòng học",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
              </FormWrap>
              <div className="list-student_underLine" />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
