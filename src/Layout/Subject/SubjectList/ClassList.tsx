import { useEffect, useRef, useState } from "react";
import { SvgMagnifyingGlassSubmit } from "../../../Components/@svg/SvgMagnifyingGlassSubmit";
import { CustomButton } from "../../../Components/buttons/CustomButton";
import ColWrap from "../../../Components/ColWrap";
import { FormButtonSubmit } from "../../../Components/Form/FormButtonSubmit";
import { FormInputSearch } from "../../../Components/Form/FormInputSearch";
import CustomSelectCheckbox from "../../../Components/Form/FormSelectCheckbox";
import CustomSelectRadio from "../../../Components/Form/FormSelectRadio";
import FormWrap from "../../../Components/Form/FormWrap";
import RowWrap from "../../../Components/RowWrap";
import TableWrap from "../../../Components/TableWrap";
import { HeaderWeb } from "../../HeaderWeb";
import "./classList.scss";
import * as XLSX from "xlsx";
import StudentFooterActions from "../../FooterWeb";
import { TableRowSelection } from "antd/es/table/interface";
import { FormSelect } from "../../../Components/Form/FormSelect";
import { FormInput } from "../../../Components/Form/FormInput";
import { Modal } from "antd";
import { useForm } from "antd/es/form/Form";
enum classSelector {
  SIX = "Lớp 6",
  SEVEN = "Lớp 7",
  EIGHT = "Lớp 8",
  NINE = "Lớp 9",
}
enum stateSelector {
  ALL = "ALL",
  ON_STUDY = "Đang học",
  OUT_STUDY = "Đã học",
}
export const ClassList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [form] = useForm();
  const classOption = Object.values(classSelector).map((major) => ({
    label: major,
    value: major,
  }));
  const stateOption = Object.values(stateSelector).map((course) => ({
    label: course,
    value: course,
  }));
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

  const handleExportExcel = () => {
    const selectedData = data.filter((_, index) =>
      selectedRowKeys.includes(data[index].id)
    );

    const headers = [
      { header: "STT", key: "key" },
      { header: "Mã học sinh", key: "studentMsv" },
      { header: "Họ và Tên", key: "studentName" },
      { header: "Lớp", key: "studentClass" },
      { header: "Khóa", key: "studentCourse" },
      { header: "Ngày Sinh", key: "studentDob" },
      { header: "Giới Tính", key: "studentGender" },
      { header: "Trạng Thái", key: "studentState" },
      { header: "Chi Tiết", key: "studentOption" },
    ];

    const worksheet = XLSX.utils.json_to_sheet(selectedData, {
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
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => {
        return <p style={{ color: "black", fontWeight: "600" }}>{index + 1}</p>;
      },
    },
    {
      title: "Mã lớp",
      dataIndex: "classCode",
      key: "classCode",
    },
    {
      title: "Tên lớp",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Giáo viên",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Số học sinh",
      dataIndex: "studentCount",
      key: "studentCount",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <span className={status === "Đang học" ? "đang-học" : "tốt-nghiệp"}>
            {status}
          </span>
        );
      },
    },
  ];
  const data = [
    {
      key: 1,
      id: 101,
      classCode: "L6A",
      className: "Lớp 6A",
      teacher: "Nguyễn Văn A",
      studentCount: 30,
      status: "Đang học",
    },
    {
      key: 2,
      id: 102, // {{ edit_2 }}
      classCode: "L6B",
      className: "Lớp 6B",
      teacher: "Trần Thị B",
      studentCount: 28,
      status: "Đang học",
    },
    {
      key: 3,
      id: 103, // {{ edit_3 }}
      classCode: "L7A",
      className: "Lớp 7A",
      teacher: "Lê Văn C",
      studentCount: 25,
      status: "Tốt nghiệp",
    },
    {
      key: 4,
      id: 104, // {{ edit_4 }}
      classCode: "L7B",
      className: "Lớp 7B",
      teacher: "Phạm Thị D",
      studentCount: 27,
      status: "Đang học",
    },
    {
      key: 5,
      id: 105, // {{ edit_5 }}
      classCode: "L8A",
      className: "Lớp 8A",
      teacher: "Nguyễn Thị E",
      studentCount: 29,
      status: "Tốt nghiệp",
    },
  ];
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
    <div className="class-list">
      <HeaderWeb name="QUẢN LÝ HỌC SINH" disAble={true} />
      <div className="class-list_content">
        <h1 className="class-list_header-title">Danh sách lớp học</h1>
        <p className="class-list_header-sub">
          Trang này hiển thị thông tin liên quan đến các lớp học
        </p>
        <div className="class-list_sidebar" ref={scrollRef}>
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[16, 16]}
            className="class-list_sidebar-scroll"
          >
            <ColWrap
              colProps={{ span: 8 }}
              className="class-list_sidebar-colLeft"
            >
              <CustomSelectRadio
                options={classOption}
                onChange={() => {}}
                placeholder="Lớp"
                radioProps={{
                  rootClassName: "radio-colLeft-select",
                }}
                selectProps={{
                  popupClassName: "radio-popup",
                }}
              />
              <CustomSelectCheckbox
                options={stateOption}
                onChange={() => {}}
                placeholder="Trạng thái"
                footerDropdown={
                  <div className="class-list_sidebar-button">
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
                  rootClassName: "class-list_sidebar-checkbox",
                  popupClassName: "checkbox-popup",
                }}
              />
            </ColWrap>
            <ColWrap
              colProps={{ span: 8 }}
              className="class-list_sidebar-colRight"
            >
              <FormWrap
                className="class-list_sidebar-colRight-formSearch"
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
                    className: "class-list_sidebar-colRight-formSearch-input",
                  }}
                  inputProps={{
                    placeholder: "Mã học sinh",
                  }}
                />
                <FormButtonSubmit
                  content={<SvgMagnifyingGlassSubmit />}
                  formItemProps={{
                    className: "class-list_sidebar-colRight-formSearch-button",
                  }}
                />
              </FormWrap>
            </ColWrap>
          </RowWrap>
        </div>
        <div className="class-list_table">
          <TableWrap
            setSize={() => {}}
            scrollValue={{ x: 1366 }}
            tableWidth={1416}
            rootClassName="class-list_table-wrap"
            tableWrapperRef={tableWrapperRef}
            tableProps={{
              columns: columns,
              dataSource: data,
            }}
          />
        </div>
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
        <div className="class-list_modal-popup">
          {/* Modal Add */}
          <Modal
            className="class-list_modal-add"
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
                addStudent: true,
              });
            }}
          >
            <h1 className="class-list_modal-header">
              Bạn muốn thêm một học sinh?
            </h1>
            <div className="class-list_underLine" />
          </Modal>
          {/* Modal Delete */}
          <Modal
            className="class-list_modal-delete"
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
            <h1 className="class-list_modal-header">
              Bạn muốn xóa học sinh này ?
            </h1>
            <div className="class-list_underLine" />
          </Modal>
          {/* Modal Edit */}
          <Modal
            className="class-list_modal-edit"
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
                showEditstudent: true,
                editModal: false,
              });
            }}
          >
            <h1 className="class-list_modal-header">
              Bạn muốn sửa thông tin học sinh này ?
            </h1>
            <div className="class-list_underLine" />
          </Modal>
          {/* Modal Add Student */}
          <Modal
            className="class-list_modal-addStudent"
            open={modalStates.addStudent}
            onCancel={() => {
              setModalStates({
                ...modalStates,
                addStudent: false,
              });
            }}
            onOk={() => {
              if (
                form.getFieldValue("studentMsv") &&
                form.getFieldValue("studentName") &&
                form.getFieldValue("studentClass") &&
                form.getFieldValue("studentCourse") &&
                form.getFieldValue("studentDob") &&
                form.getFieldValue("studentGender") &&
                form.getFieldValue("studentState")
              ) {
                const newData = {
                  key: data.length + 1,
                  studentMsv: form.getFieldValue("studentMsv"),
                  studentName: form.getFieldValue("studentName"),
                  studentClass: form.getFieldValue("studentClass"),
                  studentCourse: form.getFieldValue("studentCourse"),
                  studentDob: form.getFieldValue("studentDob"),
                  studentGender: form.getFieldValue("studentGender"),
                  studentState: form.getFieldValue("studentState"),
                };
                setModalStates({
                  ...modalStates,
                  addStudent: false,
                });
              } else {
              }
            }}
            afterClose={() => {
              form.setFieldValue("studentMsv", "");
              form.setFieldValue("studentName", "");
              form.setFieldValue("studentClass", "");
              form.setFieldValue("studentCourse", "");
              form.setFieldValue("studentDob", "");
              form.setFieldValue("studentGender", "");
              form.setFieldValue("studentState", "");
            }}
          >
            <h1 className="class-list_modal-header">THÊM HỌC SINH</h1>
            <div className="class-list_underLine" />
            <div className="class-list_modal-addStudent-content">
              <FormWrap form={form} className="class-list_form">
                {/* Hàng 1 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[8, 8]}
                  className="class-list_modal-row"
                >
                  <ColWrap colProps={{ span: 16 }}>
                    <p className="class-list_row-label">HỌ VÀ TÊN</p>
                    <FormInput
                      name={"studentName"}
                      formItemProps={{
                        className: "class-list_form-studentName",
                      }}
                      inputProps={{
                        placeholder: "HỌ VÀ TÊN",
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
                  className="class-list_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="class-list_row-label">MÃ HỌC SINH</p>
                    <FormInput
                      name={"studentMsv"}
                      formItemProps={{
                        className: "class-list_form-studentClass",
                      }}
                      inputProps={{
                        placeholder: "MÃ HỌC SINH",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="class-list_row-label">TRẠNG THÁI</p>
                    <FormSelect
                      name={"studentState"}
                      formItemProps={{
                        className: "class-list_form-studentMsv",
                      }}
                      placeholder="TRẠNG THÁI"
                      selectProps={
                        {
                          // options: option,
                        }
                      }
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
                  className="class-list_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="class-list_row-label">LỚP</p>
                    <FormInput
                      name={"studentClass"}
                      formItemProps={{
                        className: "class-list_form-studentID",
                      }}
                      inputProps={{
                        placeholder: "LỚP",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="class-list_row-label">KHÓA</p>
                    <FormInput
                      name={"studentCourse"}
                      formItemProps={{
                        className: "class-list_form-studentDob",
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
                  gutter={[12, 12]}
                  className="class-list_row-modal"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="class-list_row-label">NGÀY SINH</p>
                    <FormInput
                      name={"studentDob"}
                      formItemProps={{
                        className: "class-list_form-studentEmail",
                      }}
                      inputProps={{
                        placeholder: "NGÀY SINH",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="class-list_row-label">GIỚI TÍNH</p>
                    <FormInput
                      name={"studentGender"}
                      formItemProps={{
                        className: "class-list_form-studentNumber",
                      }}
                      inputProps={{
                        placeholder: "Phòng học",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
              </FormWrap>

              <div className="class-list_underLine" />
            </div>
          </Modal>
          {/* Modal Edit student */}
          <Modal
            className="class-list_modal-editStudent"
            open={modalStates.showEditstudent}
            onCancel={() => {
              setModalStates({
                ...modalStates,
                showEditstudent: false,
              });
            }}
          >
            <h1 className="class-list_modal-header">
              SỬA THÔNG TIN HỌC SINH
            </h1>
            <div className="class-list_underLine" />
            <div className="class-list_modal-addStudent-content">
              <FormWrap form={form} className="class-list_form">
                {/* Hàng 1 */}
                <RowWrap
                  isGutter={true}
                  isWrap={true}
                  isAutoFillRow={true}
                  styleFill={"between"}
                  gutter={[8, 8]}
                  className="class-list_modal-row"
                >
                  <ColWrap colProps={{ span: 16 }}>
                    <p className="class-list_row-label">HỌ VÀ TÊN</p>
                    <FormInput
                      name={"studentName"}
                      formItemProps={{
                        className: "class-list_form-studentName",
                      }}
                      inputProps={{
                        placeholder: "HỌ VÀ TÊN",
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
                  className="class-list_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="class-list_row-label">MÃ HỌC SINH</p>
                    <FormInput
                      name={"studentMsv"}
                      formItemProps={{
                        className: "class-list_form-studentClass",
                      }}
                      inputProps={{
                        placeholder: "MÃ HỌC SINH",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="class-list_row-label">TRẠNG THÁI</p>
                    <FormSelect
                      name={"studentState"}
                      formItemProps={{
                        className: "class-list_form-studentMsv",
                      }}
                      placeholder="TRẠNG THÁI"
                      selectProps={
                        {
                          // options: option,
                        }
                      }
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
                  className="class-list_modal-row"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="class-list_row-label">LỚP</p>
                    <FormInput
                      name={"studentClass"}
                      formItemProps={{
                        className: "class-list_form-studentID",
                      }}
                      inputProps={{
                        placeholder: "LỚP",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="class-list_row-label">KHÓA</p>
                    <FormInput
                      name={"studentCourse"}
                      formItemProps={{
                        className: "class-list_form-studentDob",
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
                  gutter={[12, 12]}
                  className="class-list_row-modal"
                >
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="class-list_row-label">NGÀY SINH</p>
                    <FormInput
                      name={"studentDob"}
                      formItemProps={{
                        className: "class-list_form-studentEmail",
                      }}
                      inputProps={{
                        placeholder: "NGÀY SINH",
                      }}
                    />
                  </ColWrap>
                  <ColWrap colProps={{ span: 12 }}>
                    <p className="class-list_row-label">GIỚI TÍNH</p>
                    <FormInput
                      name={"studentGender"}
                      formItemProps={{
                        className: "class-list_form-studentNumber",
                      }}
                      inputProps={{
                        placeholder: "Phòng học",
                      }}
                    />
                  </ColWrap>
                </RowWrap>
              </FormWrap>
              <div className="class-list_underLine" />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
