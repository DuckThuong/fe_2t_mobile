import { BellFilled } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import "../../Components/HeaderAdminPage/headerAdminPage.scss";


const HeaderAdminPage = () => {
  return (
    <Header className="admin-header">
      <div className="admin-header-left">
        <div className="admin-header-title">Trang Admin</div>
      </div>

      <Space className="admin-icon-group">
        {/* <Badge count={10}>
          <BellFilled className="admin-icon"/>
        </Badge> */}
        {/* <Avatar
          className="admin-avatar"
          src="https://yt3.googleusercontent.com/qGrcViAdsmfdL8NhR03s6jZVi2AP4A03XeBFShu2M4Jd88k1fNXDnpMEmHU6CvNJuMyA2z1maA0=s900-c-k-c0x00ffffff-no-rj"
        ></Avatar> */}
      </Space>
    </Header>
  );
};
export default HeaderAdminPage;
