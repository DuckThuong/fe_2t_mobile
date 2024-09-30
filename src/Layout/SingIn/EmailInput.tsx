import { Image } from "antd";
import "./signin.scss";
import { Link, useNavigate } from "react-router-dom";
import FormWrap from "../../Components/Form/FormWrap";
import { FormInput } from "../../Components/Form/FormInput";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { LogoForm } from "../../Components/LogoForm/LogoForm";
const EmailInput = () => {
  const navigate = useNavigate();
  const handleNextStep = () => {
    navigate(CUSTOMER_ROUTER_PATH.PRIVACY_CODE);
  };
  return (
    <div className="signin-email">
      <div>
        <LogoForm />
      </div>
      <div className="signin-email_form">
        <FormWrap className="signin-email_form-wrap">
          <div className="signin-email_form-header">
            <p className="signin-email_form-header-content">
              Create an account
            </p>
          </div>
          <div className="signin-email-form-email">
            <p className="signin-email_form-label">Email address</p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "signin-email_form-email-input",
              }}
            />
          </div>

          <div className="signin-email_form-button">
            <CustomButton
              content="Register"
              buttonProps={{
                className: "signin-email_form-button-submit",
                onClick: handleNextStep,
              }}
            />
          </div>
          <div className="signin-email_form-privacy">
            <span className="signin-email_form-footer">●●● of </span>

            <Link className="signin-email_form-privacy-link" to={"/"}>
              Terms of service
            </Link>
            <span> and </span>
            <Link className="signin-email_form-privacy-link" to={"/"}>
              I agree to the privacy terms.
            </Link>
            <span className="signin-email_form-footer">
              {" "}
              Place where you can get it.{" "}
            </span>
            <span className="signin-email_form-footer">
              If so, please log in.
            </span>
          </div>
          <div className="signin-email_form-border-top"></div>
          <span className="signin-email_form-footer">
            Already have an account?{" "}
            <Link to={"/"} className="signin-email_form-footer-link">
              Next
            </Link>
          </span>
        </FormWrap>
      </div>
    </div>
  );
};
export default EmailInput;
