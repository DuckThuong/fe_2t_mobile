import { useForm } from "antd/es/form/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import "./forgotPassword.scss";

export const ForgotCodeInput = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const location = useLocation();
  const emailState = location?.state?.email;
  const handleNextStep = (values) => {
    const { code } = values;
    if (String(code) === "123456") {
      navigate(CUSTOMER_ROUTER_PATH.FORGOT_EDIT_PASSWORD, {
        state: { emailState },
      });
    } else {
      form.setFields([
        {
          name: "code",
          errors: ["Mã OTP không hợp lệ! Vui lòng thử lại."],
        },
      ]);
    }
  };

  return (
    <div className="forgot-password_code">
      <FormWrap
        onFinish={handleNextStep}
        form={form}
        className="forgot-password_code-form"
      >
        <h1 className="forgot-password_title">XÁC NHẬN MÃ OTP</h1>
        <p className="forgot-password_sub">
          <span>
            Vui lòng nhập mã OTP được gửi về email của bạn (Mã OTP có hiệu lực
            trong vòng 1 phút).
          </span>
        </p>
        <div className="forgot-password_code-input">
          <FormInput
            name="code"
            formItemProps={{
              className: "forgot-password_code-input-confirm",
              rules: [{ required: true, message: "Vui lòng nhập mã OTP!" }],
            }}
            inputProps={{
              placeholder: "Nhập mã OTP",
            }}
          />
        </div>
        <div className="forgot-password_code-link">
          <Link to={"/"}>Gửi lại mã</Link>
        </div>
        <div className="forgot-password_code-button">
          <FormButtonSubmit
            content="Xác nhận"
            buttonProps={{
              className: "forgot-password_code-button-submit",
              htmlType: "submit",
            }}
          />
        </div>
      </FormWrap>
    </div>
  );
};
