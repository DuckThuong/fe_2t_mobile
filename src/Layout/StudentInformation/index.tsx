import {
  AuditOutlined,
  EditOutlined,
  FileExcelOutlined,
  PrinterOutlined,
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

export const StudentInformation = () => {
  const navigate = useNavigate();
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
      title: "MÃ HỌC PHẦN",
      dataIndex: "mhp",
      key: "mhp",
    },
    {
      title: "TÊN HỌC PHẦN",
      dataIndex: "thp",
      key: "thp",
    },
    {
      title: "SỐ TÍN CHỈ",
      dataIndex: "stc",
      key: "stc",
    },
    {
      title: "TÊN LỚP TÍN CHỈ",
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
  ];
  const data = [
    {
      stt: 1,
      mhp: "7E1023.22",
      thp: "Lập trình Web nâng cao",
      stc: 3,
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
      stc: 4,
      ltc: "7E1016.22-1.2425.6.6_LT",
      lh: "Tue-Thu 09:00-10:30",
      gv: "Dương Chí Bằng	",
      ph: "FITHOU-P51",
    },
    {
      stt: 3,
      mhp: "PH103",
      thp: "Physics I",
      stc: 3,
      ltc: "PH103-C",
      lh: "Mon-Wed 14:00-15:30",
      gv: "Dr. Albert Newton",
      ph: "Room 303",
    },
    {
      stt: 4,
      mhp: "CH104",
      thp: "Chemistry Basics",
      stc: 3,
      ltc: "CH104-D",
      lh: "Fri 10:00-12:00",
      gv: "Dr. Marie Curie",
      ph: "Room 404",
    },
    {
      stt: 5,
      mhp: "BI105",
      thp: "Biology I",
      stc: 3,
      ltc: "BI105-E",
      lh: "Tue-Thu 11:00-12:30",
      gv: "Dr. Charles Darwin",
      ph: "Room 505",
    },
    {
      stt: 6,
      mhp: "EN106",
      thp: "English Literature",
      stc: 2,
      ltc: "EN106-F",
      lh: "Mon-Wed 09:00-10:00",
      gv: "Prof. William Shakespeare",
      ph: "Room 606",
    },
    {
      stt: 7,
      mhp: "HI107",
      thp: "World History",
      stc: 3,
      ltc: "HI107-G",
      lh: "Wed-Fri 13:00-14:30",
      gv: "Dr. Herodotus",
      ph: "Room 707",
    },
    {
      stt: 8,
      mhp: "EC108",
      thp: "Economics I",
      stc: 4,
      ltc: "EC108-H",
      lh: "Tue-Thu 15:00-16:30",
      gv: "Prof. Adam Smith",
      ph: "Room 808",
    },
    {
      stt: 9,
      mhp: "PS109",
      thp: "Psychology Basics",
      stc: 3,
      ltc: "PS109-I",
      lh: "Mon-Wed 11:00-12:30",
      gv: "Dr. Sigmund Freud",
      ph: "Room 909",
    },
    {
      stt: 10,
      mhp: "SO110",
      thp: "Sociology I",
      stc: 3,
      ltc: "SO110-J",
      lh: "Fri 14:00-16:00",
      gv: "Prof. Max Weber",
      ph: "Room 1010",
    },
  ];
  const handleExportExcel = () => {
    const headers = [
      { header: "STT", key: "stt" },
      { header: "MÃ HỌC PHẦN", key: "mhp" },
      { header: "TÊN HỌC PHẦN", key: "thp" },
      { header: "SỐ TÍN CHỈ", key: "stc" },
      { header: "TÊN LỚP TÍN CHỈ", key: "ltc" },
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
  return (
    <div>
      <HeaderWeb name="REPO_WEB" disAble={false} />
      <div className="student-information">
        <FormWrap className="student-information_form">
          <div className="student-information_underLine ">
            <h1 className="student-information_form-header">
              THÔNG TIN SINH VIÊN
              <span style={{ marginLeft: "8px" }}>
                <FontAwesomeIcon icon={faGraduationCap} />
              </span>
            </h1>
            <div style={{ marginBottom: "32px" }}>
              <span className="student-information_form-title">
                Trang này hiển thị thông tin chi tiết của sinh viên:
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
                  placeholder: "Trịnh Đức Thưởng",
                  disabled: true,
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
                  disabled: true,
                  placeholder: "2110A01",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Mã sinh viên</p>
              <FormInput
                name={"studentMsv"}
                formItemProps={{
                  className: "student-information_form-studentMsv",
                }}
                inputProps={{
                  disabled: true,
                  placeholder: "21A100100373",
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
                  disabled: true,
                  placeholder: "034203005852",
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
                  disabled: true,
                  placeholder: "28/07/2003",
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
              <p className="student-information_row-label">Email</p>
              <FormInput
                name={"studentEmail"}
                formItemProps={{
                  className: "student-information_form-studentEmail",
                }}
                inputProps={{
                  disabled: true,
                  placeholder: "trinhthuong26022003@gmail.com",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Số điện thoại</p>
              <FormInput
                name={"studentNumber"}
                formItemProps={{
                  className: "student-information_form-studentNumber",
                }}
                inputProps={{
                  disabled: true,
                  placeholder: "0868472032",
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
                  disabled: true,
                  placeholder: "Định Công, Hoàng Mai, Hà Nội",
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
                  disabled: true,
                  placeholder: "Bách Thuận, Vũ Thư, Thái Bình",
                }}
              />
            </ColWrap>
          </RowWrap>
          <div className="student-information_underLine">
            <p className="student-information_title">
              Thông tin ngành học <AuditOutlined />
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
              <p className="student-information_row-label">Khoa</p>
              <FormInput
                name={"studentMajor"}
                formItemProps={{
                  className: "student-information_form-studentMajor",
                }}
                inputProps={{
                  disabled: true,
                  placeholder: "Công nghệ thông tin",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">Chuyên ngành</p>
              <FormInput
                name={"studentCourse"}
                formItemProps={{
                  className: "student-information_form-studentCourse",
                }}
                inputProps={{
                  disabled: true,
                  placeholder: "Công nghệ phần mềm",
                }}
              />
            </ColWrap>
          </RowWrap>
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
                Số tín chỉ đã đăng kí
              </p>
              <FormInput
                name={"studentNumberRegistered "}
                formItemProps={{
                  className: "student-information_form-studentNumberRegistered",
                }}
                inputProps={{
                  disabled: true,
                  placeholder: "111",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">
                Số tín chỉ còn lại
              </p>
              <FormInput
                name={"studentRemainingRegistered"}
                formItemProps={{
                  className:
                    "student-information_form-studentRemainingRegistered",
                }}
                inputProps={{
                  disabled: true,
                  placeholder: "45",
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
                  disabled: true,
                  placeholder: "7,11",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">
                Điểm số tích lũy(/4)
              </p>
              <FormInput
                name={"studentScordFour"}
                formItemProps={{
                  className: "student-information_form-studentScordFour",
                }}
                inputProps={{
                  disabled: true,
                  placeholder: "2,77",
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
              <p className="student-information_row-label">Xếp hạng học lực</p>
              <FormInput
                name={"studentScoreTen"}
                formItemProps={{
                  className: "student-information_form-studentScoreTen",
                }}
                inputProps={{
                  disabled: true,
                  placeholder: "Khá",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="student-information_row-label">
                Xếp hạng học lực thang điểm 4
              </p>
              <FormInput
                name={"studentScordFour"}
                formItemProps={{
                  className: "student-information_form-studentScordFour",
                }}
                inputProps={{
                  disabled: true,
                  placeholder: "Khá",
                }}
              />
            </ColWrap>
          </RowWrap>
          <div className="student-information_underLine">
            <p className="student-information_title">
              Tín chỉ đã tích lũy <FontAwesomeIcon icon={faBookOpenReader} />
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
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[8, 8]}
            className="student-information_row"
          >
            <ColWrap colProps={{ span: 12 }}>
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
                }}
              />
            </ColWrap>
          </RowWrap>
        </FormWrap>
      </div>
    </div>
  );
};
