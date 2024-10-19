import { useState } from "react";
import { CustomButton } from "../../../Components/buttons/CustomButton";
import ColWrap from "../../../Components/ColWrap";
import { FormInput } from "../../../Components/Form/FormInput";
import { FormUpload } from "../../../Components/Form/FormUpload";
import RowWrap from "../../../Components/RowWrap";
import { HeaderWeb } from "../../HeaderWeb";
import StudentFooterActions from "./../../FooterWeb/index";
import "./reward.scss";
import { FormTextArea } from "../../../Components/Form/FormTextArea";
export const RewardInformation = () => {
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
      <div className="reward_information">
        <div className="reward_information-header">
          <h1 className="reward_information-header-title">
            Thông tin giải thưởng của sinh viên:
          </h1>
          <span className="reward_information-header-sub">
            Trịnh Đức Thưởng
          </span>
        </div>
        <div className="list-student_underLine" />
        <div className="reward_information-content">
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[8, 8]}
            className="reward_information-row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="reward_information-row-label">TÊN GIẢI THƯỞNG</p>
              <FormInput
                name={"tengiathuong"}
                formItemProps={{
                  className: "reward_information-form-tengiathuong",
                }}
                inputProps={{
                  placeholder: "Tên Giải Thưởng",
                  disabled: editState,
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="reward_information-row-label">MÃ GIẢI THƯỞNG</p>
              <FormInput
                name={"magiathuong"}
                formItemProps={{
                  className: "reward_information-form-magiathuong",
                }}
                inputProps={{
                  placeholder: "Mã Giải Thưởng",
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
            className="reward_information-row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="reward_information-row-label">HỌC SINH ĐẠT GIẢI</p>
              <FormInput
                name={"hocsinhdatgiai"}
                formItemProps={{
                  className: "reward_information-form-hocsinhdatgiai",
                }}
                inputProps={{
                  placeholder: "Học Sinh Đạt Giải",
                  disabled: editState,
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="reward_information-row-label">MÃ HỌC SINH</p>
              <FormInput
                name={"mahocsinh"}
                formItemProps={{
                  className: "reward_information-form-mahocsinh",
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
            className="reward_information-row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="reward_information-row-label">LỚP</p>
              <FormInput
                name={"lop"}
                formItemProps={{
                  className: "reward_information-form-lop",
                }}
                inputProps={{
                  placeholder: "Lớp",
                  disabled: editState,
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="reward_information-row-label">MÃ LỚP</p>
              <FormInput
                name={"malop"}
                formItemProps={{
                  className: "reward_information-form-malop",
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
            className="reward_information-row"
          >
            <ColWrap colProps={{ span: 12 }}>
              <p className="reward_information-row-label">
                GIÁ TRỊ GIẢI THƯỞNG
              </p>
              <FormInput
                name={"giatrigiathuong"}
                formItemProps={{
                  className: "reward_information-form-giatrigiathuong",
                }}
                inputProps={{
                  placeholder: "Giá Trị Giải Thưởng",
                  disabled: editState,
                }}
              />
            </ColWrap>
            <ColWrap colProps={{ span: 12 }}>
              <p className="reward_information-row-label">
                THỜI GIAN TRAO GIẢI
              </p>
              <FormInput
                name={"thoigiantraogiai"}
                formItemProps={{
                  className: "reward_information-form-thoigiantraogiai",
                }}
                inputProps={{
                  placeholder: "Thời Gian Trao Giải",
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
            className="reward_information-row"
          >
            <p className="reward_information-row-label">LÝ DO TRAO GIẢI</p>
            <FormTextArea
              name={"lydotraogiai"}
              formItemProps={{
                className: "reward_information-form-lydotraogiai",
              }}
              textAreaProps={{
                placeholder: "Lý do trao giải",
                disabled: editState,
                rootClassName: "regions",
              }}
            />
          </RowWrap>
          <RowWrap
            isGutter={true}
            isWrap={true}
            isAutoFillRow={true}
            styleFill={"between"}
            gutter={[8, 8]}
            className="reward_information-row"
          >
            <p className="reward_information-row-label">HÌNH ẢNH MINH CHỨNG</p>
            <FormUpload
              name={"iamge"}
              listType="picture-card"
              formItemProps={{
                className: "reward_information-form-iamge",
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
        <div className="reward_information-footer">
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
