import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import "./forgotPassword.scss";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
export const ForgotEditPassword = () => {
  const navigate = useNavigate();
  const handleNextStep = () => {
    navigate(CUSTOMER_ROUTER_PATH.FORGOT_SUCCESS);
  };
  return (
    <div className="forgot-password_edit">
      <FormWrap className="forgot-password_edit-form">
        <h1 className="forgot-password_title">Reset password</h1>
        <p className="forgot-password_sub">
          Send the verification code to your email address
        </p>
        <div className="forgot-password_edit-input">
          <p className="forgot-password_label">Email address</p>
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
          <p className="forgot-password_label">Password</p>
          <FormInput
            name={"password"}
            formItemProps={{
              className: "forgot-password_edit-input-confirm",
            }}
            inputProps={{
              placeholder: "Password",
            }}
          />
        </div>
        <div className="forgot-password_edit-input">
          <p className="forgot-password_label">Confirm password</p>
          <FormInput
            name={"confirm_password"}
            formItemProps={{
              className: "forgot-password_edit-input-confirm",
            }}
            inputProps={{
              placeholder: "Confirm password",
            }}
          />
        </div>
        <div className="forgot-password_edit-button">
          <CustomButton
            content={"Send"}
            buttonProps={{
              className: "forgot-password_edit-button-submit",
              onClick: handleNextStep,
            }}
          />
        </div>
      </FormWrap>
    </div>
  );
};
