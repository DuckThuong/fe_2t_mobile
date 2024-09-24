import { Image } from "antd";
import "./signin.scss";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { useNavigate } from "react-router-dom";

const PrivacyCode = () => {
  const navigate = useNavigate();
  const handleNextStep = () => {
    navigate(CUSTOMER_ROUTER_PATH.CLAIM_ACCOUNT);
  };
  return (
    <div className="signin-code">
      <div className="signin-code_logo">
        <Image
          src="https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/23/photo1648012210921-16480122111121649082453.jpg"
          className="signin-code_logo_image"
        />
        <p className="signin-code_logo_title">REPO WEB</p>
      </div>
      <div className="signin-code_form">
        <FormWrap className="signin-code_form-wrap">
          <div className="signin-code_form-header">
            <p className="signin-code_form-header-content">Email Address</p>
          </div>
          <div className="signin-code_form-title">
            <p className="signin-code_form-title-content">
              Please enter a temporary password to confirm your email address.{" "}
              <br />
              sent to
              <a href="/">Email@gmail.com</a> or
              <a href="/"> (change destination)</a>{" "}
            </p>
          </div>
          <div className="signin-code-form-email">
            <p className="signin-code_form-label">
              Please enter your temporary password
            </p>

            <FormInput
              name={"code"}
              formItemProps={{
                className: "signin-code_form-input",
              }}
            />
          </div>

          <div className="signin-code_form-code">
            <CustomButton
              content="Create an account"
              buttonProps={{
                className: "signin-code_form-button-submit",
                onClick: handleNextStep,
              }}
            />
          </div>
          <div className="signin-code_form-footer">
            <p className="signin-code_form-footer-content">
              By logging in, you can access our
              <a href="/"> terms of service </a> and
              <br />
              <a href="/">Privacy terms</a> you will be deemed to have agreed to
              this.
            </p>
            <CustomButton
              content="Resend code"
              buttonProps={{
                className: "signin-code_form-footer-button",
              }}
            />
          </div>
        </FormWrap>
      </div>
    </div>
  );
};
export default PrivacyCode;
