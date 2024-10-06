import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import "./forgotPassword.scss";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { useForm } from "antd/es/form/Form";
import { getAccount } from "../../account";
export const ForgotEmailInput = () => {
  const [form] = useForm();
  const admin = getAccount("admin");

  const navigate = useNavigate();
  const handleNextStep = () => {
    if (form.getFieldValue("email") === admin?.email) {
      navigate(CUSTOMER_ROUTER_PATH.FORGOT_CODE_INPUT, {
        state: {
          email: form.getFieldValue("email"),
        },
      });
    } else {
    }
  };
  return (
    <div className="forgot-password_email">
      <FormWrap
        onFinish={handleNextStep}
        className="forgot-password_email-form"
        form={form}
      >
        <h1 className="forgot-password_title">QUÊN MẬT KHẨU</h1>
        <p className="forgot-password_sub">
          Vui lòng nhập tài khoản email đã đăng kí ở trang web này
        </p>
        <div className="forgot-password_email-input">
          <p className="forgot-password_label">Địa chỉ email</p>
          <FormInput
            name={"email"}
            formItemProps={{
              className: "forgot-password_email-input-confirm",
            }}
            inputProps={{
              placeholder: "Email@gmail.com",
            }}
          />
        </div>
        <div className="forgot-password_email-button">
          <CustomButton
            content={"Xác nhận"}
            buttonProps={{
              className: "forgot-password_email-button-submit",
              onClick: handleNextStep,
            }}
          />
        </div>
        <div className="forgot-password_email-link">
          <Link to={"/"}>Quay lại màn đăng nhập</Link>
        </div>
      </FormWrap>
    </div>
  );
};
