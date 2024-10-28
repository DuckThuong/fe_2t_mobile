import { Tabs, TabsProps } from 'antd';
import React, { FC } from 'react';
import './tabsWrap.scss';

export interface TabsWrapProps extends TabsProps {}

const TabsWrap: FC<TabsWrapProps> = (props) => {
  const { className, ...otherProps } = props;

  return (
    <>
      <Tabs {...otherProps} className={`custom_tabs ${className || ''}`} tabBarGutter={8} />
    </>
  );
};

export default TabsWrap;
