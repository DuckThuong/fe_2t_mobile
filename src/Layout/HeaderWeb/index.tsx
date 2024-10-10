import React, { useState } from "react";
import "./headerWeb.scss";
import { Drawer, Popover } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { logout } from "../../store/authSlice";
import useSize from "../../hooks/useSize";
import useUser from "../../hooks/useUser";
import { Tooltip } from "antd/lib";
import { SvgHamburger } from "../../Components/@svg/SvgHamburger/index";
import { SvgSetting } from "../../Components/@svg/SvgSetting/index";
import {
  CUSTOMER_ROUTE_NAME,
  CUSTOMER_ROUTER_PATH,
} from "../../Routers/Routers";
import { TAB_SIZE } from "../../ThemeSetting";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { ArrowLeftOutlined } from "@ant-design/icons";

type Props = {
  name: string;
  disAble: boolean;
};

interface MenuItem {
  title: string;
  link: string;
}

const listMenuItem = (): MenuItem[] => {
  return [
    {
      title: "Danh sách học sinh",
      link: `/${CUSTOMER_ROUTE_NAME.LIST_STUDENT}`,
    },
    {
      title: "Quản lý lớp học",
      link: `/${CUSTOMER_ROUTE_NAME.LIST_CLASS}`,
    },
    {
      title: "Quản lý giảng viên",
      link: `/${CUSTOMER_ROUTE_NAME.FORGOT_CODE_INPUT}`,
    },
    {
      title: "Khen thưởng và kỉ luật",
      link: `/${CUSTOMER_ROUTE_NAME.FORGOT_CODE_INPUT}`,
    },
  ];
};

const listSettingItem = (
  handleLogoutCognito: () => void,
  handleProfileSeller: () => void,
  onClose: () => void
) => {
  return (
    <div>
      <p
        onClick={() => {
          handleProfileSeller();
          onClose();
        }}
        className={"inventory-header__setting-item"}
      >
        Account
      </p>
      <span className="inventory-header__line"></span>
      <p
        onClick={() => {
          handleLogoutCognito();
          onClose();
        }}
        className={"inventory-header__setting-item"}
      >
        Log out
      </p>
    </div>
  );
};

export const HeaderWeb: React.FC<Props> = ({ ...props }) => {
  const { name, disAble } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const windowSize = useSize();
  const user = useUser();

  const showDefaultDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLogoutCognito = async () => {
    dispatch(logout());
  };

  const handleProfileSeller = async () => {
    navigate(CUSTOMER_ROUTER_PATH.LOG_IN);
  };

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };
  return (
    <>
      <Drawer
        title="MENU"
        placement="left"
        onClose={onClose}
        open={open}
        rootClassName={"inventory-header__menu-container"}
      >
        {listMenuItem().map((item) => (
          <Link
            key={item.link}
            className="inventory-header__menu-item"
            to={item.link}
          >
            <span>{item.title}</span>
          </Link>
        ))}
      </Drawer>
      <div className="inventory-header__float">
        {!disAble ? (
          <CustomButton
            content={""}
            buttonProps={{
              icon: <ArrowLeftOutlined />,
              className: "inventory-header__float-button",
              onClick: () => {
                navigate(-1);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              },
            }}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="inventory-header__container">
        <div className="inventory-header__col-left">
          {!user?.id ? (
            <>
              <div
                className="inventory-header__hamburger"
                onClick={showDefaultDrawer}
              >
                <SvgHamburger />
              </div>
              <h1 className="inventory-header__title">{name}</h1>
            </>
          ) : (
            <h1 className="inventory-header__central">{name}</h1>
          )}
          {!user?.id && (
            <div
              className="inventory-header__fullName"
              style={{ whiteSpace: "nowrap" }}
            >
              <Tooltip placement="topLeft" title={user?.fullName} arrow={true}>
                {/* <span>{user?.fullName}</span> */}
                <span>Admin</span>
              </Tooltip>
            </div>
          )}
        </div>
        {!user?.id && (
          <div className="inventory-header__col-right">
            {windowSize.width > TAB_SIZE ? (
              <Popover
                placement="bottomRight"
                title={false}
                arrow={false}
                trigger="click"
                visible={visible}
                onVisibleChange={handleVisibleChange}
                content={listSettingItem(
                  handleLogoutCognito,
                  handleProfileSeller,
                  () => setVisible(false)
                )}
                overlayClassName="inventory-header__setting-container"
              >
                <p className="m-b-0 cursor-pointer">
                  <SvgSetting />
                </p>
              </Popover>
            ) : (
              <p
                className="m-b-0 cursor-pointer"
                onClick={() => navigate(CUSTOMER_ROUTER_PATH.LIST_STUDENT)}
              >
                <SvgSetting />
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
