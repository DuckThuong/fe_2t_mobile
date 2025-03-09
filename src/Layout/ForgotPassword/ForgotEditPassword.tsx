import { useForm } from "antd/es/form/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { ValidateLibrary } from "../../validate";
import { message } from "antd";
import "./forgotPassword.scss";
import { useEffect } from "react";

export const ForgotEditPassword = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const location = useLocation();
  const emailParam = location?.state?.emailState;
  const onFinish = (values) => {
    const { email, new_password, confirm_password } = values;

    if (new_password !== confirm_password) {
      form.setFields([
        {
          name: "confirm_password",
          errors: ["Mật khẩu xác nhận không khớp!"],
        },
      ]);
      return;
    }
    message.success("Mật khẩu đã được cập nhật thành công!");
    navigate(CUSTOMER_ROUTER_PATH.FORGOT_SUCCESS);
  };
  console.log(emailParam);
  return (
    <div className="forgot-password_edit">
      <FormWrap
        form={form}
        onFinish={onFinish}
        className="forgot-password_edit-form"
      >
        <h1 className="forgot-password_title">ĐẶT LẠI MẬT KHẨU</h1>
        <p className="forgot-password_sub">Nhập email và tạo mật khẩu mới.</p>

        <div className="forgot-password_edit-input">
          <p className="forgot-password_label">Địa chỉ email</p>
          <FormInput
            name="email"
            formItemProps={{
              className: "forgot-password_edit-input-confirm",
              rules: ValidateLibrary().email,
            }}
            inputProps={{
              defaultValue: emailParam,
              disabled: true,
            }}
          />
        </div>

        <div className="forgot-password_edit-input">
          <p className="forgot-password_label">Mật khẩu mới</p>
          <FormInput
            name="new_password"
            formItemProps={{
              className: "forgot-password_edit-input-confirm",
              rules: [
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ],
            }}
            isPassword
            inputProps={{
              placeholder: "Nhập mật khẩu mới",
            }}
          />
        </div>

        <div className="forgot-password_edit-input">
          <p className="forgot-password_label">Xác nhận mật khẩu</p>
          <FormInput
            name="confirm_password"
            formItemProps={{
              className: "forgot-password_edit-input-confirm",
              rules: [
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ],
            }}
            isPassword
            inputProps={{
              placeholder: "Nhập lại mật khẩu mới",
            }}
          />
        </div>

        <div className="forgot-password_edit-button">
          <FormButtonSubmit
            content="Xác nhận"
            buttonProps={{
              className: "forgot-password_edit-button-submit",
              htmlType: "submit",
            }}
          />
        </div>
      </FormWrap>
    </div>
  );
};
