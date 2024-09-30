import { Image } from "antd";
import "./signin.scss";
import FormWrap from "../../Components/Form/FormWrap";
import { FormInput } from "../../Components/Form/FormInput";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { LogoForm } from "../../Components/LogoForm/LogoForm";

const ClaimAccount = () => {
  const navigate = useNavigate();
  const handleNextStep = () => {
    navigate(CUSTOMER_ROUTER_PATH.LOG_IN);
  };
  return (
    <div className="signin-account">
      <div>
        <LogoForm />
      </div>
      <div className="signin-account_form">
        <FormWrap className="signin-account_form-wrap">
          <div className="signin-account_form-header">
            <p className="signin-account_form-header-content">
              Create an account
            </p>
          </div>
          <div className="signin-account_form-input">
            <p className="signin-account_form-label">Full name</p>
            <FormInput
              name={"name"}
              formItemProps={{
                className: "signin-account_form-input-name",
              }}
              inputProps={{
                placeholder: "Full name",
              }}
            />
          </div>
          <div className="signin-account_form-input">
            <p className="signin-account_form-label">
              <b>Email address</b>
            </p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "signin-account_form-input-email",
              }}
              inputProps={{
                placeholder: "Email address",
              }}
            />
          </div>
          <div className="signin-account_form-input">
            <p className="signin-account_form-label">Password</p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "signin-account_form-input-password",
              }}
              inputProps={{
                placeholder: "Password",
              }}
            />
            <p className="signin-account_form-icon">
              <a href="/">! </a>Does your password have at least 6 characters?
            </p>
          </div>
          <div className="signin-account_form-input">
            <p className="signin-account_form-label">
              Please enter your password again
            </p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "signin-account_form-input-confirm",
              }}
            />
          </div>

          <div className="signin-account_form-button">
            <CustomButton
              content="Register"
              buttonProps={{
                className: "signin-account_form-button-submit",
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
          <hr className="signin-account_form-hr"></hr>
          <div className="signin-account_form-footer">
            <p>
              Already have an account?  <a href="/"> next</a>
            </p>
          </div>
        </FormWrap>
      </div>
    </div>
  );
};
export default ClaimAccount;
