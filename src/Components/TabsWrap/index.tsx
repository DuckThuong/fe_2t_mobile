import { Tabs, TabsProps } from 'antd';
import './tabsWrap.scss';

interface IProps {
  items: TabsProps['items'];
  tabsProps: TabsProps;
}

const TabsWrap = (props: IProps) => {
  const { items, tabsProps } = props;
  const onChange = (key: string) => {
    console.log(key);
  };
  return <Tabs items={items} {...tabsProps} className={`${tabsProps.className ?? ''} tabs-wrap__container`} />;
};

export default TabsWrap;
