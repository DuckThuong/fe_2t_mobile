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
          <Text>Email: duckthuong@gmail.com</Text>
          <br />
          <Text>Điện thoại: +84 - 342030021</Text>
          <br />
          <Text>Địa chỉ: 19, Nguyễn Trãi, Thanh Xuân, Hà Nội</Text>
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
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d385.39803871043847!2d105.82055753446795!3d21.00216079034001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac12e174af3f%3A0x85ac9ddcec447625!2zQ8OUTkcgVFkgQ-G7lCBQSOG6pk4gQ8OUTkcgTkdI4buGIFbDgCBUUlVZ4buATiBUSMOUTkcgVENPTQ!5e0!3m2!1svi!2s!4v1734497488332!5m2!1svi!2s"
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
