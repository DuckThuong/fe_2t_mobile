import { useState } from "react";
import { HeaderWeb } from "../../HeaderWeb";
import NotificationPopup from "../../Notification";
import { SvgMagnifyingGlassSubmit } from "../../../Components/@svg/SvgMagnifyingGlassSubmit";
import { FormButtonSubmit } from "../../../Components/Form/FormButtonSubmit";
import FormWrap from "../../../Components/Form/FormWrap";
import { FormInputSearch } from "../../../Components/Form/FormInputSearch";
import TableWrap from "../../../Components/TableWrap";
import StudentFooterActions from "./../../FooterWeb/index";
import { CustomButton } from "../../../Components/buttons/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../../Routers/Routers";
import "./listTuition.scss";
export const ListTuition = () => {
  const [editState, setEditState] = useState<boolean>(true);
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
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
  const column = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => {
        return (
          <p style={{ color: "black", fontWeight: "600" }}>{record.stt}</p>
        );
      },
    },
    {
      title: "MÃ SINH VIÊN",
      dataIndex: "msv",
      key: "msv",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.msv}</p>;
      },
    },
    {
      title: "HỌ VÀ TÊN",
      dataIndex: "htv",
      key: "htv",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.htv}</p>;
      },
    },
    {
      title: "KHÓA",
      dataIndex: "khoa",
      key: "khoa",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.khoa}</p>;
      },
    },
    {
      title: "LỚP",
      dataIndex: "lop",
      key: "lop",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.lop}</p>;
      },
    },
    {
      title: "MÃ LỚP",
      dataIndex: "malop",
      key: "malop",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.malop}</p>;
      },
    },
    {
      title: "HỌC KÌ",
      dataIndex: "hocki",
      key: "hocki",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.hocki}</p>;
      },
    },
    {
      title: "SỐ MÔN HỌC",
      dataIndex: "smh",
      key: "smh",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.smh}</p>;
      },
    },
    {
      title: "SỐ TIỀN PHẢI NỘP",
      dataIndex: "tpn",
      key: "tpn",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.tpn}</p>;
      },
    },
    {
      title: "SỐ TIỀN ĐÃ NỘP",
      dataIndex: "tdn",
      key: "tdn",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.tdn}</p>;
      },
    },
    {
      title: "SỐ TIỀN HOÀN TRẢ",
      dataIndex: "tht",
      key: "tht",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.tht}</p>;
      },
    },
    {
      title: "SỐ TIỀN THIẾU/THỪA",
      dataIndex: "tienthieu",
      key: "tienthieu",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.tienthieu}</p>;
      },
    },
    {
      title: "TỔNG CỘNG",
      dataIndex: "tongcong",
      key: "tongcong",
      render: (text, record, index) => {
        return <p className="list-tuition_table-data">{record.tongcong}</p>;
      },
    },
    {
      title: "CHI TIẾT",
      dataIndex: "studentOption",
      key: "studentOption",
      render: () => {
        return (
          <CustomButton
            content="Chi tiết"
            buttonProps={{
              className: "list-tuition_data-studentOption",
              icon: <FontAwesomeIcon icon={faCircleInfo} />,
              onClick: () => {
                navigate(CUSTOMER_ROUTER_PATH.STUDENT_INFORMATION);
              },
            }}
          />
        );
      },
    },
  ];
  const [data, setNewData] = useState<any[]>([
    {
      key: "1",
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
      studentOption: "Details",
    },
    {
      key: "2",
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
      studentOption: "Details",
    },
    {
      key: "3",
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
      studentOption: "Details",
    },
    {
      key: "4",
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
      studentOption: "Details",
    },
    {
      key: "5",
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
      studentOption: "Details",
    },
    {
      key: "6",
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
      studentOption: "Details",
    },
    {
      key: "7",
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
      studentOption: "Details",
    },
    {
      key: "8",
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
      studentOption: "Details",
    },
    {
      key: "9",
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
      studentOption: "Details",
    },
    {
      key: "10",
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
      studentOption: "Details",
    },
  ]);
  return (
    <div className="list-tuition">
      <HeaderWeb name="QUẢN LÝ HỌC SINH" disAble={true} />
      <NotificationPopup
        message={notification?.message}
        type={notification?.type}
      />
      <div className="list-tuition_header">
        <h1 className="list-tuition_header-title">Danh sách học phí</h1>
        <p className="list-tuition_header-sub">
          Trang này hiển thị danh sách liên quan đến học phí của học sinh
        </p>
      </div>
      <div className="list-tuition_content">
        <div className="list-tuition_content-sidebar">
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
        </div>
        <div className="list-tuition_content-table">
          <TableWrap
            setSize={() => {}}
            scrollValue={{ x: 1366 }}
            tableWidth={1416}
            rootClassName="list-tuition_table-wrap"
            tableProps={{
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
            shouldScroll={false}
            isPrint={true}
            isShowOption={true}
            isExport={true}
          />
        </div>
      </div>
    </div>
  );
};
