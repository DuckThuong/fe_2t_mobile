import {
  AppstoreAddOutlined,
  AuditOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CustomButton } from "../../Components/buttons/CustomButton";
import ColWrap from "../../Components/ColWrap";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import RowWrap from "../../Components/RowWrap";
import { HeaderWeb } from "../HeaderWeb";
import "./studentInformation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpenReader,
  faCircleInfo,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import TableWrap from "../../Components/TableWrap";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { FormSelect } from "../../Components/Form/FormSelect";
import { useForm } from "antd/es/form/Form";

import { useRef } from "react";
import { message, Modal } from "antd";
import NotificationPopup from "../Notification";
import StudentFooterActions from "../FooterWeb";

export const StudentInformation = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [editState, setEditState] = useState<boolean>(true);
  const [courseEdit, setCourseEdit] = useState<boolean>(true);
  const [modalStates, setModalStates] = useState({
    editModal: false,
    deleteModal: false,
    addModal: false,
    addSubject: false,
    showDeleteButton: false,
    showEditButton: false,
    showNewColumn: false,
    showRegistedNewColumn: false,
    showEditSubject: false,
  });
  const [year, setYear] = useState<any>();
  const [semester, setSemester] = useState<any>();
  const yearInputRef = useRef<HTMLInputElement>(null);
  const option = [
    { value: "Bắt buộc", label: "Bắt buộc" },
    { value: "Không bắt buộc", label: "Không bắt buộc" },
    { value: "Tự chọn", label: "Tự chọn" },
  ];
  const stateOption = [
    { value: "Đang học", label: "Đang học" },
    { value: "Nghỉ học", label: "Nghỉ học" },
    { value: "Bảo lưu", label: "Bảo lưu" },
    { value: "Tốt nghiệp", label: "Tốt nghiệp" },
  ];
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const conlumns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => {
        return <p style={{ color: "black", fontWeight: "600" }}>{index + 1}</p>;
      },
    },
    {
      title: "MÃ MÔN HỌC",
      dataIndex: "mhp",
      key: "mhp",
    },
    {
      title: "TÊN MÔN HỌC",
      dataIndex: "thp",
      key: "thp",
    },
    {
      title: "YÊU CẦU",
      dataIndex: "yc",
      key: "yc",
    },
    {
      title: "MÃ LỚP",
      dataIndex: "ltc",
      key: "ltc",
    },
    {
      title: "LỊCH HỌC",
      dataIndex: "lh",
      key: "lh",
    },
    {
      title: "GIÁO VIÊN",
      dataIndex: "gv",
      key: "gv",
    },
    {
      title: "PHÒNG HỌC",
      dataIndex: "ph",
      key: "ph",
    },
    {
      title: "CHI TIẾT",
      dataIndex: "ct",
      key: "ct",
      render: () => {
        return (
          <>
            <CustomButton
              content="Chi tiết"
              buttonProps={{
                className: "list-student_data-studentOption",
                icon: <FontAwesomeIcon icon={faCircleInfo} />,
                onClick: () => {
                  navigate(CUSTOMER_ROUTER_PATH.SUBJECT_INFORMATION, {
                    state: {
                      isLearn: true,
                    },
                  });
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
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
                  className: "edit",
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
                  className: "delete",
                }}
              />
            )}
          </>
        );
      },

      hidden: !modalStates.showRegistedNewColumn,
    },
  ].filter((column) => !column.hidden);
  const data = [
    {
      stt: 1,
      mhp: "THCS101",
      thp: "Toán 7",
      yc: "Bắt buộc",
      ltc: "THCS101-1.2425.1.1_LT",
      lh: "Mon-Wed 08:00-09:30",
      gv: "Nguyễn Thị Hương",
      ph: "Phòng 101",
    },
    {
      stt: 2,
      mhp: "THCS102",
      thp: "Ngữ Văn 7",
      yc: "Bắt buộc",
      ltc: "THCS102-1.2425.1.2_LT",
      lh: "Tue-Thu 09:30-11:00",
      gv: "Trần Văn An",
      ph: "Phòng 102",
    },
    {
      stt: 3,
      mhp: "THCS103",
      thp: "Lịch Sử 7",
      yc: "Bắt buộc",
      ltc: "THCS103-1.2425.1.3_LT",
      lh: "Fri 13:00-14:30",
      gv: "Lê Thị Mai",
      ph: "Phòng 103",
    },
    {
      stt: 4,
      mhp: "THCS104",
      thp: "Địa Lý 7",
      yc: "Bắt buộc",
      ltc: "THCS104-1.2425.1.4_LT",
      lh: "Mon-Wed 14:30-16:00",
      gv: "Phạm Văn Bình",
      ph: "Phòng 104",
    },
    {
      stt: 5,
      mhp: "THCS105",
      thp: "Sinh Học 7",
      yc: "Bắt buộc",
      ltc: "THCS105-1.2425.1.5_LT",
      lh: "Tue-Thu 10:00-11:30",
      gv: "Nguyễn Văn A",
      ph: "Phòng 105",
    },
    {
      stt: 6,
      mhp: "THCS106",
      thp: "Vật Lý 7",
      yc: "Bắt buộc",
      ltc: "THCS106-1.2425.1.6_LT",
      lh: "Mon-Wed 09:00-10:30",
      gv: "Trần Văn B",
      ph: "Phòng 106",
    },
    {
      stt: 7,
      mhp: "THCS107",
      thp: "Hóa Học 7",
      yc: "Bắt buộc",
      ltc: "THCS107-1.2425.1.7_LT",
      lh: "Fri 10:00-12:00",
      gv: "Nguyễn Thị C",
      ph: "Phòng 107",
    },
    {
      stt: 8,
      mhp: "THCS108",
      thp: "Thể Dục 7",
      yc: "Bắt buộc",
      ltc: "THCS108-1.2425.1.8_LT",
      lh: "Tue-Thu 15:00-16:30",
      gv: "Lê Văn D",
      ph: "Sân Thể Dục",
    },
    {
      stt: 9,
      mhp: "THCS109",
      thp: "Tin Học 7",
      yc: "Không bắt buộc",
      ltc: "THCS109-1.2425.1.9_LT",
      lh: "Mon-Wed 11:00-12:30",
      gv: "Nguyễn Văn E",
      ph: "Phòng 109",
    },
    {
      stt: 10,
      mhp: "THCS110",
      thp: "Ngoại Ngữ 7",
      yc: "Không bắt buộc",
      ltc: "THCS110-1.2425.1.10_LT",
      lh: "Fri 14:00-16:00",
      gv: "Trần Thị F",
      ph: "Phòng 110",
    },
  ];
  const courseColumns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => {
        return <p style={{ color: "black", fontWeight: "600" }}>{index + 1}</p>;
      },
    },
    {
      title: "MÃ MÔN HỌC",
      dataIndex: "mhp",
      key: "mhp",
    },
    {
      title: "TÊN MÔN HỌC",
      dataIndex: "thp",
      key: "thp",
    },
    {
      title: "YÊU CẦU",
      dataIndex: "yc",
      key: "yc",
    },
    {
      title: "MÃ LỚP",
      dataIndex: "ltc",
      key: "ltc",
    },
    {
      title: "LỊCH HỌC",
      dataIndex: "lh",
      key: "lh",
    },
    {
      title: "GIÁO VIÊN",
      dataIndex: "gv",
      key: "gv",
    },
    {
      title: "PHÒNG HỌC",
      dataIndex: "ph",
      key: "ph",
    },
    {
      title: "CHI TIẾT",
      dataIndex: "ct",
      key: "ct",
      render: () => {
        return (
          <>
            <CustomButton
              content="Chi tiết"
              buttonProps={{
                className: "list-student_data-studentOption",
                icon: <FontAwesomeIcon icon={faCircleInfo} />,
                onClick: () => {
                  navigate(CUSTOMER_ROUTER_PATH.SUBJECT_INFORMATION, {
                    state: {
                      isLearn: false,
                    },
                  });
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
                  className: "edit",
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
                  className: "delete",
                }}
              />
            )}
          </>
        );
      },

      hidden: !modalStates.showNewColumn,
    },
  ].filter((column) => !column.hidden);
  const [courseData, setCourseData] = useState<any[]>([
    {
      stt: 1,
      mhp: "7E1023.22",
      thp: "Ngoại ngữ 1",
      yc: "Bắt buộc",
      ltc: "7E1023.22-1.2425.2.1_LT",
      lh: `16/09/24-17/11/24 - Thứ 2(T9-12)
           - Thứ 4(T9-12)`,
      gv: "Thái Thanh Tùng",
      ph: "Phòng 104",
    },
    {
      stt: 2,
      mhp: "THCS101",
      thp: "Toán 7",
      yc: "Bắt buộc",
      ltc: "THCS101-1.2425.1.1_LT",
      lh: "Mon-Wed 08:00-09:30",
      gv: "Nguyễn Thị Hương",
      ph: "Phòng 101",
    },
    {
      stt: 3,
      mhp: "THCS102",
      thp: "Ngữ Văn 7",
      yc: "Bắt buộc",
      ltc: "THCS102-1.2425.1.2_LT",
      lh: "Tue-Thu 09:30-11:00",
      gv: "Trần Văn An",
      ph: "Phòng 102",
    },
    {
      stt: 4,
      mhp: "THCS103",
      thp: "Lịch Sử 7",
      yc: "Bắt buộc",
      ltc: "THCS103-1.2425.1.3_LT",
      lh: "Fri 13:00-14:30",
      gv: "Lê Thị Mai",
      ph: "Phòng 103",
    },
    {
      stt: 5,
      mhp: "THCS104",
      thp: "Địa Lý 7",
      yc: "Bắt buộc",
      ltc: "THCS104-1.2425.1.4_LT",
      lh: "Mon-Wed 14:30-16:00",
      gv: "Phạm Văn Bình",
      ph: "Phòng 104",
    },
  ]);
  const handleExportExcel = () => {
    const headers = [
      { header: "STT", key: "stt" },
      { header: "MÃ MÔN HỌC", key: "mhp" },
      { header: "TÊN MÔN HỌC", key: "thp" },
      { header: "YÊU CẦU", key: "yc" },
      { header: "MÃ LỚP", key: "ltc" },
      { header: "LỊCH HỌC", key: "lh" },
      { header: "GIÁO VIÊN", key: "gv" },
      { header: "PHÒNG HỌC", key: "ph" },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: headers.map((h) => h.key),
    });
    const workbook = XLSX.utils.book_new();

    headers.forEach((h, index) => {
      const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 });
      worksheet[cellAddress].v = h.header;
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, "CourseList");
    XLSX.writeFile(workbook, "DanhSachHocPhan.xlsx");
  };
  const handleExportCourse = () => {
    const headers = [
      { header: "STT", key: "stt" },
      { header: "MÃ MÔN HỌC", key: "mhp" },
      { header: "TÊN MÔN HỌC", key: "thp" },
      { header: "YÊU CẦU", key: "yc" },
      { header: "MÃ LỚP", key: "ltc" },
      { header: "LỊCH HỌC", key: "lh" },
      { header: "GIÁO VIÊN", key: "gv" },
      { header: "PHÒNG HỌC", key: "ph" },
    ];

    const worksheet = XLSX.utils.json_to_sheet(courseData, {
      header: headers.map((h) => h.key),
    });
    const workbook = XLSX.utils.book_new();

    headers.forEach((h, index) => {
      const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 });
      worksheet[cellAddress].v = h.header;
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, "CourseList");
    XLSX.writeFile(workbook, "DanhSachHocPhanDaDangKi.xlsx");
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div>
      <HeaderWeb name="QUẢN LÝ HỌC SINH" disAble={false} />
      <NotificationPopup
        message={notification?.message}
        type={notification?.type}
      />
      <div className="student-information">
        <FormWrap form={form} className="student-information_form">
          <div className="student-information_underLine ">
            <h1 className="student-information_form-header">
              THÔNG TIN HỌC SINH
              <span style={{ marginLeft: "8px" }}>
                <FontAwesomeIcon icon={faGraduationCap} />
              </span>
            </h1>
            <div style={{ marginBottom: "32px" }}>
              <span className="student-information_form-title">
                Trang này hiển thị thông tin chi tiết của học sinh:
              </span>
              <span
                className="student-information_form-name"
                style={{ marginLeft: "5px" }}
              >
                Trịnh Đức Thưởng
              </span>
            </div>
          </div>
          <div className="student-information_underLine">
            <p className="student-information_title">
              Thông tin cá nhân <UserOutlined />
            </p>
          </div>
          {/* Hàng 1 */}
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[8, 8]}
            className="student-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Họ và tên</p>
              <FormInput
                name={"studentName"}
                formItemProps={{
                  className: "student-information_form-studentName",
                }}
                inputProps={{
                  placeholder: "Họ và tên",
                  disabled: editState,
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Mã học sinh</p>
              <FormInput
                name={"studentMhs"}
                formItemProps={{
                  className: "student-information_form-studentMsv",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "Mã học sinh",
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
            className="student-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Lớp</p>
              <FormInput
                name={"studentClass"}
                formItemProps={{
                  className: "student-information_form-studentClass",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "Lớp",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Trạng thái</p>
              <FormSelect
                name={"StudentState"}
                formItemProps={{
                  className: "student-information_form-studentMsv",
                }}
                placeholder="Trạng thái"
                selectProps={{
                  disabled: editState,
                  options: stateOption,
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
            gutter={[8, 8]}
            className="student-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Khóa</p>
              <FormInput
                name={"studentSemester"}
                formItemProps={{
                  className: "student-information_form-studentDob",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "Khóa",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Giới tính</p>
              <FormInput
                name={"studentGender"}
                formItemProps={{
                  className: "student-information_form-studentID",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "GIỚI TÍNH",
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
            gutter={[8, 8]}
            className="student-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Số CCCD</p>
              <FormInput
                name={"studentCCCD"}
                formItemProps={{
                  className: "student-information_form-studentID",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "Số căn cước công dân",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Ngày sinh</p>
              <FormInput
                name={"studentDob"}
                formItemProps={{
                  className: "student-information_form-studentDob",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "Ngày / Tháng / Năm sinh",
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
            gutter={[8, 8]}
            className="student-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">
                Email của phụ huynh/học sinh (nếu có)
              </p>
              <FormInput
                name={"studentEmail"}
                formItemProps={{
                  className: "student-information_form-studentEmail",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "Địa chỉ email của phụ huynh / học sinh",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">
                Số điện thoại phụ huynh / học sinh (nếu có)
              </p>
              <FormInput
                name={"studentNumber"}
                formItemProps={{
                  className: "student-information_form-studentNumber",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "Số điện thoại của phụ huynh / học sinh",
                }}
              />
            </ColWrap>
          </RowWrap>
          {/* Hàng 5 */}
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[8, 8]}
            className="student-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Nơi thường trú</p>
              <FormInput
                name={"studentAddress"}
                formItemProps={{
                  className: "student-information_form-studentAddress",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "Nơi thường trú",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Nơi ở hiện nay</p>
              <FormInput
                name={"studentResident"}
                formItemProps={{
                  className: "student-information_form-studentResident",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "Nơi ở hiện nay",
                }}
              />
            </ColWrap>
          </RowWrap>
          <div className="student-information_underLine">
            <p className="student-information_title">
              Kết quả học tập <AuditOutlined />
            </p>
          </div>
          {/* Hàng 6 */}
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[8, 8]}
            className="student-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Năm học</p>
              <FormInput
                name={"studentYearSemester "}
                formItemProps={{
                  className: "student-information_form-studentYearSemester",
                }}
                inputProps={{
                  ref: yearInputRef,
                  placeholder: "Nhập năm học",
                  onChange: (e) => setYear(e.target.value),
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Học kì</p>
              <FormInput
                name={"studentSemester"}
                formItemProps={{
                  className: "student-information_form-studentSemester",
                }}
                inputProps={{
                  placeholder: "Nhập học kì",
                  onChange: (e) => setSemester(e.target.value),
                }}
              />
            </ColWrap>
          </RowWrap>
          {semester && year ? (
            <>
              {/* Hàng 7 */}
              <RowWrap
                isGutter={true}
                isWrap={true}
                isAutoFillRow={true}
                styleFill={"between"}
                gutter={[8, 8]}
                className="student-information_row"
              >
                <ColWrap colProps={{ span: 12 }}>
                  <p className="student-information_row-label">
                    Các môn đã học
                  </p>
                  <FormInput
                    name={"studentNumberRegistered "}
                    formItemProps={{
                      className:
                        "student-information_form-studentNumberRegistered",
                    }}
                    inputProps={{
                      disabled: editState,
                      placeholder: "Các môn đã học",
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 12 }}>
                  <p className="student-information_row-label">
                    Các môn còn lại
                  </p>
                  <FormInput
                    name={"studentRemainingRegistered"}
                    formItemProps={{
                      className:
                        "student-information_form-studentRemainingRegistered",
                    }}
                    inputProps={{
                      disabled: editState,
                      placeholder: "Các môn còn lại",
                    }}
                  />
                </ColWrap>
              </RowWrap>
              {/* Hàng 8 */}
              <RowWrap
                isGutter={true}
                isWrap={true}
                isAutoFillRow={true}
                styleFill={"between"}
                gutter={[8, 8]}
                className="student-information_row"
              >
                <ColWrap colProps={{ span: 12 }}>
                  <p className="student-information_row-label">
                    Điểm số tích lũy (/10)
                  </p>
                  <FormInput
                    name={"studentScoreTen"}
                    formItemProps={{
                      className: "student-information_form-studentScoreTen",
                    }}
                    inputProps={{
                      disabled: editState,
                      placeholder: "Điểm số tích lũy (/10)",
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 12 }}>
                  <p className="student-information_row-label">
                    Trường hợp đặc biệt
                  </p>
                  <FormInput
                    name={"studentScordFour"}
                    formItemProps={{
                      className: "student-information_form-studentScordFour",
                    }}
                    inputProps={{
                      disabled: editState,
                      placeholder: "Trường hợp đặc biệt",
                    }}
                  />
                </ColWrap>
              </RowWrap>
              {/* Hàng 9 */}
              <RowWrap
                isGutter={true}
                isWrap={true}
                isAutoFillRow={true}
                styleFill={"between"}
                gutter={[8, 8]}
                className="student-information_row"
              >
                <ColWrap colProps={{ span: 12 }}>
                  <p className="student-information_row-label">
                    Xếp hạng học lực
                  </p>
                  <FormInput
                    name={"studentRank"}
                    formItemProps={{
                      className: "student-information_form-studentScoreTen",
                    }}
                    inputProps={{
                      disabled: editState,
                      placeholder: " Xếp hạng học lực",
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 12 }}>
                  <p className="student-information_row-label">Hạnh kiểm</p>
                  <FormInput
                    name={"studentRankFour"}
                    formItemProps={{
                      className: "student-information_form-studentScordFour",
                    }}
                    inputProps={{
                      disabled: editState,
                      placeholder: "Hạnh kiểm",
                    }}
                  />
                </ColWrap>
              </RowWrap>
            </>
          ) : (
            <p
              className="student-information_noData"
              onClick={() => yearInputRef.current?.focus()}
              style={{ cursor: "pointer" }}
            >
              <ExclamationOutlined />
              Vui lòng điền đầy đủ thông tin
            </p>
          )}
          <div className="student-information_underLine " />

          {/* Bảng các môn đang học  */}

          <div className="student-information_underLine">
            <p className="student-information_title">
              Các môn đang học trong kì hiện tại
              <span style={{ marginLeft: "8px" }}>
                <FontAwesomeIcon icon={faBookOpenReader} />
              </span>
            </p>
          </div>
          <div className="student-information_table">
            <TableWrap
              setSize={() => {}}
              scrollValue={{ x: 1200 }}
              tableWidth={1500}
              rootClassName="student-information_table-wrap"
              tableProps={{
                dataSource: courseData,
                columns: courseColumns,
              }}
            />
          </div>

          {/* Các button chỉnh sửa bảng các môn đang học */}

          <div className="list-student_footer">
            {courseEdit ? (
              <>
                <CustomButton
                  content={"Chỉnh sửa"}
                  buttonProps={{
                    icon: <EditOutlined />,
                    className: "list-student_footer-edit",
                    onClick: () => {
                      setCourseEdit(false);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    },
                  }}
                />
                <div className="option">
                  <CustomButton
                    content="Xuất Excel"
                    buttonProps={{
                      className: "list-student_footer-excel w-100",
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
                          showNewColumn: false,
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
                          showNewColumn: true,
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
                          showNewColumn: true,
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
                      setCourseEdit(true);
                      setModalStates({
                        ...modalStates,
                        showNewColumn: false,
                        showDeleteButton: false,
                        showEditButton: false,
                      });
                    },
                  }}
                />
              </>
            )}
          </div>
          {/* Bảng các môn đã học  */}

          <div className="student-information_underLine">
            <p className="student-information_title">
              Các môn đã học <FontAwesomeIcon icon={faBookOpenReader} />
            </p>
          </div>
          <div className="student-information_table">
            <TableWrap
              setSize={() => {}}
              scrollValue={{ x: 1200 }}
              tableWidth={1500}
              rootClassName="student-information_table-wrap"
              tableProps={{
                dataSource: data,
                columns: conlumns,
              }}
            />
          </div>
          <div className="student-information_underLine" />

          {/* Các button xử lý chức năng của bảng các môn đã học */}

          <StudentFooterActions
            editState={editState}
            setEditState={setEditState}
            modalStates={modalStates}
            setModalStates={setModalStates}
            handleExportExcel={handleExportExcel}
          />
          {/* Các modal hiện trong layout */}

          <div className="student-information_modal-popup">
            {/* Modal Add */}
            <Modal
              className="student-information_modal-add"
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
                  addSubject: true,
                });
              }}
            >
              <h1 className="student-information_modal-header">
                Bạn muốn thêm một môn học?
              </h1>
              <div className="student-information_underLine" />
            </Modal>
            {/* Modal Delete */}
            <Modal
              className="student-information_modal-delete"
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
              <h1 className="student-information_modal-header">
                Bạn muốn xóa môn học này ?
              </h1>
              <div className="student-information_underLine" />
            </Modal>
            {/* Modal Edit */}
            <Modal
              className="student-information_modal-edit"
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
                  showEditSubject: true,
                  editModal: false,
                });
              }}
            >
              <h1 className="student-information_modal-header">
                Bạn muốn sửa thông tin môn học này ?
              </h1>
              <div className="student-information_underLine" />
            </Modal>
            {/* Modal Add Subject */}
            <Modal
              className="student-information_modal-addSubject"
              open={modalStates.addSubject}
              onCancel={() => {
                setModalStates({
                  ...modalStates,
                  addSubject: false,
                });
              }}
              onOk={() => {
                if (
                  form.getFieldValue("subjectId") &&
                  form.getFieldValue("subjectName") &&
                  form.getFieldValue("subjectIndentify") &&
                  form.getFieldValue("subjectClassID") &&
                  form.getFieldValue("subjectCalendar") &&
                  form.getFieldValue("subjectTeacher") &&
                  form.getFieldValue("subjectRoom")
                ) {
                  const newCourse = {
                    stt: courseData.length + 1,
                    thp: form.getFieldValue("subjectId"),
                    mhp: form.getFieldValue("subjectName"),
                    yc: form.getFieldValue("subjectIndentify"),
                    ltc: form.getFieldValue("subjectClassID"),
                    lh: form.getFieldValue("subjectCalendar"),
                    gv: form.getFieldValue("subjectTeacher"),
                    ph: form.getFieldValue("subjectRoom"),
                  };
                  setCourseData([...courseData, newCourse]);
                  setModalStates({
                    ...modalStates,
                    addSubject: false,
                  });
                } else {
                  setNotification({
                    message: "Vui lòng điền đầy đủ dữ liệu",
                    type: "error",
                  });
                }
              }}
              afterClose={() => {
                form.setFieldValue("subjectId", "");
                form.setFieldValue("subjectName", "");
                form.setFieldValue("subjectIndentify", "");
                form.setFieldValue("subjectClassID", "");
                form.setFieldValue("subjectCalendar", "");
                form.setFieldValue("subjectTeacher", "");
                form.setFieldValue("subjectRoom", "");
              }}
            >
              <h1 className="student-information_modal-header">THÊM MÔN HỌC</h1>
              <div className="student-information_underLine" />
              <div className="student-information_modal-addSubject-content">
                {/* Hàng 1 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[8, 8]}
                  className="student-information_row"
                >
                  <ColWrap colProps={{ span: 16 }}>
                    <p className="student-information_row-label">TÊN MÔN HỌC</p>
                    <FormInput
                      name={"subjectName"}
                      formItemProps={{
                        className: "student-information_form-studentName",
                      }}
                      inputProps={{
                        placeholder: "Tên môn học",
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
                  className="student-information_row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="student-information_row-label">MÃ MÔN HỌC</p>
                    <FormInput
                      name={"subjectId"}
                      formItemProps={{
                        className: "student-information_form-studentClass",
                      }}
                      inputProps={{
                        placeholder: "Mã môn học",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="student-information_row-label">YÊU CẦU</p>
                    <FormSelect
                      name={"subjectIndentify"}
                      formItemProps={{
                        className: "student-information_form-studentMsv",
                      }}
                      placeholder="Yêu cầu"
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
                  gutter={[8, 8]}
                  className="student-information_row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="student-information_row-label">MÃ LỚP</p>
                    <FormInput
                      name={"subjectClassID"}
                      formItemProps={{
                        className: "student-information_form-studentID",
                      }}
                      inputProps={{
                        placeholder: "Mã lớp",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="student-information_row-label">LỊCH HỌC</p>
                    <FormInput
                      name={"subjectCalendar"}
                      formItemProps={{
                        className: "student-information_form-studentDob",
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
                  gutter={[8, 8]}
                  className="student-information_row-modal"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="student-information_row-label">GIÁO VIÊN</p>
                    <FormInput
                      name={"subjectTeacher"}
                      formItemProps={{
                        className: "student-information_form-studentEmail",
                      }}
                      inputProps={{
                        placeholder: "Giáo viên",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="student-information_row-label">PHÒNG HỌC</p>
                    <FormInput
                      name={"subjectRoom"}
                      formItemProps={{
                        className: "student-information_form-studentNumber",
                      }}
                      inputProps={{
                        placeholder: "Phòng học",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                <div className="student-information_underLine" />
              </div>
            </Modal>
            {/* Modal Edit Subject */}
            <Modal
              className="student-information_modal-addSubject"
              open={modalStates.showEditSubject}
              onCancel={() => {
                setModalStates({
                  ...modalStates,
                  showEditSubject: false,
                });
              }}
            >
              <h1 className="student-information_modal-header">SỬA MÔN HỌC</h1>
              <div className="student-information_underLine" />
              <div className="student-information_modal-addSubject-content">
                {/* Hàng 1 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[8, 8]}
                  className="student-information_modal"
                >
                  <ColWrap colProps={{ span: 16 }}>
                    <p className="student-information_row-label">TÊN MÔN HỌC</p>
                    <FormInput
                      name={"subjectName"}
                      formItemProps={{
                        className: "student-information_form-studentName",
                      }}
                      inputProps={{
                        placeholder: "Tên môn học",
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
                  className="student-information_row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="student-information_row-label">MÃ MÔN HỌC</p>
                    <FormInput
                      name={"subjectId"}
                      formItemProps={{
                        className: "student-information_form-studentClass",
                      }}
                      inputProps={{
                        placeholder: "Mã môn học",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="student-information_row-label">YÊU CẦU</p>
                    <FormSelect
                      name={"subjectIndentify"}
                      formItemProps={{
                        className: "student-information_form-studentMsv",
                      }}
                      placeholder="Yêu cầu"
                      selectProps={{
                        options: option,
                        placeholder: "Yêu cầu",
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
                  gutter={[8, 8]}
                  className="student-information_row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="student-information_row-label">MÃ LỚP</p>
                    <FormInput
                      name={"subjectClassID"}
                      formItemProps={{
                        className: "student-information_form-studentID",
                      }}
                      inputProps={{
                        placeholder: "Mã lớp",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="student-information_row-label">LỊCH HỌC</p>
                    <FormInput
                      name={"subjectCalendar"}
                      formItemProps={{
                        className: "student-information_form-studentDob",
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
                  gutter={[8, 8]}
                  className="student-information_row-modal"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="student-information_row-label">GIÁO VIÊN</p>
                    <FormInput
                      name={"subjectTeacher"}
                      formItemProps={{
                        className: "student-information_form-studentEmail",
                      }}
                      inputProps={{
                        placeholder: "Giáo viên",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="student-information_row-label">PHÒNG HỌC</p>
                    <FormInput
                      name={"subjectRoom"}
                      formItemProps={{
                        className: "student-information_form-studentNumber",
                      }}
                      inputProps={{
                        placeholder: "Phòng học",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
                <div className="student-information_underLine" />
              </div>
            </Modal>
          </div>
        </FormWrap>
      </div>
    </div>
  );
};
