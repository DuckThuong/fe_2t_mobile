import { useState } from "react";
import { CustomButton } from "../../../Components/buttons/CustomButton";
import ColWrap from "../../../Components/ColWrap";
import { FormInput } from "../../../Components/Form/FormInput";
import { FormUpload } from "../../../Components/Form/FormUpload";
import RowWrap from "../../../Components/RowWrap";
import { HeaderWeb } from "../../HeaderWeb";
import StudentFooterActions from "./../../FooterWeb/index";
import "./DisCip.scss";
export const DisCipInformation = () => {
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
  return (
    <>
      <HeaderWeb name="Quản lý học sinh" disAble={false} />
      <div className="discip_information">
        <div className="discip_information-header">
          <h1 className="discip_information-header-title">
            Thông tin XỬ PHẠT của sinh viên:
          </h1>
          <span className="discip_information-header-sub">
            Trịnh Đức Thưởng
          </span>
        </div>
        <div className="list-student_underLine" />
        <div className="discip_information-content">
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[8, 8]}
            className="discip_information-row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="discip_information-row-label">TÊN HÌNH PHẠT</p>
              <FormInput
                name={"tenkyluat"}
                formItemProps={{
                  className: "discip_information-form-tuitionName",
                }}
                inputProps={{
                  placeholder: "Tên hình phạt",
                  disabled: editState,
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="discip_information-row-label">MÃ HÌNH PHẠT</p>
              <FormInput
                name={"makyluat"}
                formItemProps={{
                  className: "discip_information-form-tuitionMsv",
                }}
                inputProps={{
                  placeholder: "Mã hình phạt",
                  disabled: editState,
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
            className="discip_information-row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="discip_information-row-label">
                HỌC SINH BỊ XỬ PHẠT
              </p>
              <FormInput
                name={"hocsinhbikyluat"}
                formItemProps={{
                  className: "discip_information-form-tuitionName",
                }}
                inputProps={{
                  placeholder: "Học Sinh Bị Xử Phạt",
                  disabled: editState,
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="discip_information-row-label">MÃ HỌC SINH</p>
              <FormInput
                name={"mahocsinh"}
                formItemProps={{
                  className: "discip_information-form-tuitionMsv",
                }}
                inputProps={{
                  placeholder: "Mã Học Sinh",
                  disabled: editState,
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
            className="discip_information-row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="discip_information-row-label">LỚP</p>
              <FormInput
                name={"lop"}
                formItemProps={{
                  className: "discip_information-form-tuitionName",
                }}
                inputProps={{
                  placeholder: "Lớp",
                  disabled: editState,
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="discip_information-row-label">MÃ LỚP</p>
              <FormInput
                name={"malop"}
                formItemProps={{
                  className: "discip_information-form-tuitionMsv",
                }}
                inputProps={{
                  placeholder: "Mã Lớp",
                  disabled: editState,
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
            className="discip_information-row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="discip_information-row-label">LÝ DO XỬ PHẠT</p>
              <FormInput
                name={"lydokyluat"}
                formItemProps={{
                  className: "discip_information-form-tuitionName",
                }}
                inputProps={{
                  placeholder: "Lý Do Xử Phạt",
                  disabled: editState,
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="discip_information-row-label">THỜI GIAN XỬ PHẠT</p>
              <FormInput
                name={"thoigiankyluat"}
                formItemProps={{
                  className: "discip_information-form-tuitionMsv",
                }}
                inputProps={{
                  placeholder: "Thời Gian Xử Phạt",
                  disabled: editState,
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
            className="discip_information-row"
          >
            <p className="discip_information-row-label">HÌNH ẢNH MINH CHỨNG</p>
            <FormUpload
              name={"image"}
              listType="picture-card"
              formItemProps={{
                className: "form-upload",
              }}
              uploadProps={{
                disabled: editState,
              }}
            >
              <CustomButton
                content="Thêm ảnh minh chứng"
                buttonProps={{
                  disabled: editState,
                }}
              />
            </FormUpload>
          </RowWrap>
        </div>
        <div className="discip_information-footer">
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
        </div>
      </div>
    </>
  );
};
