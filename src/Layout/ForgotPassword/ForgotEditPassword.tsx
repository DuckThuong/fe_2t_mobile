import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import "./forgotPassword.scss";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { useForm } from "antd/es/form/Form";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
export const ForgotEditPassword = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const handleNextStep = () => {
    navigate(CUSTOMER_ROUTER_PATH.FORGOT_SUCCESS);
  };
  return (
    <div className="forgot-password_edit">
      <FormWrap
        form={form}
        onFinish={handleNextStep}
        className="forgot-password_edit-form"
      >
        <h1 className="forgot-password_title">THAY ĐỔI MẬT KHẨU</h1>
        <p className="forgot-password_sub">Gửi mã code tới email của tôi.</p>
        <div className="forgot-password_edit-input">
          <p className="forgot-password_label">Địa chỉ email</p>
          <FormInput
            name={"email"}
            formItemProps={{
              className: "forgot-password_edit-input-confirm",
            }}
            inputProps={{
              placeholder: "Email@gmail.com",
            }}
          />
        </div>
        <div className="forgot-password_edit-input">
          <p className="forgot-password_label">Mật khẩu cũ</p>
          <FormInput
            name={"password"}
            formItemProps={{
              className: "forgot-password_edit-input-confirm",
            }}
            inputProps={{
              placeholder: "Mật khẩu cũ",
            }}
          />
        </div>
        <div className="forgot-password_edit-input">
          <p className="forgot-password_label">Mật khẩu mới</p>
          <FormInput
            name={"confirm_password"}
            formItemProps={{
              className: "forgot-password_edit-input-confirm",
            }}
            inputProps={{
              placeholder: "Mật khẩu mới",
            }}
          />
        </div>
        <div className="forgot-password_edit-button">
          <FormButtonSubmit
            content={"Xác nhận"}
            buttonProps={{
              className: "forgot-password_edit-button-submit",
              onClick: handleNextStep,
              type: "default",
            }}
          />
        </div>
      </FormWrap>
    </div>
  );
};
