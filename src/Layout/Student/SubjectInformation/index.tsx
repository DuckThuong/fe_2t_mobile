import { HeaderWeb } from "./../../HeaderWeb/index";
import FormWrap from "./../../../Components/Form/FormWrap/index";
import RowWrap from "../../../Components/RowWrap";
import ColWrap from "../../../Components/ColWrap";
import { FormInput } from "../../../Components/Form/FormInput";
import "./subjectDetail.scss";
import { CustomButton } from "../../../Components/buttons/CustomButton";
import { EditOutlined, PrinterOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FormSelect } from "../../../Components/Form/FormSelect";
export const SubjectInformation = () => {
  const location = useLocation();
  const [editState, setEditState] = useState<boolean>(true);
  const option = [
    { value: "Đã thi", label: "Đã thi" },
    { value: "Đang học", label: "Đang học" },
  ];
  return (
    <>
      <HeaderWeb name="QUẢN LÝ HỌC SINH" disAble={false} />
      <div className="subject-detail">
        <FormWrap className="subject-detail_form">
          <h1 className="subject-detail_form-header">
            CHI TIẾT MÔN HỌC
            <span style={{ marginLeft: "8px" }}>
              <FontAwesomeIcon icon={faBookOpen} />
            </span>
          </h1>
          <span className="subject-detail_form-sub">
            Trang này hiển thị chi tiết môn học của học sinh:
          </span>
          <span
            className="subject-detail_form-name"
            style={{ marginLeft: "5px" }}
          >
            Trịnh Đức Thưởng
          </span>
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
              <p className="subject-detail_row-label">Tên môn học</p>
              <FormInput
                name={"courseName"}
                formItemProps={{
                  className: "subject-detail_form-courseName",
                }}
                inputProps={{
                  disabled: editState,
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
            className="subject-detail_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="subject-detail_row-label">Mã môn học</p>
              <FormInput
                name={"courseCode"}
                formItemProps={{
                  className: "subject-detail_form-courseCode",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "Mã môn học",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="subject-detail_row-label">Trạng Thái</p>
              <FormSelect
                name={"courseState"}
                formItemProps={{
                  className: "subject-detail_form-courseCode",
                }}
                placeholder={"Trạng thái"}
                selectProps={{
                  options: option,
                  disabled: editState,
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
                      disabled: editState,
                      placeholder: "Ngày",
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
                      disabled: editState,
                      placeholder: "Tháng",
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
                      disabled: editState,
                      placeholder: "Năm",
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
                      disabled: editState,
                      placeholder: "Ngày",
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
                      disabled: editState,
                      placeholder: "Tháng",
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
                      disabled: editState,
                      placeholder: "Năm",
                    }}
                  />
                </ColWrap>
              </RowWrap>
            </ColWrap>
          </RowWrap>
          {/* Hàng 3.5*/}
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[12, 12]}
            className="subject-detail_row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="subject-detail_row-label">Số tiết</p>
              <FormInput
                name={"courseClassNumber"}
                formItemProps={{
                  className: "subject-detail_form-courseCode",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "Số tiết",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="subject-detail_row-label">Lịch học</p>
              <FormInput
                name={"courseCalendar"}
                formItemProps={{
                  className: "subject-detail_form-courseRoom",
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
                  disabled: editState,
                  placeholder: "Giáo viên",
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
                  disabled: editState,
                  placeholder: "Phòng học",
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
              <p className="subject-detail_row-label">Kì học </p>
              <FormInput
                name={"coursePeriod"}
                formItemProps={{
                  className: "subject-detail_form-coursePeriod",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "Kì học ",
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="subject-detail_row-label">Năm học </p>
              <FormInput
                name={"courseYearRegis"}
                formItemProps={{
                  className: "subject-detail_form-courseYearRegis",
                }}
                inputProps={{
                  disabled: editState,
                  placeholder: "Năm học",
                }}
              />
            </ColWrap>
          </RowWrap>
          {location?.state?.isLearn ? (
            <>
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
                      disabled: editState,
                      placeholder: "Lần học",
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
                      disabled: editState,
                      placeholder: "Lần thi",
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
                  <p className="subject-detail_row-label point">
                    Điểm quá trình
                  </p>
                  <FormInput
                    name={"courseQT"}
                    formItemProps={{
                      className: "subject-detail_form-courseTimes",
                    }}
                    inputProps={{
                      disabled: editState,
                      placeholder: "Điểm QT",
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 4 }}>
                  <p className="subject-detail_row-label point">
                    Điểm kiểm tra
                  </p>
                  <FormInput
                    name={"courseKT"}
                    formItemProps={{
                      className: "subject-detail_form-courseYearRegis",
                    }}
                    inputProps={{
                      disabled: editState,
                      placeholder: "Điểm kiểm tra",
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 4 }}>
                  <p className="subject-detail_row-label point">Điểm thi</p>
                  <FormInput
                    name={"courseDT"}
                    formItemProps={{
                      className: "subject-detail_form-courseYearRegis",
                    }}
                    inputProps={{
                      disabled: editState,
                      placeholder: "Điểm thi",
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 4 }}>
                  <p className="subject-detail_row-label point">Điểm chữ</p>
                  <FormInput
                    name={"courseDC"}
                    formItemProps={{
                      className: "subject-detail_form-courseYearRegis",
                    }}
                    inputProps={{
                      disabled: editState,
                      placeholder: "Điểm chữ",
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
                    name={"courseTBC"}
                    formItemProps={{
                      className: "subject-detail_form-courseYearRegis",
                    }}
                    inputProps={{
                      disabled: editState,
                      placeholder: "Trung bình cộng học kì",
                    }}
                  />
                </ColWrap>
                <ColWrap colProps={{ span: 12 }}>
                  <p className="subject-detail_row-label">Kết quả</p>
                  <FormInput
                    name={"courseKQ"}
                    formItemProps={{
                      className: "subject-detail_form-courseYearRegis",
                    }}
                    inputProps={{
                      disabled: editState,
                      placeholder: "Kết quả",
                    }}
                  />
                </ColWrap>
              </RowWrap>
            </>
          ) : (
            <></>
          )}

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
              {editState ? (
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
        </FormWrap>
      </div>
    </>
  );
};
