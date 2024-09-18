import { Tabs, TabsProps } from 'antd';
import './tabsDetailShipment.scss';

interface IProps {
  items: TabsProps['items'];
  tabsProps: TabsProps;
}

const TabsDetailShipment = (props: IProps) => {
  const { items, tabsProps } = props;
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <Tabs
      type="card"
      items={items}
      {...tabsProps}
      className={`${tabsProps.className ?? ''} tabs-detail-shipment__container`}
    />
  );
};

export default TabsDetailShipment;
