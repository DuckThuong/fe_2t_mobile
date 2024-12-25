import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { ValidateLibrary } from "../../validate";
import NotificationPopup from "../Notification";
import "./forgotPassword.scss";
import { userApi } from "../../api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../api/apiConfig";
export const ForgotEditPassword = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { data: loginApi } = useQuery({
    queryKey: [QUERY_KEY.GET_USER],
    queryFn: userApi.getAllUsers,
  });
  const updatePassWord = useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: string }) =>
      userApi.updateUser(id, userData),
    onSuccess: () => {
      navigate(CUSTOMER_ROUTER_PATH.FORGOT_SUCCESS);
    },
    onError: () => {
      setNotification({
        message: "Địa chỉ email và mật khẩu cũ không chính xác",
        type: "error",
      });
      form.setFieldsValue("e");
    },
  });
  const onFinish = () => {
    const emailInput = form.getFieldValue("email").toLowerCase();
    const user = loginApi.UserList.find(
      (user) => user.Email.toLowerCase() === emailInput
    );

    if (
      user &&
      user.PasswordHash.toLowerCase() ===
        form.getFieldValue("password").toLowerCase()
    ) {
      const userData = form.getFieldValue("confirm_password");
      updatePassWord.mutate({ id: user.UserID, userData });
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
