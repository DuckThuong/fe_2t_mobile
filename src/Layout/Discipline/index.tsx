import React, { useState } from 'react';
import AnchorCustom from "../../Components/AnchorCustom";
import { HeaderWeb } from "../HeaderWeb";
import { DisCip } from "./DisCip/DisCip";
import { Reward } from "./Reward/Reward";
import "./Discipline.scss";
import { TabsProps } from "antd";
import Widget from "../../Components/Widget";

const items: TabsProps["items"] = [
  {
    key: "1", 
    label: "Khen Thưởng",
  },
  {
    key: "2",
    label: "Kỷ luật",
  },
];

export const DisciplineAndReward = () => {
  const [activeKey, setActiveKey] = useState("1");

  return (
    <div className="discipline-reward">
      <HeaderWeb name="Quản lý học sinh" disAble={true} />
      <div className="discipline-reward_content">
        <Widget
          tabProps={{
            items,
            onChange: (key: string) => {
              console.log("key:: ", key);
              setActiveKey(key);
            },
          }}
          content={activeKey === "1" ? <Reward /> : <DisCip />}
          title="Quản lý khen thưởng và kỷ luật"
        />
        {/* <AnchorCustom
          items={[
            {
              key: "khenthuong",
              href: "#khenthuong",
              title: "Khen Thưởng",
              element: <Reward />,
            },
            {
              key: "kyluat",
              href: "#kyluat",
              title: "Kỷ luật",
              element: <DisCip />,
            },
          ]}
        /> */}
      </div>
    </div>
  );
};
