import { useState } from "react";
import { SvgMagnifyingGlassSubmit } from "../../Components/@svg/SvgMagnifyingGlassSubmit";
import { CustomButton } from "../../Components/buttons/CustomButton";
import ColWrap from "../../Components/ColWrap";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormInputSearch } from "../../Components/Form/FormInputSearch";
import FormWrap from "../../Components/Form/FormWrap";
import RowWrap from "../../Components/RowWrap";
import TableWrap from "../../Components/TableWrap";
import { HeaderWeb } from "../HeaderWeb";
import CustomSelectCheckbox from "./../../Components/Form/FormSelectCheckbox/index";
import CustomSelectRadio from "./../../Components/Form/FormSelectRadio/index";
import "./listStudents.scss";
import dayjs from "dayjs";
import { render } from "@testing-library/react";
const conlumns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (text, record, index) => {
      return <p style={{ color: "black" }}>{index + 1}</p>;
    },
  },
  {
    title: "Mã sinh viên",
    dataIndex: "studentMsv",
    key: "studentsMsv",
    render: (record) => {
      return (
        <>
          <p className="list-student_data-studentsMsv">{record}</p>
        </>
      );
    },
  },
  {
    title: "Họ và tên",
    dataIndex: "studentName",
    key: "studentName",
    render: (record) => {
      return (
        <>
          <p className="list-student_data-studentName">{record}</p>
        </>
      );
    },
  },
  {
    title: "Lớp",
    dataIndex: "studentClass",
    key: "studentClass",
    render: (record) => {
      return (
        <>
          <p className="list-student_data-studentClass">{record}</p>
        </>
      );
    },
  },
  {
    title: "Khóa",
    dataIndex: "studentCourse",
    key: "studentCourse",
    render: (record) => {
      return (
        <>
          <p className="list-student_data-studentCourse">{record}</p>
        </>
      );
    },
  },
  {
    title: "Ngày sinh",
    dataIndex: "studentDob",
    key: "studentDob",
    render: (record) => {
      return (
        <>
          <p className="m-0 list-student_data-studentDob">
            {dayjs.unix(record).format("DDMMYYYY")}
          </p>
        </>
      );
    },
  },
  {
    title: "Giới tính",
    dataIndex: "studentGender",
    key: "studentGender",
    render: (record) => {
      return (
        <>
          <p className="list-student_data-studentGender">{record}</p>
        </>
      );
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "studentState",
    key: "studentState",
    render: (record) => {
      return (
        <>
          <p className="list-student_data-studentState">{record}</p>
        </>
      );
    },
  },
  {
    title: "Chi tiết",
    dataIndex: "studentOption",
    key: "studentOption",
    render: () => {
      return (
        <>
          <CustomButton
            content="Chi tiết"
            buttonProps={{
              className: "list-student_data-studentOption",
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
    studentMsv: "SV001",
    studentName: "Nguyễn Văn A",
    studentClass: "10A1",
    studentCourse: "K21",
    studentDob: 1633046400,
    studentGender: "Nam",
    studentState: "Active",
    studentOption: "Details",
  },
  {
    stt: 2,
    studentMsv: "SV002",
    studentName: "Trần Thị B",
    studentClass: "10A2",
    studentCourse: "K22",
    studentDob: 1601510400,
    studentGender: "Nữ",
    studentState: "Inactive",
    studentOption: "Details",
  },
];
enum majorSelector {
  CNTT = "Công nghệ thông tin",
  TMDT = "Thương mại điện tử",
  TCDN = "Tài chính doanh nghiệp",
  CNPM = "Công nghệ phần mềm",
  CNM = "Công nghệ an ninh mạng",
}
enum courseSelector {
  ALL = "ALL",
  K19 = "K19",
  K20 = "K20",
  K21 = "K21",
  K22 = "K22",
  K23 = "K23",
  K24 = "K24",
}
export const ListStudents = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const majorOption = Object.values(majorSelector).map((major) => ({
    label: major,
    value: major,
  }));
  const courseOption = Object.values(courseSelector).map((course) => ({
    label: course,
    value: course,
  }));

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };
  return (
    <div className="list-student">
      <HeaderWeb name="REPO_WEB" />
      <div className="list-student_header">
        <h1 className="list-student_header-title">Danh sách sinh viên</h1>
        <p className="list-student_header-sub">
          Trang này hiển thị thông tin liên quan đến thông tin sinh viên{" "}
        </p>
      </div>
      <div className="list-student_sidebar">
        <RowWrap
          isGutter={true}
          isWrap={true}
          isAutoFillRow={true}
          styleFill={"between"}
          gutter={[16, 16]}
          className="list-student_sidebar-scroll"
        >
          <ColWrap
            colProps={{ span: 8 }}
            className="list-student_sidebar-colLeft"
          >
            <CustomSelectRadio
              options={majorOption}
              onChange={() => {}}
              placeholder="Chuyên ngành"
              radioProps={{
                rootClassName: "radio-colLeft-select",
              }}
              selectProps={{
                popupClassName: "radio-popup",
              }}
            />
            <CustomSelectCheckbox
              options={courseOption}
              onChange={() => {}}
              placeholder="Khóa"
              footerDropdown={
                <div className="list-student_sidebar-button">
                  <CustomButton
                    content="Hiển thị"
                    buttonProps={{
                      className: "width-40 height-24",
                      type: "primary",
                      onClick: () => {},
                    }}
                  />
                </div>
              }
              selectProps={{
                rootClassName: "list-student_sidebar-checkbox",
                popupClassName: "checkbox-popup",
              }}
            />
          </ColWrap>
          <ColWrap
            colProps={{ span: 8 }}
            className="list-student_sidebar-colRight"
          >
            <FormWrap
              className="list-student_sidebar-colRight-formSearch"
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
                  className: "list-student_sidebar-colRight-formSearch-input",
                }}
                inputProps={{
                  placeholder: "Mã sinh viên",
                }}
              />
              <FormButtonSubmit
                content={<SvgMagnifyingGlassSubmit />}
                formItemProps={{
                  className: "list-student_sidebar-colRight-formSearch-button",
                }}
              />
            </FormWrap>
          </ColWrap>
        </RowWrap>
      </div>
      <div className="list-student_table">
        <TableWrap
          setSize={() => {}}
          scrollValue={{ x: 1200 }}
          isHidePagination
          rootClassName="list-student_table-wrap"
          isScroll
          tableProps={{
            columns: conlumns,
            dataSource: data,
            rowHoverable: false,
            rowSelection: rowSelection,
          }}
        />
      </div>
    </div>
  );
};
