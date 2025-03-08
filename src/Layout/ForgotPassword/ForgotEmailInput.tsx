import { useForm } from "antd/es/form/Form";
import { Link, useNavigate } from "react-router-dom";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { ValidateLibrary } from "../../validate";
import "./forgotPassword.scss";

export const ForgotEmailInput = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const handleNextStep = (values) => {
    const { email } = values;
    navigate(CUSTOMER_ROUTER_PATH.FORGOT_CODE_INPUT, {
      state: { email },
    });
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
          Vui lòng nhập tài khoản email đã đăng nhập ở trang web này
        </p>
        <div className="forgot-password_email-input">
          <p className="forgot-password_label">Địa chỉ email</p>
          <FormInput
            name="email"
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
            content="Xác nhận"
            buttonProps={{
              className: "forgot-password_email-button-submit",
              type: "primary",
              htmlType: "submit",
            }}
          />
        </div>
        <div className="forgot-password_email-link">
          <Link to="/">Quay lại màn đăng nhập</Link>
        </div>
      </FormWrap>
    </div>
  );
};