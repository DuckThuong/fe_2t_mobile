import React from "react";
import { Layout, Menu, Typography, Row, Col, Divider } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./style.scss";
const { Footer } = Layout;
const { Text, Title } = Typography;

export const FooterWeb = () => {
  return (
    <Footer className="footer">
      <Row gutter={16}>
        <Col span={8}>
          <Title level={4}>Liên hệ với chúng tôi</Title>
          <Text>Email: khanhhhungg213@gmail.com</Text>
          <br />
          <Text>Điện thoại: 0948682103</Text>
          <br />
          <Text>Địa chỉ: 112 Bạch Mai - Hai Bà Trưng - Hà Nội</Text>
        </Col>
        <Col span={8}>
          <Title level={4}>Thông tin</Title>
          <Menu mode="vertical" style={{ border: "none" }}>
            <Menu.Item key="about">
              <a href="/about">Giới thiệu</a>
            </Menu.Item>
            <Menu.Item key="services">
              <a href="/services">Dịch vụ</a>
            </Menu.Item>
            <Menu.Item key="contact">
              <a href="/contact">Liên hệ</a>
            </Menu.Item>
            <Menu.Item key="privacy">
              <a href="/privacy">Chính sách bảo mật</a>
            </Menu.Item>
            <Menu.Item key="terms">
              <a href="/terms">Điều khoản sử dụng</a>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={8}>
          <Title level={4}>Kết nối với chúng tôi</Title>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookOutlined className="social-icon" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterOutlined className="social-icon" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramOutlined className="social-icon" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined className="social-icon" />
          </a>
        </Col>
      </Row>
      <Divider className="footer-divider" />
      <Row justify="center">
        <Col span={12}>
          <Title level={4}>Bản đồ</Title>
          <iframe
            title="Bản đồ"
            src="https://www.google.com/maps/place/X%C3%B4i+T%C3%BA+112+B%E1%BA%A1ch+Mai/@21.0062111,105.8486242,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ad1147852c3d:0x13862f098588ded9!8m2!3d21.0062111!4d105.8511991!16s%2Fg%2F11n0l9j4ks?entry=ttu&g_ep=EgoyMDI1MDQyMC4wIKXMDSoASAFQAw%3D%3D"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </Col>
      </Row>
      <div className="footer-text">
        <Text>
          &copy; {new Date().getFullYear()} Công ty của bạn. Tất cả các quyền
          được bảo lưu.
        </Text>
      </div>
    </Footer>
  );
};
