import { Card, Col, Row, TabsProps } from "antd";
import { FC, ReactNode } from "react";
import "./style.scss";
import TabsWrap from "../TabsWrap";

export interface WidgetProps {
  title: ReactNode;
  content: ReactNode;
  tabProps?: TabsProps;
}

const Widget: FC<WidgetProps> = (props) => {
  const { title, content, tabProps } = props;

  return (
    <Card className="custom_widget" hoverable={false} bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row align="middle" justify="space-between">
            <Col>
              <Row gutter={[4, 4]}>
                <Col span={24}>
                  <span className="custom_widget-title">{title}</span>
                </Col>
              </Row>
            </Col>

            <Col></Col>
          </Row>
        </Col>

        {tabProps?.items && tabProps?.onChange && (
          <Col span={24}>
            <TabsWrap {...tabProps} />
          </Col>
        )}

        <Col span={24}>{content}</Col>
      </Row>
    </Card>
  );
};

export default Widget;
