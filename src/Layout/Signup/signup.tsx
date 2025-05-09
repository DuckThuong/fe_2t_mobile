import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { useNavigate } from "react-router-dom";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { LogoForm } from "../../Components/LogoForm/LogoForm";
import { ValidateLibrary } from "../../validate";
import "./signup.scss";
import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../api/api";
import { RegisterPayload } from "../../api/constants";
import { notification } from "antd";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";

const Signup = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const registerMutate = useMutation({
    mutationFn: (data: RegisterPayload) => {
      return userApi.doRegister(data);
    },
    onSuccess: () => {
      notification.open({
        message: "Thông báo!",
        description: "Đăng ký thành công.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
      navigate(CUSTOMER_ROUTER_PATH.LOG_IN);
    },
    onError: () => {
      notification.open({
        message: "Thông báo!",
        description: "Đăng ký thất bại.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
    },
  });

  const onFinish = () => {
    const data: RegisterPayload = {
      Email: form.getFieldValue("email"),
      Password: form.getFieldValue("password"),
      PhoneNumber: form.getFieldValue("phone"),
    };
    registerMutate.mutate(data);
  };

  return (
    <div className="signup">
      <div>
        <LogoForm />
      </div>
      <div className="signup_form">
        <FormWrap onFinish={onFinish} form={form} className="signup_form-wrap">
          <div className="signup_form-header">
            <p className="signup_form-header-content">ĐĂNG KÝ</p>
          </div>
          <div className="signup_form-email">
            <p className="signup_form-label">Email</p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "signup_form-input",
                rules: ValidateLibrary().email,
              }}
              inputProps={{
                placeholder: "Email@gmail.com",
              }}
            />
          </div>
          <div className="signup_form-phone">
            <p className="signup_form-label">Phone Number</p>
            <FormInput
              name={"phone"}
              formItemProps={{
                className: "signup_form-input",
                rules: ValidateLibrary().phone,
              }}
              inputProps={{
                placeholder: "Số điện thoại",
              }}
            />
          </div>
          <div className="signup_form-password">
            <div className="signup_form-password-title">
              <span className="signup_form-label">Mật khẩu</span>
            </div>
            <FormInput
              name={"password"}
              formItemProps={{
                className: "signup_form-input",
                rules: ValidateLibrary().password,
              }}
              isPassword
              inputProps={{
                placeholder: "Mật khẩu",
              }}
            />
          </div>
          <div className="signup_form-password">
            <div className="signup_form-password-title">
              <span className="signup_form-label">Nhập lại mật khẩu</span>
            </div>
            <FormInput
              name={"CF_password"}
              formItemProps={{
                className: "signup_form-input",
                dependencies: ["password"],
              }}
              isPassword
              inputProps={{
                placeholder: "Nhập lại mật khẩu",
              }}
            />
          </div>

          <div className="signup_form-signup">
            <FormButtonSubmit
              content="Đăng Ký"
              buttonProps={{
                className: "signup_form-signup-button",
                type: "primary",
                htmlType: "submit",
              }}
            />
          </div>

          {/* <div className="signup_form-privacy">
            <span>●●● of </span>
            <Link className="signup_form-privacy-link" to={"/"}>
              Terms of service
            </Link>
            <span> and </span>
            <Link className="signup_form-privacy-link" to={"/"}>
              I agree to the privacy terms.
            </Link>
            <span> Place where you can get it. </span>
            <span>If so, please log in.</span>
          </div> */}

          {/* <div className="signup_form-signIn">
            <CustomButton
              content="Register Now"
              buttonProps={{
                className: "signup_form-signIn-button",
                onFinish: handleRegister,
              }}
            />
          </div> */}
        </FormWrap>
      </div>
    </div>
  );
};

export default Signup;
