import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import "./forgotPassword.scss";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { useForm } from "antd/es/form/Form";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { ValidateLibrary } from "../../validate";
import { useEffect, useState } from "react";
import { getAccount } from "../../account";
import NotificationPopup from "../Notification";
export const ForgotEditPassword = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const admin = getAccount("admin");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const onFinish = () => {
    if (
      form.getFieldValue("password") === admin?.password &&
      form.getFieldValue("email") === admin?.email
    ) {
      navigate(CUSTOMER_ROUTER_PATH.FORGOT_SUCCESS);
    } else {
      setNotification({
        message: "Địa chỉ email và mật khẩu cũ không chính xác",
        type: "error",
      });
      form.setFieldsValue("e");
    }
  };
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);
  return (
    <>
      <NotificationPopup
        message={notification?.message}
        type={notification?.type}
      />
      <div className="forgot-password_edit">
        <FormWrap
          form={form}
          onFinish={onFinish}
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
                rules: ValidateLibrary().email,
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
              isPassword
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
              isPassword
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
                // onClick: handleNextStep,
                type: "default",
              }}
            />
          </div>
        </FormWrap>
      </div>
    </>
  );
};
