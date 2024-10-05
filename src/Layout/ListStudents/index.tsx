import { useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FileExcelOutlined, PrinterOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { TableRowSelection } from "antd/es/table/interface";
enum majorSelector {
  CNTT = "Công nghệ thông tin",
  TMDT = "Thương mại điện tử",
  TCDN = "Tài chính doanh nghiệp",
  CNPM = "Công nghệ phần mềm",
  CNM = "Công nghệ an ninh mạng",
}
enum courseSelector {
  ALL = "ALL",
  K17 = "K17",
  K18 = "K18",
  K19 = "K19",
  K20 = "K20",
  K21 = "K21",
  K22 = "K22",
  K23 = "K23",
  K24 = "K24",
}
export const ListStudents = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const majorOption = Object.values(majorSelector).map((major) => ({
    label: major,
    value: major,
  }));
  const courseOption = Object.values(courseSelector).map((course) => ({
    label: course,
    value: course,
  }));
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
      title: "MÃ SINH VIÊN",
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
      title: "HỌ VÀ TÊN",
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
      title: "LỚP",
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
      title: "KHÓA",
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
      title: "NGÀY SINH",
      dataIndex: "studentDob",
      key: "studentDob",
      render: (record) => {
        return (
          <>
            <p className="m-0 list-student_data-studentDob">{record}</p>
          </>
        );
      },
    },
    {
      title: "GIỚI TÍNH",
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
      title: "TRẠNG THÁI",
      dataIndex: "studentState",
      key: "studentState",
      render: (record) => {
        const stateClass = `list-student_data-studentState ${record.toLowerCase().replace(/\s+/g, '-')}`;
        return (
          <>
            <p className={stateClass}>{record}</p>
          </>
        );
      },
    },
    {
      title: "CHI TIẾT",
      dataIndex: "studentOption",
      key: "studentOption",
      render: () => {
        return (
          <>
            <CustomButton
              content="Chi tiết"
              buttonProps={{
                className: "list-student_data-studentOption",
                icon: <FontAwesomeIcon icon={faCircleInfo} />,
                onClick: () => {
                  navigate(CUSTOMER_ROUTER_PATH.STUDENT_INFORMATION);
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
      key: 1,
      studentMsv: "21A100100373",
      studentName: "Trịnh Đức Thưởng",
      studentClass: "2110A01",
      studentCourse: "K21",
      studentDob: "28/07/2003",
      studentGender: "Nam",
      studentState: "Đang học",
      studentOption: "Details",
    },
    {
      key: 2,
      studentMsv: "21A100100140",
      studentName: "Lương Thu Hoài",
      studentClass: "2110A01",
      studentCourse: "K21",
      studentDob: "1/10/2003",
      studentGender: "Nữ",
      studentState: "Đang học",
      studentOption: "Details",
    },
    {
      key: 3,
      studentMsv: "21A100100137",
      studentName: "Nguyễn Minh Hòa",
      studentClass: "2110A01",
      studentCourse: "K21",
      studentDob: "15/11/2003",
      studentGender: "Nữ",
      studentState: "Tốt nghiệp",
      studentOption: "Details",
    },
    {
      key: 4,
      studentMsv: "21A100100331",
      studentName: "Nguyễn Minh Tuấn",
      studentClass: "2110A01",
      studentCourse: "K21",
      studentDob: "15/01/2003",
      studentGender: "Nam",
      studentState: "Bảo lưu",
      studentOption: "Details",
    },
    {
      key: 5,
      studentMsv: "21A100100337",
      studentName: "Trần Minh Thư",
      studentClass: "2110A01",
      studentCourse: "K21",
      studentDob: "25/11/2003",
      studentGender: "Nữ",
      studentState: "Nghỉ học",
      studentOption: "Details",
    },
    {
      key: 6,
      studentMsv: "21A100100327",
      studentName: "Trần Minh Tuấn",
      studentClass: "2110A01",
      studentCourse: "K21",
      studentDob: "25/5/2003",
      studentGender: "Nam",
      studentState: "Nghỉ học",
      studentOption: "Details",
    },
    {
      key: 7,
      studentMsv: "21A100100344",
      studentName: "Trịnh Văn Mạnh",
      studentClass: "2110A01",
      studentCourse: "K21",
      studentDob: "25/11/2003",
      studentGender: "Nam",
      studentState: "Học Thạc Sĩ",
      studentOption: "Details",
    },
    {
      key: 8,
      studentMsv: "21A100100437",
      studentName: "Hoàng Bảo Ngọc",
      studentClass: "2110A01",
      studentCourse: "K21",
      studentDob: "03/02/2003",
      studentGender: "Nữ",
      studentState: "Lười học",
      studentOption: "Details",
    },
    {
      key: 9,
      studentMsv: "21A100100537",
      studentName: "Trần Khánh Hùng",
      studentClass: "2110A01",
      studentCourse: "K21",
      studentDob: "25/11/2003",
      studentGender: "Nam",
      studentState: "Bùng học",
      studentOption: "Details",
    },
    {
      key: 10,
      studentMsv: "21A100100347",
      studentName: "Phạm Duy Trường",
      studentClass: "2110A01",
      studentCourse: "K21",
      studentDob: "25/11/2003",
      studentGender: "Nam",
      studentState: "Tốt nghiệp",
      studentOption: "Details",
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    if (selectedRowKeys?.length > 0) {
      setSelectedRowKeys(
        newSelectedRowKeys?.filter((item) => item !== selectedRowKeys[0])
      );
    } else {
      console.log("vào đây");
      setSelectedRowKeys(newSelectedRowKeys);
    }
  };
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys?.length > 0;
  const handleExportExcel = () => {
    const headers = [
      { header: "STT", key: "key" },
      { header: "Mã Sinh Viên", key: "studentMsv" },
      { header: "Họ và Tên", key: "studentName" },
      { header: "Lớp", key: "studentClass" },
      { header: "Khóa", key: "studentCourse" },
      { header: "Ngày Sinh", key: "studentDob" },
      { header: "Giới Tính", key: "studentGender" },
      { header: "Trạng Thái", key: "studentState" },
      { header: "Chi Tiết", key: "studentOption" },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data, {
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
        tableWrapperRef.current.removeEventListener(
          "scroll",
          handleTableScroll
        );
        scrollRef.current.removeEventListener("scroll", handleDivScroll);
      }
    };
  }, []);
  return (
    <div className="list-student">
      <HeaderWeb name="REPO_WEB" disAble={true} />
      <div className="list-student_header">
        <h1 className="list-student_header-title">Danh sách sinh viên</h1>
        <p className="list-student_header-sub">
          Trang này hiển thị thông tin liên quan đến thông tin sinh viên{" "}
        </p>
      </div>
      <div className="list-student_content">
        <div className="list-student_sidebar" ref={scrollRef}>
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
                    className:
                      "list-student_sidebar-colRight-formSearch-button",
                  }}
                />
              </FormWrap>
            </ColWrap>
          </RowWrap>
        </div>
        <div className="list-student_table">
          <TableWrap
            setSize={() => {}}
            scrollValue={{ x: 1366 }}
            tableWidth={1416}
            rootClassName="list-student_table-wrap"
            tableWrapperRef={tableWrapperRef}
            tableProps={{
              columns: conlumns,
              dataSource: data,
              rowHoverable: false,
              rowSelection: rowSelection,
            }}
          />
        </div>
        <div className="list-student_button">
          <CustomButton
            content="In danh sách"
            buttonProps={{
              className: "list-student_button-print",
              icon: <PrinterOutlined />,
              onClick: () => {
                window.print();
              },
            }}
          />
          <CustomButton
            content="Xuất Excel"
            buttonProps={{
              className: "list-student_button-excel",
              icon: <FileExcelOutlined />,
              onClick: handleExportExcel,
              disabled: !hasSelected,
            }}
          />
        </div>
      </div>
    </div>
  );
};