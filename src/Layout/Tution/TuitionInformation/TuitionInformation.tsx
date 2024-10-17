import { useForm } from "antd/es/form/Form";
import ColWrap from "../../../Components/ColWrap";
import { FormInput } from "../../../Components/Form/FormInput";
import { FormSelect } from "../../../Components/Form/FormSelect";
import RowWrap from "../../../Components/RowWrap";
import TableWrap from "../../../Components/TableWrap";
import FormWrap from "./../../../Components/Form/FormWrap/index";
import { HeaderWeb } from "../../HeaderWeb";
import NotificationPopup from "../../Notification";
import { useState } from "react";
import "./tuitionInformation.scss";
import StudentFooterActions from "../../FooterWeb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
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
export const TuitionInformation = () => {
  const [form] = useForm();
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
  const classOption = Object.values(classSelector).map((major) => ({
    label: major,
    value: major,
  }));
  const classCodeOption = Object.values(classCodeSelector).map((major) => ({
    label: major,
    value: major,
  }));
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
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
        return (
          <p className="tuition-information_table-data">{record.monhoc}</p>
        );
      },
    },
    {
      title: "THỜI GIAN HỌC",
      dataIndex: "tgh",
      id: "tgh",
      render: (text, record, index) => {
        return <p className="tuition-information_table-data">{record.tgh}</p>;
      },
    },
    {
      title: "HỌC PHÍ",
      dataIndex: "hocphi",
      id: "hocphi",
      render: (text, record, index) => {
        return (
          <p className="tuition-information_table-data">{record.hocphi}</p>
        );
      },
    },
    {
      title: "PHỤ THU",
      dataIndex: "phuthu",
      id: "phuthu",
      render: (text, record, index) => {
        return (
          <p className="tuition-information_table-data">{record.phuthu}</p>
        );
      },
    },
    {
      title: "THÀNH TIỀN",
      dataIndex: "thanhtien",
      id: "thanhtien",
      render: (text, record, index) => {
        return (
          <p className="tuition-information_table-data">{record.thanhtien}</p>
        );
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
  return (
    <div className="tuition-information">
      <HeaderWeb name="QUẢN LÝ HỌC SINH" disAble={false} />
      <NotificationPopup
        message={notification?.message}
        type={notification?.type}
      />
      <div className="tuition-information_content">
        <FormWrap form={form} className="tuition-information_content-form">
          <h1 className="subject-detail_form-header">
            CHI TIẾT MÔN HỌC
            <span style={{ marginLeft: "8px" }}>
              <FontAwesomeIcon icon={faBookOpen} />
            </span>
          </h1>
          <span className="subject-detail_form-sub">
            Trang này hiển thị chi tiết học phí của học sinh:
          </span>
          <span
            className="subject-detail_form-name"
            style={{ marginLeft: "5px" }}
          >
            Trịnh Đức Thưởng
          </span>
          <div className="student-information_underLine" />
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[8, 8]}
            className="tuition-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="tuition-information_row-label">HỌ VÀ TÊN</p>
              <FormInput
                name={"htv"}
                formItemProps={{
                  className: "tuition-information_form-tuitionName",
                }}
                inputProps={{
                  placeholder: "Họ và tên",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="tuition-information_row-label">MÃ HỌC SINH</p>
              <FormInput
                name={"msv"}
                formItemProps={{
                  className: "tuition-information_form-tuitionMsv",
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
            gutter={[8, 8]}
            className="tuition-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="tuition-information_row-label">KHÓA</p>
              <FormInput
                name={"khoa"}
                formItemProps={{
                  className: "tuition-information_form-tuitionName",
                }}
                inputProps={{
                  placeholder: "Khóa",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="tuition-information_row-label">HỌC KÌ</p>
              <FormInput
                name={"hocki"}
                formItemProps={{
                  className: "tuition-information_form-tuitionMsv",
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
            gutter={[8, 8]}
            className="tuition-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="tuition-information_row-label">LỚP</p>
              <FormSelect
                name={"lop"}
                formItemProps={{
                  className: "tuition-information_form-tuitionName",
                }}
                placeholder="Lớp"
                selectProps={{
                  options: classOption,
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="tuition-information_row-label">MÃ LỚP</p>
              <FormSelect
                name={"malop"}
                formItemProps={{
                  className: "tuition-information_form-tuitionMsv",
                }}
                placeholder="Mã Lớp"
                selectProps={{
                  options: classCodeOption,
                }}
              />
            </ColWrap>
          </RowWrap>
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
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[8, 8]}
            className="tuition-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="tuition-information_row-label">TỔNG MÔN HỌC</p>
              <FormInput
                name={"smh"}
                formItemProps={{
                  className: "tuition-information_form-tuitionName",
                }}
                inputProps={{
                  placeholder: "Tổng số môn học",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="tuition-information_row-label">
                TỔNG SỐ TIỀN PHẢI NỘP
              </p>
              <FormInput
                name={"tpn"}
                formItemProps={{
                  className: "tuition-information_form-tuitionName",
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
            className="tuition-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="tuition-information_row-label">
                SỐ TIỀN THỪA/THIẾU
              </p>
              <FormInput
                name={"tienthieu"}
                formItemProps={{
                  className: "tuition-information_form-tuitionMsv",
                }}
                inputProps={{
                  placeholder: "Số tiền thừa/thiếu",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="tuition-information_row-label">SỐ TIỀN HOÀN TRẢ</p>
              <FormInput
                name={"tht"}
                formItemProps={{
                  className: "tuition-information_form-tuitionName",
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
            className="tuition-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="tuition-information_row-label">SỐ TIỀN ĐÃ NỘP</p>
              <FormInput
                name={"tdn"}
                formItemProps={{
                  className: "tuition-information_form-tuitionMsv",
                }}
                inputProps={{
                  placeholder: "Số tiền đã nộp",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="tuition-information_row-label">TỔNG CỘNG</p>
              <FormInput
                name={"tongcong"}
                formItemProps={{
                  className: "tuition-information_form-tuitionMsv",
                }}
                inputProps={{
                  placeholder: "Tổng cộng",
                }}
              />
            </ColWrap>
          </RowWrap>
          <div className="tuition-information_underLine" />
          <StudentFooterActions
            editState={editState}
            setEditState={setEditState}
            modalStates={modalStates}
            setModalStates={setModalStates}
            shouldScroll={false}
            isPrint={true}
            isShowOption={false}
            isExport={false}
            add={false}
          />
        </FormWrap>
      </div>
    </div>
  );
};
