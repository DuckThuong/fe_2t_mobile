import { useEffect, useRef, useState } from "react";
import { HeaderWeb } from "../../HeaderWeb";
import NotificationPopup from "../../Notification";
import { SvgMagnifyingGlassSubmit } from "../../../Components/@svg/SvgMagnifyingGlassSubmit";
import { FormButtonSubmit } from "../../../Components/Form/FormButtonSubmit";
import FormWrap from "../../../Components/Form/FormWrap";
import { FormInputSearch } from "../../../Components/Form/FormInputSearch";
import TableWrap from "../../../Components/TableWrap";
import { CustomButton } from "../../../Components/buttons/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../../Routers/Routers";
import "./listTuition.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import RowWrap from "../../../Components/RowWrap";
import { Modal } from "antd";
import ColWrap from "../../../Components/ColWrap";
import { FormInput } from "../../../Components/Form/FormInput";
import * as XLSX from "xlsx";
import StudentFooterActions from "./../../FooterWeb/index";
import { TableRowSelection } from "antd/es/table/interface";
export const ListTuition = () => {
  const [editState, setEditState] = useState<boolean>(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate();
  const [form] = useForm();
  const scrollRef = useRef<HTMLDivElement>(null);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<any>();
  const [studentCode, setStudentCode] = useState<any>();
  const [studentClass, setStudentClass] = useState<any>();
  const [course, setCourse] = useState<any>();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [modalStates, setModalStates] = useState({
    editModal: false,
    deleteModal: false,
    addModal: false,
    addtuition: false,
    showDeleteButton: false,
    showEditButton: false,
    showNewColumn: false,
    showRegistedNewColumn: false,
    showEdittuition: false,
  });
  const column = [
    {
      title: "STT",
      dataIndex: "stt",
      id: "stt",
      render: (text, record, index) => {
        return (
          <p style={{ color: "black", fontWeight: "600" }}>{record.stt}</p>
        );
      },
    },
    {
      title: "MÃ HỌC SINH",
      dataIndex: "msv",
      id: "msv",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.msv}</p>;
      },
    },
    {
      title: "HỌ VÀ TÊN",
      dataIndex: "htv",
      id: "htv",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.htv}</p>;
      },
    },
    {
      title: "KHÓA",
      dataIndex: "khoa",
      id: "khoa",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.khoa}</p>;
      },
    },
    {
      title: "LỚP",
      dataIndex: "lop",
      id: "lop",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.lop}</p>;
      },
    },
    {
      title: "MÃ LỚP",
      dataIndex: "malop",
      id: "malop",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.malop}</p>;
      },
    },
    {
      title: "HỌC KÌ",
      dataIndex: "hocki",
      id: "hocki",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.hocki}</p>;
      },
    },
    {
      title: "SỐ MÔN HỌC",
      dataIndex: "smh",
      id: "smh",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.smh}</p>;
      },
    },
    {
      title: "SỐ TIỀN PHẢI NỘP",
      dataIndex: "tpn",
      id: "tpn",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.tpn}</p>;
      },
    },
    {
      title: "SỐ TIỀN ĐÃ NỘP",
      dataIndex: "tdn",
      id: "tdn",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.tdn}</p>;
      },
    },
    {
      title: "SỐ TIỀN HOÀN TRẢ",
      dataIndex: "tht",
      id: "tht",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.tht}</p>;
      },
    },
    {
      title: "SỐ TIỀN THIẾU/THỪA",
      dataIndex: "tienthieu",
      id: "tienthieu",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.tienthieu}</p>;
      },
    },
    {
      title: "TỔNG CỘNG",
      dataIndex: "tongcong",
      id: "tongcong",
      render: (text, record, index) => {
        return <p className="list-tuition_data-sum">{record.tongcong}</p>;
      },
    },
    {
      title: "CHI TIẾT",
      dataIndex: "tuitionOption",
      id: "tuitionOption",
      render: () => {
        return (
          <CustomButton
            content="Chi tiết"
            buttonProps={{
              className: "list-tuition_data-tuitionOption",
              icon: <FontAwesomeIcon icon={faCircleInfo} />,
              onClick: () => {
                navigate(CUSTOMER_ROUTER_PATH.STUDENT_INFORMATION);
              },
            }}
          />
        );
      },
    },
    {
      title: "CHỨC NĂNG",
      dataIndex: "cn",
      id: "cn",
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
                  className: "list-tuition_footer-editTable",
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
                  className: "list-tuition_footer-delete",
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
      id: "1",
      stt: "1",
      msv: "SV001",
      htv: "Nguyen Van A",
      khoa: "2020",
      lop: "10A1",
      malop: "L001",
      hocki: "1",
      smh: "5",
      tpn: "5000000",
      tdn: "3000000",
      tht: "0",
      tienthieu: "2000000",
      tongcong: "5000000",
      tuitionOption: "Details",
    },
    {
      id: "2",
      stt: "2",
      msv: "SV002",
      htv: "Tran Thi B",
      khoa: "2020",
      lop: "10A2",
      malop: "L002",
      hocki: "1",
      smh: "6",
      tpn: "6000000",
      tdn: "6000000",
      tht: "0",
      tienthieu: "0",
      tongcong: "6000000",
      tuitionOption: "Details",
    },
    {
      id: "3",
      stt: "3",
      msv: "SV003",
      htv: "Le Van C",
      khoa: "2021",
      lop: "11B1",
      malop: "L003",
      hocki: "2",
      smh: "4",
      tpn: "4000000",
      tdn: "4000000",
      tht: "0",
      tienthieu: "0",
      tongcong: "4000000",
      tuitionOption: "Details",
    },
    {
      id: "4",
      stt: "4",
      msv: "SV004",
      htv: "Pham Thi D",
      khoa: "2021",
      lop: "11B2",
      malop: "L004",
      hocki: "2",
      smh: "5",
      tpn: "5000000",
      tdn: "2500000",
      tht: "0",
      tienthieu: "2500000",
      tongcong: "5000000",
      tuitionOption: "Details",
    },
    {
      id: "5",
      stt: "5",
      msv: "SV005",
      htv: "Hoang Van E",
      khoa: "2022",
      lop: "12C1",
      malop: "L005",
      hocki: "1",
      smh: "3",
      tpn: "3000000",
      tdn: "3000000",
      tht: "0",
      tienthieu: "0",
      tongcong: "3000000",
      tuitionOption: "Details",
    },
    {
      id: "6",
      stt: "6",
      msv: "SV006",
      htv: "Vu Thi F",
      khoa: "2022",
      lop: "12C2",
      malop: "L006",
      hocki: "1",
      smh: "6",
      tpn: "6000000",
      tdn: "6000000",
      tht: "0",
      tienthieu: "0",
      tongcong: "6000000",
      tuitionOption: "Details",
    },
    {
      id: "7",
      stt: "7",
      msv: "SV007",
      htv: "Nguyen Van G",
      khoa: "2023",
      lop: "13D1",
      malop: "L007",
      hocki: "2",
      smh: "5",
      tpn: "5000000",
      tdn: "5000000",
      tht: "0",
      tienthieu: "0",
      tongcong: "5000000",
      tuitionOption: "Details",
    },
    {
      id: "8",
      stt: "8",
      msv: "SV008",
      htv: "Tran Thi H",
      khoa: "2023",
      lop: "13D2",
      malop: "L008",
      hocki: "2",
      smh: "4",
      tpn: "4000000",
      tdn: "2000000",
      tht: "0",
      tienthieu: "2000000",
      tongcong: "4000000",
      tuitionOption: "Details",
    },
    {
      id: "9",
      stt: "9",
      msv: "SV009",
      htv: "Le Van I",
      khoa: "2024",
      lop: "14E1",
      malop: "L009",
      hocki: "1",
      smh: "7",
      tpn: "7000000",
      tdn: "7000000",
      tht: "0",
      tienthieu: "0",
      tongcong: "7000000",
      tuitionOption: "Details",
    },
    {
      id: "10",
      stt: "10",
      msv: "SV010",
      htv: "Pham Thi J",
      khoa: "2024",
      lop: "14E2",
      malop: "L010",
      hocki: "1",
      smh: "5",
      tpn: "5000000",
      tdn: "2500000",
      tht: "0",
      tienthieu: "2500000",
      tongcong: "5000000",
      tuitionOption: "Details",
    },
  ]);
  const tuitionColumn = [
    {
      title: "STT",
      dataIndex: "stt",
      id: "stt",
      render: (text, record, index) => {
        return (
          <p style={{ color: "black", fontWeight: "600" }}>{record.stt}</p>
        );
      },
    },
    {
      title: "MÔN HỌC",
      dataIndex: "monhoc",
      id: "monhoc",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.monhoc}</p>;
      },
    },
    {
      title: "THỜI GIAN HỌC",
      dataIndex: "tgh",
      id: "tgh",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.tgh}</p>;
      },
    },
    {
      title: "HỌC PHÍ",
      dataIndex: "hocphi",
      id: "hocphi",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.hocphi}</p>;
      },
    },
    {
      title: "PHỤ THU",
      dataIndex: "phuthu",
      id: "phuthu",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.phuthu}</p>;
      },
    },
    {
      title: "THÀNH TIỀN",
      dataIndex: "thanhtien",
      id: "thanhtien",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.thanhtien}</p>;
      },
    },
  ];
  const tuitionData = [
    {
      id: "1",
      stt: "1",
      monhoc: "Toán học",
      tgh: "Thứ 2-Thứ 4 10:00-11:30",
      hocphi: "2000000",
      phuthu: "50000",
      thanhtien: "2050000",
    },
    {
      id: "2",
      stt: "2",
      monhoc: "Vật lý",
      tgh: "Thứ 3-Thứ 5 14:00-15:30",
      hocphi: "1800000",
      phuthu: "30000",
      thanhtien: "1830000",
    },
    {
      id: "3",
      stt: "3",
      monhoc: "Hóa học",
      tgh: "Thứ 6 09:00-11:00",
      hocphi: "1500000",
      phuthu: "20000",
      thanhtien: "1520000",
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleExportExcel = () => {
    const selectedData = data.filter((_, index) =>
      selectedRowKeys.includes(data[index].id)
    );

    const headers = [
      { header: "STT", id: "stt" },
      { header: "Mã học sinh", id: "msv" },
      { header: "Họ và Tên", id: "htv" },
      { header: "Lớp", id: "lop" },
      { header: "Mã lớp", id: "malop" },
      { header: "Khóa", id: "khoa" },
      { header: "Học Kì", id: "hocki" },
      { header: "Số Môn Học", id: "smh" },
      { header: "Số Tiền Phải Nộp", id: "tpn" },
      { header: "Số Tiền Đã Nộp", id: "tdn" },
      { header: "Số Tiền Hoàn Trả", id: "tht" },
      { header: "Số Tiền Thiếu/Thừa", id: "tienthieu" },
      { header: "Tổng Cộng", id: "tongcong" },
    ];

    const worksheet = XLSX.utils.json_to_sheet(selectedData, {
      header: headers.map((h) => h.id),
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
    if (selectedRecord) {
      form.setFieldsValue({
        htv: selectedRecord.htv,
        msv: selectedRecord.msv,
        khoa: selectedRecord.khoa,
        hocki: selectedRecord.hocki,
        lop: selectedRecord.lop,
        malop: selectedRecord.malop,
        smh: selectedRecord.smh,
        tpn: selectedRecord.tpn,
        tdn: selectedRecord.tdn,
        tht: selectedRecord.tht,
        tienthieu: selectedRecord.tienthieu,
        tongcong: selectedRecord.tongcong,
      });
    }
  }, [selectedRecord, form]);
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
  return (
    <div className="list-tuition">
      <HeaderWeb name="QUẢN LÝ HỌC SINH" disAble={true} />
      <NotificationPopup
        message={notification?.message}
        type={notification?.type}
      />
      <div className="list-tuition_header">
        <div>
          <h1 className="list-tuition_header-title">
            Danh sách hóa đơn học phí
          </h1>
          <p className="list-tuition_header-sub">
            Trang này hiển thị danh sách liên quan đến học phí của học sinh
          </p>
        </div>
        <div className="list-tuition_header-button">
          <CustomButton
            content="Lập hóa đơn"
            buttonProps={{
              className: "list-tuition_header-button-addTuition",
              onClick: () => {
                setModalStates({
                  ...modalStates,
                  addModal: true,
                });
              },
            }}
          />
        </div>
      </div>
      <div className="list-tuition_content">
        <div className="list-tuition_sidebar" ref={scrollRef}>
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[16, 16]}
            className="list-tuition_sidebar-scroll"
          >
            <FormWrap
              className="list-tuition_sidebar-colRight-formSearch"
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
                  className: "list-tuition_sidebar-colRight-formSearch-input",
                }}
                inputProps={{
                  placeholder: "Mã học sinh",
                }}
              />
              <FormButtonSubmit
                content={<SvgMagnifyingGlassSubmit />}
                formItemProps={{
                  className: "list-tuition_sidebar-colRight-formSearch-button",
                }}
              />
            </FormWrap>
          </RowWrap>
        </div>
        <div className="list-tuition_content-table">
          <TableWrap
            setSize={() => {}}
            scrollValue={{ x: 1366 }}
            tableWidth={1416}
            rootClassName="list-tuition_table-wrap"
            tableWrapperRef={tableWrapperRef}
            isScroll
            tableProps={{
              rowSelection: rowSelection,
              columns: column,
              dataSource: data,
            }}
          />
        </div>
        <div className="list-tuition_content-footer">
          <StudentFooterActions
            editState={editState}
            setEditState={setEditState}
            modalStates={modalStates}
            setModalStates={setModalStates}
            handleExportExcel={handleExportExcel}
            shouldScroll={false}
            isPrint={true}
            isShowOption={true}
            isExport={true}
          />
        </div>
      </div>
      <div className="list-tuition_modal">
        {/* Modal Add */}
        <Modal
          className="list-tuition_modal-add"
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
            });
          }}
        >
          <div className="list-tuition_modal-add-header">
            <h1>Lập hóa đơn học phí cho học sinh</h1>
            <div className="list-tuition_underLine" />
          </div>
          <div className="list-tuition_modal-add-content">
            <FormWrap form={form}>
              <RowWrap
                isGutter={true}
                isWrap={true}
                isAutoFillRow={true}
                styleFill={"between"}
                gutter={[8, 8]}
                className="list-tuition_modal-row"
              >
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">HỌ VÀ TÊN</p>
                  <FormInput
                    name={"htv"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionName",
                    }}
                    inputProps={{
                      placeholder: "Họ và tên",
                      onChange: (e) => setName(e.target.value),
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">MÃ HỌC SINH</p>
                  <FormInput
                    name={"msv"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionMsv",
                    }}
                    inputProps={{
                      placeholder: "Mã học sinh",
                      onChange: (e) => setStudentCode(e.target.value),
                    }}
                  />
                </ColWrap>
              </RowWrap>
              <RowWrap
                isGutter={true}
                isWrap={true}
                isAutoFillRow={true}
                styleFill={"between"}
                gutter={[8, 8]}
                className="list-tuition_modal-row"
              >
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">KHÓA</p>
                  <FormInput
                    name={"khoa"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionName",
                    }}
                    inputProps={{
                      placeholder: "Khóa",
                      onChange: (e) => setStudentClass(e.target.value),
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">HỌC KÌ</p>
                  <FormInput
                    name={"hocki"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionMsv",
                    }}
                    inputProps={{
                      placeholder: "Mã học sinh",
                      onChange: (e) => setStudentCode(e.target.value),
                    }}
                  />
                </ColWrap>
              </RowWrap>
              <RowWrap
                isGutter={true}
                isWrap={true}
                isAutoFillRow={true}
                styleFill={"between"}
                gutter={[8, 8]}
                className="list-tuition_modal-row"
              >
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">LỚP</p>
                  <FormInput
                    name={"lop"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionName",
                    }}
                    inputProps={{
                      placeholder: "Lớp",
                      onChange: (e) => setStudentClass(e.target.value),
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">MÃ LỚP</p>
                  <FormInput
                    name={"malop"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionMsv",
                    }}
                    inputProps={{
                      placeholder: "Mã lớp",
                      onChange: (e) => setCourse(e.target.value),
                    }}
                  />
                </ColWrap>
              </RowWrap>
              {name && studentCode && studentClass && course ? (
                <>
                  <div className="list-tuition_modal-add-table">
                    <TableWrap
                      setSize={() => {}}
                      scrollValue={{ x: 1366 }}
                      tableWidth={1416}
                      isScroll
                      tableProps={{
                        columns: tuitionColumn,
                        dataSource: tuitionData,
                      }}
                    />
                  </div>
                  <div className="list-tuition_modal-add-content-footer">
                    <RowWrap
                      isGutter={true}
                      isWrap={true}
                      isAutoFillRow={true}
                      styleFill={"between"}
                      gutter={[8, 8]}
                      className="list-tuition_modal-row"
                    >
                      <ColWrap colProps={{ span: 12 }}>
                        <p className="list-tuition_row-label">TỔNG MÔN HỌC</p>
                        <FormInput
                          name={"smh"}
                          formItemProps={{
                            className: "list-tuition_form-tuitionName",
                          }}
                          inputProps={{
                            placeholder: "Tổng số môn học",
                          }}
                        />
                      </ColWrap>
                      <ColWrap colProps={{ span: 12 }}>
                        <p className="list-tuition_row-label">
                          TỔNG SỐ TIỀN PHẢI NỘP
                        </p>
                        <FormInput
                          name={"tpn"}
                          formItemProps={{
                            className: "list-tuition_form-tuitionName",
                          }}
                          inputProps={{
                            placeholder: "Tổng số tiền phải nộp",
                          }}
                        />
                      </ColWrap>
                    </RowWrap>
                    <RowWrap
                      isGutter={true}
                      isWrap={true}
                      isAutoFillRow={true}
                      styleFill={"between"}
                      gutter={[8, 8]}
                      className="list-tuition_modal-row"
                    >
                      <ColWrap colProps={{ span: 12 }}>
                        <p className="list-tuition_row-label">
                          SỐ TIỀN THỪA/THIẾU
                        </p>
                        <FormInput
                          name={"tienthieu"}
                          formItemProps={{
                            className: "list-tuition_form-tuitionMsv",
                          }}
                          inputProps={{
                            placeholder: "Số tiền thừa/thiếu",
                          }}
                        />
                      </ColWrap>
                      <ColWrap colProps={{ span: 12 }}>
                        <p className="list-tuition_row-label">
                          SỐ TIỀN HOÀN TRẢ
                        </p>
                        <FormInput
                          name={"tht"}
                          formItemProps={{
                            className: "list-tuition_form-tuitionName",
                          }}
                          inputProps={{
                            placeholder: "Số tiền hoàn trả",
                          }}
                        />
                      </ColWrap>
                    </RowWrap>
                    <RowWrap
                      isGutter={true}
                      isWrap={true}
                      isAutoFillRow={true}
                      styleFill={"between"}
                      gutter={[8, 8]}
                      className="list-tuition_modal-row"
                    >
                      <ColWrap colProps={{ span: 12 }}>
                        <p className="list-tuition_row-label">SỐ TIỀN ĐÃ NỘP</p>
                        <FormInput
                          name={"tdn"}
                          formItemProps={{
                            className: "list-tuition_form-tuitionMsv",
                          }}
                          inputProps={{
                            placeholder: "Số tiền đã nộp",
                          }}
                        />
                      </ColWrap>
                      <ColWrap colProps={{ span: 12 }}>
                        <p className="list-tuition_row-label">TỔNG CỘNG</p>
                        <FormInput
                          name={"tongcong"}
                          formItemProps={{
                            className: "list-tuition_form-tuitionMsv",
                          }}
                          inputProps={{
                            placeholder: "Tổng cộng",
                          }}
                        />
                      </ColWrap>
                    </RowWrap>
                  </div>
                </>
              ) : (
                <>
                  <p>Nhập đầy đủ thông tin !</p>
                </>
              )}
              <div className="list-tuition_underLine" />
            </FormWrap>
          </div>
        </Modal>
        {/* Modal Edit */}
        <Modal
          className="list-tuition_modal-edit"
          open={modalStates.editModal}
          onCancel={() => {
            setModalStates({
              ...modalStates,
              editModal: false,
            });
          }}
          onOk={() => {
            setModalStates({
              ...modalStates,
              editModal: false,
            });
          }}
        >
          <div className="list-tuition_modal-edit-header">
            <h1>Sửa hóa đơn học phí cho học sinh</h1>
            <div className="list-tuition_underLine" />
          </div>
          <div className="list-tuition_modal-edit-content">
            <FormWrap form={form}>
              <RowWrap
                isGutter={true}
                isWrap={true}
                isAutoFillRow={true}
                styleFill={"between"}
                gutter={[8, 8]}
                className="list-tuition_modal-row"
              >
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">HỌ VÀ TÊN</p>
                  <FormInput
                    name={"htv"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionName",
                    }}
                    inputProps={{
                      placeholder: "Họ và tên",
                      onChange: (e) => setName(e.target.value),
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">MÃ HỌC SINH</p>
                  <FormInput
                    name={"msv"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionMsv",
                    }}
                    inputProps={{
                      placeholder: "Mã học sinh",
                      onChange: (e) => setStudentCode(e.target.value),
                    }}
                  />
                </ColWrap>
              </RowWrap>
              <RowWrap
                isGutter={true}
                isWrap={true}
                isAutoFillRow={true}
                styleFill={"between"}
                gutter={[8, 8]}
                className="list-tuition_modal-row"
              >
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">KHÓA</p>
                  <FormInput
                    name={"khoa"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionName",
                    }}
                    inputProps={{
                      placeholder: "Khóa",
                      onChange: (e) => setStudentClass(e.target.value),
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">HỌC KÌ</p>
                  <FormInput
                    name={"hocki"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionMsv",
                    }}
                    inputProps={{
                      placeholder: "Học kì",
                      onChange: (e) => setStudentCode(e.target.value),
                    }}
                  />
                </ColWrap>
              </RowWrap>
              <RowWrap
                isGutter={true}
                isWrap={true}
                isAutoFillRow={true}
                styleFill={"between"}
                gutter={[8, 8]}
                className="list-tuition_modal-row"
              >
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">LỚP</p>
                  <FormInput
                    name={"lop"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionName",
                    }}
                    inputProps={{
                      placeholder: "Lớp",
                      onChange: (e) => setStudentClass(e.target.value),
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">MÃ LỚP</p>
                  <FormInput
                    name={"malop"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionMsv",
                    }}
                    inputProps={{
                      placeholder: "Mã lớp",
                      onChange: (e) => setCourse(e.target.value),
                    }}
                  />
                </ColWrap>
              </RowWrap>
              <RowWrap
                isGutter={true}
                isWrap={true}
                isAutoFillRow={true}
                styleFill={"between"}
                gutter={[8, 8]}
                className="list-tuition_modal-row"
              >
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">TỔNG MÔN HỌC</p>
                  <FormInput
                    name={"smh"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionName",
                    }}
                    inputProps={{
                      placeholder: "Tổng số môn học",
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">
                    TỔNG SỐ TIỀN PHẢI NỘP
                  </p>
                  <FormInput
                    name={"tpn"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionName",
                    }}
                    inputProps={{
                      placeholder: "Tổng số tiền phải nộp",
                    }}
                  />
                </ColWrap>
              </RowWrap>
              <RowWrap
                isGutter={true}
                isWrap={true}
                isAutoFillRow={true}
                styleFill={"between"}
                gutter={[8, 8]}
                className="list-tuition_modal-row"
              >
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">SỐ TIỀN THỪA/THIẾU</p>
                  <FormInput
                    name={"tienthieu"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionMsv",
                    }}
                    inputProps={{
                      placeholder: "Số tiền thừa/thiếu",
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">SỐ TIỀN HOÀN TRẢ</p>
                  <FormInput
                    name={"tht"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionName",
                    }}
                    inputProps={{
                      placeholder: "Số tiền hoàn trả",
                    }}
                  />
                </ColWrap>
              </RowWrap>
              <RowWrap
                isGutter={true}
                isWrap={true}
                isAutoFillRow={true}
                styleFill={"between"}
                gutter={[8, 8]}
                className="list-tuition_modal-row"
              >
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">SỐ TIỀN ĐÃ NỘP</p>
                  <FormInput
                    name={"tdn"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionMsv",
                    }}
                    inputProps={{
                      placeholder: "Số tiền đã nộp",
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 12 }}>
                  <p className="list-tuition_row-label">TỔNG CỘNG</p>
                  <FormInput
                    name={"tongcong"}
                    formItemProps={{
                      className: "list-tuition_form-tuitionMsv",
                    }}
                    inputProps={{
                      placeholder: "Tổng cộng",
                    }}
                  />
                </ColWrap>
              </RowWrap>
            </FormWrap>
            <div className="list-tuition_underLine" />
          </div>
        </Modal>
      </div>
    </div>
  );
};
