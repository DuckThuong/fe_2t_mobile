import { HeaderWeb } from "./../../HeaderWeb/index";
import FormWrap from "./../../../Components/Form/FormWrap/index";
import RowWrap from "../../../Components/RowWrap";
import ColWrap from "../../../Components/ColWrap";
import { FormInput } from "../../../Components/Form/FormInput";
import "./subjectDetail.scss";
import { CustomButton } from "../../../Components/buttons/CustomButton";
import { EditOutlined, PrinterOutlined } from "@ant-design/icons";
export const SubjectInformation = () => {
  return (
    <>
      <HeaderWeb name="REPO_WEB" disAble={false} />
      <div className="subject-detail">
        <div className="subject-detail_content">
          <FormWrap className="subject-detail_content-form">
            <div className="subject-detail_header">
              <h1 className="subject-detail_header-title">Chi tiết học phần</h1>
              <span className="subject-detail_header-sub">
                Trang này hiển thị chi tiết học phần của sinh viên:
              </span>
              <span className="subject-detail_header-sub">
                Trịnh Đức Thưởng
              </span>
            </div>
            <div className="student-information_underLine" />

            {/* Hàng 1 */}
            <RowWrap
              isGutter={true}
              isWrap={true}
              isAutoFillRow={true}
              styleFill={"between"}
              gutter={[12, 12]}
              className="subject-detail_row"
            >
              <ColWrap colProps={{ span: 12 }}>
                <p className="subject-detail_row-label">Tên học phần</p>
                <FormInput
                  name={"courseName"}
                  formItemProps={{
                    className: "subject-detail_form-courseName",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "Lập trình Web nâng cao",
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
              className="subject-detail_row"
            >
              <ColWrap colProps={{ span: 12 }}>
                <p className="subject-detail_row-label">Mã học phần</p>
                <FormInput
                  name={"courseCode"}
                  formItemProps={{
                    className: "subject-detail_form-courseCode",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "7E1023.22",
                  }}
                />
              </ColWrap>
              <ColWrap colProps={{ span: 12 }}>
                <p className="subject-detail_row-label">Tên lớp tín chỉ</p>
                <FormInput
                  name={"courseClass"}
                  formItemProps={{
                    className: "subject-detail_form-courseClass",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "7E1023.22-1.2425.2.1_LT",
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
              className="subject-detail_row"
            >
              <ColWrap colProps={{ span: 12 }}>
                <p className="subject-detail_row-label">Thời gian bắt đầu</p>

                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"start"}
                  gutter={[12, 12]}
                  className="subject-detail_row"
                >
                  <ColWrap colProps={{ span: 8 }}>
                    <FormInput
                      name={"dayStart"}
                      formItemProps={{
                        className: "subject-detail_form-dayStart",
                      }}
                      inputProps={{
                        disabled: true,
                        placeholder: "09",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 8 }}>
                    <FormInput
                      name={"monthStart"}
                      formItemProps={{
                        className: "subject-detail_form-monthStart",
                      }}
                      inputProps={{
                        disabled: true,
                        placeholder: "09",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 8 }}>
                    <FormInput
                      name={"yearStart"}
                      formItemProps={{
                        className: "subject-detail_form-yearStart",
                      }}
                      inputProps={{
                        disabled: true,
                        placeholder: "2024",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
              </ColWrap>
              <ColWrap colProps={{ span: 12 }}>
                <p className="subject-detail_row-label">Thời gian kết thúc</p>

                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"start"}
                  gutter={[12, 12]}
                  className="subject-detail_row"
                >
                  <ColWrap colProps={{ span: 8 }}>
                    <FormInput
                      name={"dayEnd"}
                      formItemProps={{
                        className: "subject-detail_form-dayEnd",
                      }}
                      inputProps={{
                        disabled: true,
                        placeholder: "15",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 8 }}>
                    <FormInput
                      name={"monthEnd"}
                      formItemProps={{
                        className: "subject-detail_form-monthEnd",
                      }}
                      inputProps={{
                        disabled: true,
                        placeholder: "01",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 8 }}>
                    <FormInput
                      name={"yearEnd"}
                      formItemProps={{
                        className: "subject-detail_form-yearEnd",
                      }}
                      inputProps={{
                        disabled: true,
                        placeholder: "2025",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
              </ColWrap>
            </RowWrap>
            {/* Hàng 4 */}
            <RowWrap
              isGutter={true}
              isWrap={true}
              isAutoFillRow={true}
              styleFill={"between"}
              gutter={[12, 12]}
              className="subject-detail_row"
            >
              <ColWrap colProps={{ span: 12 }}>
                <p className="subject-detail_row-label">Giáo viên</p>
                <FormInput
                  name={"courseTeacher"}
                  formItemProps={{
                    className: "subject-detail_form-courseCode",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "7E1023.22",
                  }}
                />
              </ColWrap>
              <ColWrap colProps={{ span: 12 }}>
                <p className="subject-detail_row-label">Phòng học</p>
                <FormInput
                  name={"courseRoom"}
                  formItemProps={{
                    className: "subject-detail_form-courseRoom",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "FITHOU-P24FITHOU-P32Online-O.01",
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
              gutter={[12, 12]}
              className="subject-detail_row"
            >
              <ColWrap colProps={{ span: 12 }}>
                <p className="subject-detail_row-label">Kì học đăng kí</p>
                <FormInput
                  name={"coursePeriod"}
                  formItemProps={{
                    className: "subject-detail_form-coursePeriod",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "1",
                  }}
                />
              </ColWrap>
              <ColWrap colProps={{ span: 12 }}>
                <p className="subject-detail_row-label">Năm học đăng kí</p>
                <FormInput
                  name={"courseYearRegis"}
                  formItemProps={{
                    className: "subject-detail_form-courseYearRegis",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "3",
                  }}
                />
              </ColWrap>
            </RowWrap>
            {/* Hàng 6 */}
            <RowWrap
              isGutter={true}
              isWrap={true}
              isAutoFillRow={true}
              styleFill={"between"}
              gutter={[12, 12]}
              className="subject-detail_row"
            >
              <ColWrap colProps={{ span: 12 }}>
                <p className="subject-detail_row-label">Lần học</p>
                <FormInput
                  name={"courseTimes"}
                  formItemProps={{
                    className: "subject-detail_form-courseTimes",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "1",
                  }}
                />
              </ColWrap>
              <ColWrap colProps={{ span: 12 }}>
                <p className="subject-detail_row-label">Lần thi</p>
                <FormInput
                  name={"courseExam"}
                  formItemProps={{
                    className: "subject-detail_form-courseYearRegis",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "1",
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
              gutter={[12, 12]}
              className="subject-detail_row"
            >
              <ColWrap colProps={{ span: 4 }}>
                <p className="subject-detail_row-label">Điểm quá trình</p>
                <FormInput
                  name={"courseTimes"}
                  formItemProps={{
                    className: "subject-detail_form-courseTimes",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "10",
                  }}
                />
              </ColWrap>
              <ColWrap colProps={{ span: 4 }}>
                <p className="subject-detail_row-label">Điểm kiểm tra lần 1</p>
                <FormInput
                  name={"courseExam"}
                  formItemProps={{
                    className: "subject-detail_form-courseYearRegis",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "8,5",
                  }}
                />
              </ColWrap>
              <ColWrap colProps={{ span: 4 }}>
                <p className="subject-detail_row-label">Điểm thi</p>
                <FormInput
                  name={"courseExam"}
                  formItemProps={{
                    className: "subject-detail_form-courseYearRegis",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "8,5",
                  }}
                />
              </ColWrap>
              <ColWrap colProps={{ span: 4 }}>
                <p className="subject-detail_row-label">Điểm chữ</p>
                <FormInput
                  name={"courseExam"}
                  formItemProps={{
                    className: "subject-detail_form-courseYearRegis",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "C",
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
              gutter={[12, 12]}
              className="subject-detail_row"
            >
              <ColWrap colProps={{ span: 12 }}>
                <p className="subject-detail_row-label">
                  Trung bình cộng học kì
                </p>
                <FormInput
                  name={"courseExam"}
                  formItemProps={{
                    className: "subject-detail_form-courseYearRegis",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "8",
                  }}
                />
              </ColWrap>
              <ColWrap colProps={{ span: 12 }}>
                <p className="subject-detail_row-label">Kết quả</p>
                <FormInput
                  name={"courseExam"}
                  formItemProps={{
                    className: "subject-detail_form-courseYearRegis",
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: "Đạt",
                  }}
                />
              </ColWrap>
            </RowWrap>
            <div className="student-information_underLine" />
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
    </>
  );
};
