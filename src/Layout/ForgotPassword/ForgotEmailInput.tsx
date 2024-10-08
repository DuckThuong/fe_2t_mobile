import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import "./forgotPassword.scss";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { useForm } from "antd/es/form/Form";
import { getAccount } from "../../account";
import { ValidateLibrary } from "../../validate";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
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
        name="forgot"
        onFinish={handleNextStep}
        layout="vertical"
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
              rules: ValidateLibrary().email,
            }}
            inputProps={{
              placeholder: "Email@gmail.com",
            }}
          />
        </div>
        <div className="forgot-password_email-button">
          <FormButtonSubmit
            content={"Xác nhận"}
            buttonProps={{
              className: "forgot-password_email-button-submit",
              onClick: handleNextStep,
              type: "primary",
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
