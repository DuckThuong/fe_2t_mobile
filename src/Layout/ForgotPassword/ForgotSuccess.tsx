import { useNavigate } from "react-router-dom";
import { SvgResetSuccess } from "../../Components/@svg/SvgResetSuccess";
import { CustomButton } from "../../Components/buttons/CustomButton";
import "./forgotPassword.scss";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
export const ForgotSuccess = () => {
  const navigate = useNavigate();
  const handleNextStep = () => {
    navigate(CUSTOMER_ROUTER_PATH.LOG_IN);
  };
  return (
    <div className="forgot-password_sucess">
      <div className="forgot-password_sucess-reset">
        <div className="forgot-password_sucess-reset-label">
          <SvgResetSuccess />
        </div>
        <div className="forgot-password_sucess-title">
          Đổi mật khẩu thành công.
        </div>
        <div className="forgot-password_sucess-reset-button">
          <CustomButton
            content={"Đăng nhập ngay"}
            buttonProps={{
              className: "forgot-password_sucess-button-submit",
              onClick: handleNextStep,
            }}
          />
        </div>
      </div>
    </div>
  );
};
