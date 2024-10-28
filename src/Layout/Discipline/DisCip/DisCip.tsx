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
import { faCircleInfo, faSort } from "@fortawesome/free-solid-svg-icons";
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

enum DisCipChoosen {
  MP001 = "Cảnh cáo",
  MP002 = "Khiển trách",
  MP003 = "Phạt tiền",
  MP004 = "Tạm đình chỉ học",
  MP005 = "Đuổi học",
  MP006 = "Cảnh cáo trước toàn trường",
  MP007 = "Phạt lao động công ích",
  MP008 = "Phạt viết bản kiểm điểm",
}
enum DisCipLevel {
  MILD = "Nhẹ",
  MODERATE = "Trung bình",
  SEVERE = "Nặng",
  VERY_SEVERE = "Rất nặng",
}
enum classSelector {
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
}
enum classCodeSelector {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}
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
      { header: "MÃ HÌNH PHẠT", key: "hinhthucxuphat" },
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
  const DisCipOption = Object.values(DisCipChoosen).map((major) => ({
    label: major,
    value: major,
  }));
  const classOption = Object.values(classSelector).map((major) => ({
    label: major,
    value: major,
  }));
  const classCodeOption = Object.values(classCodeSelector).map((major) => ({
    label: major,
    value: major,
  }));
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
      title: "HÌNH THỨC XỬ PHẠT",
      dataIndex: "hinhthucxuphat",
      key: "hinhthucxuphat",
      render: (record) => {
        return (
          <>
            <p className="discip_data-hinhthucxuphat">{record}</p>
          </>
        );
      },
      filterIcon: <FontAwesomeIcon icon={faSort} />,
      filters: DisCipOption,
      onFilter: (value, record) => record.hinhthucxuphat.includes(value),
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
      id: "lop",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.lop}</p>;
      },
      filterIcon: <FontAwesomeIcon icon={faSort} />,
      filters: classOption,
      onFilter: (value, record) => record.lop.includes(value), // Updated to use 'lop'
    },
    {
      title: "MÃ LỚP",
      dataIndex: "malop",
      id: "malop",
      render: (_text, record, index) => {
        return <p className="list-tuition_table-data">{record.malop}</p>;
      },
      filterIcon: <FontAwesomeIcon icon={faSort} />,
      filters: classCodeOption,
      onFilter: (value, record) => record.malop.includes(value),
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
      hinhthucxuphat: "MP001",
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
      hinhthucxuphat: "MP002",
      tenhinhphat: "Hình phạt 2",
      hocsinhvipham: "Trần Thị B",
      mahocsinh: "HS002",
      lop: "10A2",
      malop: "L002",
      giatrihinhphat: "Khiển trách",
      thoigian: "2023-10-02",
      lydo: "Không làm bài tập",
    },
    {
      id: 3,
      hinhthucxuphat: "MP003",
      tenhinhphat: "Hình phạt 3",
      hocsinhvipham: "Lê Văn C",
      mahocsinh: "HS003",
      lop: "10A3",
      malop: "L003",
      giatrihinhphat: "Cảnh cáo",
      thoigian: "2023-10-03",
      lydo: "Nói chuyện riêng",
    },
    {
      id: 4,
      hinhthucxuphat: "MP004",
      tenhinhphat: "Hình phạt 4",
      hocsinhvipham: "Phạm Thị D",
      mahocsinh: "HS004",
      lop: "10A4",
      malop: "L004",
      giatrihinhphat: "Khiển trách",
      thoigian: "2023-10-04",
      lydo: "Không mặc đồng phục",
    },
    {
      id: 5,
      hinhthucxuphat: "MP005",
      tenhinhphat: "Hình phạt 5",
      hocsinhvipham: "Trần Văn E",
      mahocsinh: "HS005",
      lop: "10A5",
      malop: "L005",
      giatrihinhphat: "Cảnh cáo",
      thoigian: "2023-10-05",
      lydo: "Không làm bài tập",
    },
    {
      id: 6,
      hinhthucxuphat: "MP006",
      tenhinhphat: "Hình phạt 6",
      hocsinhvipham: "Nguyễn Thị F",
      mahocsinh: "HS006",
      lop: "10A6",
      malop: "L006",
      giatrihinhphat: "Khiển trách",
      thoigian: "2023-10-06",
      lydo: "Đi học muộn",
    },
    {
      id: 7,
      hinhthucxuphat: "MP007",
      tenhinhphat: "Hình phạt 7",
      hocsinhvipham: "Lê Văn G",
      mahocsinh: "HS007",
      lop: "10A7",
      malop: "L007",
      giatrihinhphat: "Cảnh cáo",
      thoigian: "2023-10-07",
      lydo: "Nói chuyện riêng",
    },
    {
      id: 8,
      hinhthucxuphat: "MP008",
      tenhinhphat: "Hình phạt 8",
      hocsinhvipham: "Phạm Thị H",
      mahocsinh: "HS008",
      lop: "10A8",
      malop: "L008",
      giatrihinhphat: "Khiển trách",
      thoigian: "2023-10-08",
      lydo: "Không mặc đồng phục",
    },
    {
      id: 9,
      hinhthucxuphat: "MP009",
      tenhinhphat: "Hình phạt 9",
      hocsinhvipham: "Trần Văn I",
      mahocsinh: "HS009",
      lop: "10A9",
      malop: "L009",
      giatrihinhphat: "Cảnh cáo",
      thoigian: "2023-10-09",
      lydo: "Không làm bài tập",
    },
    {
      id: 10,
      hinhthucxuphat: "MP010",
      tenhinhphat: "Hình phạt 10",
      hocsinhvipham: "Nguy���n Thị J",
      mahocsinh: "HS010",
      lop: "10A10",
      malop: "L010",
      giatrihinhphat: "Khiển trách",
      thoigian: "2023-10-10",
      lydo: "Đi học muộn",
    },
    {
      id: 11,
      hinhthucxuphat: "MP011",
      tenhinhphat: "Hình phạt 11",
      hocsinhvipham: "Lê Văn K",
      mahocsinh: "HS011",
      lop: "10A11",
      malop: "L011",
      giatrihinhphat: "Cảnh cáo",
      thoigian: "2023-10-11",
      lydo: "Nói chuyện riêng",
    },
    {
      id: 12,
      hinhthucxuphat: "MP012",
      tenhinhphat: "Hình phạt 12",
      hocsinhvipham: "Phạm Thị L",
      mahocsinh: "HS012",
      lop: "10A12",
      malop: "L012",
      giatrihinhphat: "Khiển trách",
      thoigian: "2023-10-12",
      lydo: "Không mặc đồng phục",
    },
    {
      id: 13,
      hinhthucxuphat: "MP013",
      tenhinhphat: "Hình phạt 13",
      hocsinhvipham: "Trần Văn M",
      mahocsinh: "HS013",
      lop: "10A13",
      malop: "L013",
      giatrihinhphat: "Cảnh cáo",
      thoigian: "2023-10-13",
      lydo: "Không làm bài tập",
    },
    {
      id: 14,
      hinhthucxuphat: "MP014",
      tenhinhphat: "Hình phạt 14",
      hocsinhvipham: "Nguyễn Thị N",
      mahocsinh: "HS014",
      lop: "10A14",
      malop: "L014",
      giatrihinhphat: "Khiển trách",
      thoigian: "2023-10-14",
      lydo: "Đi học muộn",
    },
    {
      id: 15,
      hinhthucxuphat: "MP015",
      tenhinhphat: "Hình phạt 15",
      hocsinhvipham: "Lê Văn O",
      mahocsinh: "HS015",
      lop: "10A15",
      malop: "L015",
      giatrihinhphat: "Cảnh cáo",
      thoigian: "2023-10-15",
      lydo: "Nói chuyện riêng",
    },
    {
      id: 16,
      hinhthucxuphat: "MP016",
      tenhinhphat: "Hình phạt 16",
      hocsinhvipham: "Phạm Thị P",
      mahocsinh: "HS016",
      lop: "10A16",
      malop: "L016",
      giatrihinhphat: "Khiển trách",
      thoigian: "2023-10-16",
      lydo: "Không mặc đồng phục",
    },
    {
      id: 17,
      hinhthucxuphat: "MP017",
      tenhinhphat: "Hình phạt 17",
      hocsinhvipham: "Trần Văn Q",
      mahocsinh: "HS017",
      lop: "10A17",
      malop: "L017",
      giatrihinhphat: "Cảnh cáo",
      thoigian: "2023-10-17",
      lydo: "Không làm bài tập",
    },
    {
      id: 18,
      hinhthucxuphat: "MP018",
      tenhinhphat: "Hình phạt 18",
      hocsinhvipham: "Nguyễn Thị R",
      mahocsinh: "HS018",
      lop: "10A18",
      malop: "L018",
      giatrihinhphat: "Khiển trách",
      thoigian: "2023-10-18",
      lydo: "Đi học muộn",
    },
    {
      id: 19,
      hinhthucxuphat: "MP019",
      tenhinhphat: "Hình phạt 19",
      hocsinhvipham: "Lê Văn S",
      mahocsinh: "HS019",
      lop: "10A19",
      malop: "L019",
      giatrihinhphat: "Cảnh cáo",
      thoigian: "2023-10-19",
      lydo: "Nói chuyện riêng",
    },
    {
      id: 20,
      hinhthucxuphat: "MP020",
      tenhinhphat: "Hình phạt 20",
      hocsinhvipham: "Phạm Thị T",
      mahocsinh: "HS020",
      lop: "10A20",
      malop: "L020",
      giatrihinhphat: "Khiển trách",
      thoigian: "2023-10-20",
      lydo: "Không mặc đồng phục",
    },
    {
      id: 21,
      hinhthucxuphat: "MP021",
      tenhinhphat: "Hình phạt 21",
      hocsinhvipham: "Trần Văn U",
      mahocsinh: "HS021",
      lop: "10A21",
      malop: "L021",
      giatrihinhphat: "Cảnh cáo",
      thoigian: "2023-10-21",
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
                filters: column.filters?.map((filter) => ({
                  ...filter,
                  text: filter.label,
                })),
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
                form.getFieldValue("hinhthucxuphat") &&
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
                  hinhthucxuphat: form.getFieldValue("hinhthucxuphat"),
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
                      name={"hinhthucxuphat"}
                      formItemProps={{
                        className: "list-student_form-hinhthucxuphat",
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
                form.getFieldValue("hinhthucxuphat") &&
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
                  hinhthucxuphat: form.getFieldValue("hinhthucxuphat"),
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
                      name={"hinhthucxuphat"}
                      formItemProps={{
                        className: "list-student_form-hinhthucxuphat",
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
