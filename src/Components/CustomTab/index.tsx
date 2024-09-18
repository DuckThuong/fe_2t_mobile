import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space, Tabs } from 'antd';
import './index.scss';
type TabPosition = 'left' | 'right' | 'top' | 'bottom';

interface TabData {
  number?: number;
  text: string;
}

interface CustomTabProps {
  defaultPosition?: TabPosition;
  tabData: TabData[];
}

const CustomTab: React.FC<CustomTabProps> = ({ defaultPosition = 'left', tabData, ...props }) => {
  const [tabPosition, setTabPosition] = useState<TabPosition>(defaultPosition);

  const tabItems = tabData.map((data, i) => ({
    label: (
      <div className="in-tab">
        <span className="in-tab-number">{data?.number}</span>
        <span className="in-tab-text">{data.text}</span>
      </div>
    ),
    key: String(i + 1),
  }));

  return (
    <>
      <Tabs className="tab-custom" tabPosition={tabPosition} items={tabItems} {...props} />
    </>
  );
};

export default CustomTab;
