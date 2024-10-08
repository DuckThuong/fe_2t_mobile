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

import { useRef } from "react"; // Thêm import useRef
import { Modal } from "antd";

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
  });
  const [year, setYear] = useState<any>();
  const [semester, setSemester] = useState<any>();
  const yearInputRef = useRef<HTMLInputElement>(null); // Tạo ref cho input year
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
                  navigate(CUSTOMER_ROUTER_PATH.SUBJECT_INFORMATION);
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
  ];
  const data = [
    {
      stt: 1,
      mhp: "7E1023.22",
      thp: "Ngoại ngữ 1",
      yc: "Bắt buộc",
      ltc: "7E1023.22-1.2425.2.1_LT",
      lh: `16/09/24-17/11/24 - Thứ 2(T9-12)
           - Thứ 4(T9-12)`,
      gv: "Thái Thanh Tùng",
      ph: "FITHOU-P24FITHOU-P32Online-O.01",
    },
    {
      stt: 2,
      mhp: "7E1016.22",
      thp: "	Thiết kế trải nghiệm người dùng",
      yc: "Bắt buộc",
      ltc: "7E1016.22-1.2425.6.6_LT",
      lh: "Tue-Thu 09:00-10:30",
      gv: "Dương Chí Bằng	",
      ph: "FITHOU-P51",
    },
    {
      stt: 3,
      mhp: "PH103",
      thp: "Physics I",
      yc: "Bắt buộc",
      ltc: "PH103-C",
      lh: "Mon-Wed 14:00-15:30",
      gv: "Dr. Albert Newton",
      ph: "Room 303",
    },
    {
      stt: 4,
      mhp: "CH104",
      thp: "Chemistry Basics",
      yc: "Bắt buộc",
      ltc: "CH104-D",
      lh: "Fri 10:00-12:00",
      gv: "Dr. Marie Curie",
      ph: "Room 404",
    },
    {
      stt: 5,
      mhp: "BI105",
      thp: "Biology I",
      yc: "Bắt buộc",
      ltc: "BI105-E",
      lh: "Tue-Thu 11:00-12:30",
      gv: "Dr. Charles Darwin",
      ph: "Room 505",
    },
    {
      stt: 6,
      mhp: "EN106",
      thp: "English Literature",
      yc: "Bắt buộc",
      ltc: "EN106-F",
      lh: "Mon-Wed 09:00-10:00",
      gv: "Prof. William Shakespeare",
      ph: "Room 606",
    },
    {
      stt: 7,
      mhp: "HI107",
      thp: "World History",
      yc: "Bắt buộc",
      ltc: "HI107-G",
      lh: "Wed-Fri 13:00-14:30",
      gv: "Dr. Herodotus",
      ph: "Room 707",
    },
    {
      stt: 8,
      mhp: "EC108",
      thp: "Economics I",
      yc: "Bắt buộc",
      ltc: "EC108-H",
      lh: "Tue-Thu 15:00-16:30",
      gv: "Prof. Adam Smith",
      ph: "Room 808",
    },
    {
      stt: 9,
      mhp: "PS109",
      thp: "Psychology Basics",
      yc: "Không bắt buộc",
      ltc: "PS109-I",
      lh: "Mon-Wed 11:00-12:30",
      gv: "Dr. Sigmund Freud",
      ph: "Room 909",
    },
    {
      stt: 10,
      mhp: "SO110",
      thp: "Sociology I",
      yc: "Không bắt buộc",
      ltc: "SO110-J",
      lh: "Fri 14:00-16:00",
      gv: "Prof. Max Weber",
      ph: "Room 1010",
    },
  ];
  console.log(modalStates.showDeleteButton);
  console.log(modalStates.showDeleteButton);

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
                  navigate(CUSTOMER_ROUTER_PATH.SUBJECT_INFORMATION);
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
                  className: "edit",
                }}
              />
            )}
            {modalStates.showDeleteButton && (
              <CustomButton
                content="Xóa"
                buttonProps={{
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
  const courseData = [
    {
      stt: 1,
      mhp: "7E1023.22",
      thp: "Ngoại ngữ 1",
      yc: "Bắt buộc",
      ltc: "7E1023.22-1.2425.2.1_LT",
      lh: `16/09/24-17/11/24 - Thứ 2(T9-12)
           - Thứ 4(T9-12)`,
      gv: "Thái Thanh Tùng",
      ph: "FITHOU-P24FITHOU-P32Online-O.01",
    },
  ];
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

  return (
    <div>
      <HeaderWeb name="QUẢN LÝ HỌC SINH" disAble={false} />
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
            <ColWrap colProps={{ span: 16 }}>
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
              <p className="student-information_row-label">Mã học sinh</p>
              <FormInput
                name={"studentMsv"}
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
                name={"studentID"}
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
              tableWidth={1800}
              rootClassName="student-information_table-wrap"
              tableProps={{
                dataSource: courseData,
                columns: courseColumns,
              }}
            />
          </div>
          <div className="student-information_table-edit ">
            <RowWrap
              isGutter={true}
              isWrap={true}
              isAutoFillRow={true}
              styleFill={"between"}
              gutter={[8, 8]}
              className="student-information_row m-b-48"
            >
              <ColWrap colProps={{ span: 12 }} className="between_row">
                {courseEdit ? (
                  <>
                    <CustomButton
                      content="Xuất Excel"
                      buttonProps={{
                        className: "list-student_button-excel",
                        icon: <FileExcelOutlined />,
                        onClick: handleExportCourse,
                      }}
                    />
                    <CustomButton
                      content={"Chỉnh sửa"}
                      buttonProps={{
                        icon: <EditOutlined />,
                        className: "student-information_form-edit",
                        onClick: () => {
                          setCourseEdit(false);
                        },
                      }}
                    />
                  </>
                ) : (
                  <>
                    <CustomButton
                      content={"Lưu"}
                      buttonProps={{
                        icon: <SaveOutlined />,
                        className: "student-information_form-save",
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
                    <CustomButton
                      content={"Xóa"}
                      buttonProps={{
                        icon: <DeleteOutlined />,
                        className: "student-information_form-delete",
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
                    <CustomButton
                      content={"Sửa"}
                      buttonProps={{
                        icon: <EditOutlined />,
                        className: "student-information_form-editTable",
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
                      content={"Thêm"}
                      buttonProps={{
                        icon: <AppstoreAddOutlined />,
                        className: "student-information_form-add",
                        onClick: () => {
                          setModalStates({
                            ...modalStates,
                            addModal: true,
                          });
                        },
                      }}
                    />
                  </>
                )}
              </ColWrap>
            </RowWrap>
          </div>
          <div className="student-information_underLine">
            <p className="student-information_title">
              Các môn đã học <FontAwesomeIcon icon={faBookOpenReader} />
            </p>
          </div>
          <div className="student-information_table">
            <TableWrap
              setSize={() => {}}
              scrollValue={{ x: 1200 }}
              tableWidth={1416}
              rootClassName="student-information_table-wrap"
              tableProps={{
                dataSource: data,
                columns: conlumns,
              }}
            />
          </div>
          <div className="student-information_underLine" />
          <div className="student-information_footer">
            <RowWrap
              isGutter={true}
              isWrap={true}
              isAutoFillRow={true}
              styleFill={"between"}
              gutter={[8, 8]}
              className="student-information_row"
            >
              <ColWrap colProps={{ span: 16 }} className="footer">
                {editState ? (
                  <RowWrap
                    isGutter={true}
                    isWrap={true}
                    isAutoFillRow={true}
                    styleFill={"between"}
                    gutter={[12, 12]}
                    className="footer_row"
                  >
                    <CustomButton
                      content="Xuất Excel"
                      buttonProps={{
                        className: "list-student_button-excel",
                        icon: <FileExcelOutlined />,
                        onClick: handleExportExcel,
                      }}
                    />
                    <CustomButton
                      content={"In thông tin"}
                      buttonProps={{
                        icon: <PrinterOutlined />,
                        className: "student-information_form-print",
                        onClick: () => {
                          window.print();
                        },
                      }}
                    />
                    <CustomButton
                      content={"Chỉnh sửa"}
                      buttonProps={{
                        icon: <EditOutlined />,
                        className: "student-information_form-edit",
                        onClick: () => {
                          setEditState(false);
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        },
                      }}
                    />
                  </RowWrap>
                ) : (
                  <CustomButton
                    content={"Lưu"}
                    buttonProps={{
                      icon: <EditOutlined />,
                      className: "student-information_form-edit",
                      onClick: () => {
                        setEditState(true);
                      },
                    }}
                  />
                )}
              </ColWrap>
            </RowWrap>
          </div>
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
                Bạn muốn thêm môn học mới cho học sinh?
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
              onOk={() => {}}
            >
              <h1 className="student-information_modal-header">
                Bạn muốn sửa thông tin môn học này ?
              </h1>
              <div className="student-information_underLine" />
            </Modal>
            <Modal
              className="student-information_modal-addSubject"
              open={modalStates.addSubject}
              onCancel={() => {
                setModalStates({
                  ...modalStates,
                  addSubject: false,
                });
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
                  className="student-information_modal"
                >
                  <ColWrap colProps={{ span: 16 }}>
                    <p className="student-information_row-label">TÊN MÔN HỌC</p>
                    <FormInput
                      name={"studentName"}
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
                      name={"studentClass"}
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
                      name={"studentMsv"}
                      formItemProps={{
                        className: "student-information_form-studentMsv",
                      }}
                      selectProps={{
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
                      name={"studentID"}
                      formItemProps={{
                        className: "student-information_form-studentID",
                      }}
                      inputProps={{
                        disabled: editState,
                        placeholder: "Mã lớp",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="student-information_row-label">LỊCH HỌC</p>
                    <FormInput
                      name={"studentDob"}
                      formItemProps={{
                        className: "student-information_form-studentDob",
                      }}
                      inputProps={{
                        disabled: editState,
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
                      name={"studentEmail"}
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
                      name={"studentNumber"}
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
