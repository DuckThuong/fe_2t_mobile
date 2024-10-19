import { useEffect, useRef, useState } from "react";
import { SvgMagnifyingGlassSubmit } from "../../../Components/@svg/SvgMagnifyingGlassSubmit";
import { FormButtonSubmit } from "../../../Components/Form/FormButtonSubmit";
import { FormInputSearch } from "../../../Components/Form/FormInputSearch";
import FormWrap from "../../../Components/Form/FormWrap";
import RowWrap from "../../../Components/RowWrap";
import TableWrap from "../../../Components/TableWrap";
import { TableRowSelection } from "antd/es/table/interface";
import { CustomButton } from "../../../Components/buttons/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { CUSTOMER_ROUTER_PATH } from "../../../Routers/Routers";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import StudentFooterActions from "../../FooterWeb";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./DisCip.scss";
import { useForm } from "antd/es/form/Form";
import ColWrap from "../../../Components/ColWrap";
import { FormInput } from "../../../Components/Form/FormInput";
import { Modal } from "antd";
import NotificationPopup from "../../Notification";
export const DisCip = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [form] = useForm();
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const navigate = useNavigate();
  const [editState, setEditState] = useState<boolean>(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const handleExportExcel = () => {
    const selectedData = data.filter((item) =>
      selectedRowKeys.includes(item.id)
    );

    const headers = [
      { header: "STT", key: "id" },
      { header: "MÃ HÌNH PHẠT", key: "mahinhphat" },
      { header: "TÊN HÌNH PHẠT", key: "tenhinhphat" },
      { header: "HỌC SINH VI PHẠM", key: "hocsinhvipham" },
      { header: "MÃ HỌC SINH", key: "mahocsinh" },
      { header: "LỚP", key: "lop" },
      { header: "MÃ LỚP", key: "malop" },
      { header: "MỨC ĐỘ XỬ PHẠT", key: "giatrihinhphat" },
      { header: "THỜI GIAN XỬ PHẠT", key: "thoigian" },
      { header: "LÝ DO XỬ PHẠT", key: "lydo" },
    ];
    const worksheet = XLSX.utils.json_to_sheet(selectedData, {
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
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const conlumns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => {
        return <p style={{ color: "black", fontWeight: "600" }}>{record.id}</p>;
      },
    },
    {
      title: "MÃ XỬ PHẠT",
      dataIndex: "mahinhphat",
      key: "mahinhphat",
      render: (record) => {
        return (
          <>
            <p className="discip_data-mahinhphat">{record}</p>
          </>
        );
      },
    },
    {
      title: "TÊN HÌNH PHẠT",
      dataIndex: "tenhinhphat",
      key: "tenhinhphat",
      render: (record) => {
        return (
          <>
            <p className="discip_data-tenhinhphat">{record}</p>
          </>
        );
      },
    },
    {
      title: "HỌC SINH VI PHẠM",
      dataIndex: "hocsinhvipham",
      key: "hocsinhvipham",
      render: (record) => {
        return (
          <>
            <p className="discip_data-hocsinhvipham">{record}</p>
          </>
        );
      },
    },
    {
      title: "MÃ HỌC SINH",
      dataIndex: "mahocsinh",
      key: "mahocsinh",
      render: (record) => {
        return (
          <>
            <p className="discip_data-mahocsinh">{record}</p>
          </>
        );
      },
    },
    {
      title: "LỚP",
      dataIndex: "lop",
      key: "lop",
      render: (record) => {
        return (
          <>
            <p className="discip_data-mahocsinh">{record}</p>
          </>
        );
      },
    },
    {
      title: "MÃ LỚP",
      dataIndex: "malop",
      key: "malop",
      render: (record) => {
        return (
          <>
            <p className="discip_data-mahocsinh">{record}</p>
          </>
        );
      },
    },
    {
      title: "MỨC ĐỘ XỬ PHẠT",
      dataIndex: "giatrihinhphat",
      key: "giatrihinhphat",
      render: (record) => {
        return (
          <>
            <p className="discip_data-mahocsinh">{record}</p>
          </>
        );
      },
    },
    {
      title: "THỜI GIAN XỬ PHẠT",
      dataIndex: "thoigian",
      key: "thoigian",
      render: (record) => {
        return (
          <>
            <p className="discip_data-mahocsinh">{record}</p>
          </>
        );
      },
    },
    {
      title: "LÝ DO XỬ PHẠT",
      dataIndex: "lydo",
      key: "lydo",
      render: (record) => {
        return (
          <>
            <p className="discip_data-mahocsinh">{record}</p>
          </>
        );
      },
    },
    {
      title: "CHÚ THÍCH",
      dataIndex: "lydo",
      key: "lydo",
      render: (record) => {
        return (
          <>
            <CustomButton
              content="Chi tiết"
              buttonProps={{
                className: "list-student_data-studentOption",
                icon: <FontAwesomeIcon icon={faCircleInfo} />,
                disabled: !editState,
                onClick: () => {
                  navigate(CUSTOMER_ROUTER_PATH.DISCIP_INFORMATION);
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
      render: (text, record) => {
        return (
          <>
            {modalStates.showEditButton && (
              <CustomButton
                content="Sửa"
                buttonProps={{
                  onClick: () => {
                    setSelectedRecord(record);
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
      id: 1,
      mahinhphat: "MP001",
      tenhinhphat: "Hình phạt 1",
      hocsinhvipham: "Nguyễn Văn A",
      mahocsinh: "HS001",
      lop: "10A1",
      malop: "L001",
      giatrihinhphat: "Cảnh cáo",
      thoigian: "2023-10-01",
      lydo: "Đi học muộn",
    },
    {
      id: 2,
      mahinhphat: "MP002",
      tenhinhphat: "Hình phạt 2",
      hocsinhvipham: "Trần Thị B",
      mahocsinh: "HS002",
      lop: "10A2",
      malop: "L002",
      giatrihinhphat: "Khiển trách",
      thoigian: "2023-10-02",
      lydo: "Không làm bài tập",
    },
  ]);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        tableWrapperRef.current.removeEventListener(
          "scroll",
          handleTableScroll
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scrollRef.current.removeEventListener("scroll", handleDivScroll);
      }
    };
  }, []);
  useEffect(() => {
    if (selectedRecord) {
      const fields = conlumns.reduce((acc, column) => {
        if (column.dataIndex) {
          acc[column.dataIndex] = selectedRecord[column.dataIndex];
        }
        return acc;
      }, {});
      form.setFieldsValue(fields);
    }
  }, [selectedRecord, form, conlumns]);
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="discip">
      <NotificationPopup
        message={notification?.message}
        type={notification?.type}
      />
      <div className="discip_content">
        <div className="discip_sidebar" ref={scrollRef}>
          <h1 className="discip_content-header">
            Danh sách học sinh bị kỷ luật
          </h1>
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[16, 16]}
            className="discip_sidebar-scroll"
          >
            <FormWrap
              className="discip_sidebar-colRight-formSearch"
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
                  className: "discip_sidebar-colRight-formSearch-input",
                }}
                inputProps={{
                  placeholder: "Mã học sinh",
                }}
              />
              <FormButtonSubmit
                content={<SvgMagnifyingGlassSubmit />}
                formItemProps={{
                  className: "discip_sidebar-colRight-formSearch-button",
                }}
              />
            </FormWrap>
          </RowWrap>
        </div>
        <div className="discip_table">
          <TableWrap
            setSize={() => {}}
            scrollValue={{ x: 1366 }}
            tableWidth={1416}
            rootClassName="list-student_table-wrap"
            tableWrapperRef={tableWrapperRef}
            tableProps={{
              columns: conlumns.map((column) => ({
                ...column,
                // filters: column.filters?.map((filter) => ({
                //   ...filter,
                //   text: filter.label,
                // })),
              })),
              dataSource: data,
              rowSelection: rowSelection,
            }}
          />
        </div>
        <div className="discip_footer">
          <StudentFooterActions
            editState={editState}
            setEditState={setEditState}
            modalStates={modalStates}
            setModalStates={setModalStates}
            handleExportExcel={handleExportExcel}
            disAble={!hasSelected}
            shouldScroll={false}
            isPrint={true}
            isShowOption={true}
            isExport={true}
            add={true}
          />
        </div>
        <div className="reward_modal">
          {/* Modal Add Student */}
          <Modal
            className="list-student_modal-addStudent"
            open={modalStates.addModal}
            onCancel={() => {
              setModalStates({
                ...modalStates,
                addModal: false,
              });
            }}
            onOk={() => {
              if (
                form.getFieldValue("mahinhphat") &&
                form.getFieldValue("tenhinhphat") &&
                form.getFieldValue("hocsinhvipham") &&
                form.getFieldValue("mahocsinh") &&
                form.getFieldValue("lop") &&
                form.getFieldValue("malop") &&
                form.getFieldValue("giatrihinhphat") &&
                form.getFieldValue("thoigian") &&
                form.getFieldValue("lydo")
              ) {
                const newData = {
                  id: data.length + 1,
                  mahinhphat: form.getFieldValue("mahinhphat"),
                  tenhinhphat: form.getFieldValue("tenhinhphat"),
                  hocsinhvipham: form.getFieldValue("hocsinhvipham"),
                  mahocsinh: form.getFieldValue("mahocsinh"),
                  lop: form.getFieldValue("lop"),
                  malop: form.getFieldValue("malop"),
                  giatrihinhphat: form.getFieldValue("giatrihinhphat"),
                  thoigian: form.getFieldValue("thoigian"),
                  lydo: form.getFieldValue("lydo"),
                };
                setNewData([...data, newData]);
                setModalStates({
                  ...modalStates,
                  addModal: false,
                });
              } else {
                setNotification({
                  message: "Vui lòng điền đầy đủ dữ liệu",
                  type: "error",
                });
              }
            }}
            afterClose={() => {
              form.resetFields();
            }}
          >
            <h1 className="list-student_modal-header">THÊM HÌNH PHẠT</h1>
            <div className="list-student_underLine" />
            <div className="list-student_modal-addStudent-content">
              <FormWrap form={form} className="list-student_form">
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[8, 8]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ HÌNH PHẠT</p>
                    <FormInput
                      name={"mahinhphat"}
                      formItemProps={{
                        className: "list-student_form-mahinhphat",
                      }}
                      inputProps={{
                        placeholder: "Mã hình phạt",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">TÊN HÌNH PHẠT</p>
                    <FormInput
                      name={"tenhinhphat"}
                      formItemProps={{
                        className: "list-student_form-tenhinhphat",
                      }}
                      inputProps={{
                        placeholder: "Tên hình phạt",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">HỌC SINH VI PHẠM</p>
                    <FormInput
                      name={"hocsinhvipham"}
                      formItemProps={{
                        className: "list-student_form-hocsinhvipham",
                      }}
                      inputProps={{
                        placeholder: "Học sinh vi phạm",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ HỌC SINH</p>
                    <FormInput
                      name={"mahocsinh"}
                      formItemProps={{
                        className: "list-student_form-mahocsinh",
                      }}
                      inputProps={{
                        placeholder: "Mã học sinh",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
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
                      name={"lop"}
                      formItemProps={{
                        className: "list-student_form-lop",
                      }}
                      inputProps={{
                        placeholder: "Lớp",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ LỚP</p>
                    <FormInput
                      name={"malop"}
                      formItemProps={{
                        className: "list-student_form-malop",
                      }}
                      inputProps={{
                        placeholder: "Mã lớp",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MỨC ĐỘ XỬ PHẠT</p>
                    <FormInput
                      name={"giatrihinhphat"}
                      formItemProps={{
                        className: "list-student_form-giatrihinhphat",
                      }}
                      inputProps={{
                        placeholder: "Mức độ xử phạt",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">THỜI GIAN XỬ PHẠT</p>
                    <FormInput
                      name={"thoigian"}
                      formItemProps={{
                        className: "list-student_form-thoigian",
                      }}
                      inputProps={{
                        placeholder: "Thời gian xử phạt",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 24 }}>
                    <p className="list-student_row-label">LÝ DO XỬ PHẠT</p>
                    <FormInput
                      name={"lydo"}
                      formItemProps={{
                        className: "list-student_form-lydo",
                      }}
                      inputProps={{
                        placeholder: "Lý do xử phạt",
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
            open={modalStates.editModal}
            onCancel={() => {
              setModalStates({
                ...modalStates,
                editModal: false,
              });
            }}
            onOk={() => {
              if (
                form.getFieldValue("mahinhphat") &&
                form.getFieldValue("tenhinhphat") &&
                form.getFieldValue("hocsinhvipham") &&
                form.getFieldValue("mahocsinh") &&
                form.getFieldValue("lop") &&
                form.getFieldValue("malop") &&
                form.getFieldValue("giatrihinhphat") &&
                form.getFieldValue("thoigian") &&
                form.getFieldValue("lydo")
              ) {
                const updatedRecord = {
                  ...selectedRecord,
                  mahinhphat: form.getFieldValue("mahinhphat"),
                  tenhinhphat: form.getFieldValue("tenhinhphat"),
                  hocsinhvipham: form.getFieldValue("hocsinhvipham"),
                  mahocsinh: form.getFieldValue("mahocsinh"),
                  lop: form.getFieldValue("lop"),
                  malop: form.getFieldValue("malop"),
                  giatrihinhphat: form.getFieldValue("giatrihinhphat"),
                  thoigian: form.getFieldValue("thoigian"),
                  lydo: form.getFieldValue("lydo"),
                };

                setNewData(
                  data.map((record) =>
                    record.id === selectedRecord.id ? updatedRecord : record
                  )
                );
                setModalStates({
                  ...modalStates,
                  editModal: false,
                });
              } else {
                setNotification({
                  message: "Vui lòng điền đầy đủ dữ liệu",
                  type: "error",
                });
              }
            }}
            afterClose={() => {
              form.resetFields();
            }}
          >
            <h1 className="list-student_modal-header">
              SỬA THÔNG TIN HÌNH PHẠT
            </h1>
            <div className="list-student_underLine" />
            <div className="list-student_modal-addStudent-content">
              <FormWrap form={form} className="list-student_form">
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[8, 8]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ HÌNH PHẠT</p>
                    <FormInput
                      name={"mahinhphat"}
                      formItemProps={{
                        className: "list-student_form-mahinhphat",
                      }}
                      inputProps={{
                        placeholder: "Mã hình phạt",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">TÊN HÌNH PHẠT</p>
                    <FormInput
                      name={"tenhinhphat"}
                      formItemProps={{
                        className: "list-student_form-tenhinhphat",
                      }}
                      inputProps={{
                        placeholder: "Tên hình phạt",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">HỌC SINH VI PHẠM</p>
                    <FormInput
                      name={"hocsinhvipham"}
                      formItemProps={{
                        className: "list-student_form-hocsinhvipham",
                      }}
                      inputProps={{
                        placeholder: "Học sinh vi phạm",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ HỌC SINH</p>
                    <FormInput
                      name={"mahocsinh"}
                      formItemProps={{
                        className: "list-student_form-mahocsinh",
                      }}
                      inputProps={{
                        placeholder: "Mã học sinh",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
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
                      name={"lop"}
                      formItemProps={{
                        className: "list-student_form-lop",
                      }}
                      inputProps={{
                        placeholder: "Lớp",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MÃ LỚP</p>
                    <FormInput
                      name={"malop"}
                      formItemProps={{
                        className: "list-student_form-malop",
                      }}
                      inputProps={{
                        placeholder: "Mã lớp",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">MỨC ĐỘ XỬ PHẠT</p>
                    <FormInput
                      name={"giatrihinhphat"}
                      formItemProps={{
                        className: "list-student_form-giatrihinhphat",
                      }}
                      inputProps={{
                        placeholder: "Mức độ xử phạt",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="list-student_row-label">THỜI GIAN XỬ PHẠT</p>
                    <FormInput
                      name={"thoigian"}
                      formItemProps={{
                        className: "list-student_form-thoigian",
                      }}
                      inputProps={{
                        placeholder: "Thời gian xử phạt",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[12, 12]}
                  className="list-student_modal-row"
                >
                  <ColWrap colProps={{ span: 24 }}>
                    <p className="list-student_row-label">LÝ DO XỬ PHẠT</p>
                    <FormInput
                      name={"lydo"}
                      formItemProps={{
                        className: "list-student_form-lydo",
                      }}
                      inputProps={{
                        placeholder: "Lý do xử phạt",
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
