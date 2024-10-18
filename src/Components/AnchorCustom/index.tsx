import React, { ReactNode, useState } from "react";
import { Anchor } from "antd";

interface AnchorProps {
  items?: { key: string; href: string; title: string; element?: ReactNode }[];
}

const AnchorCustom: React.FC<AnchorProps> = ({ items }) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>, link: { title: ReactNode; href: string }) => {
    const item = items?.find(item => item.href === link.href);
    if (item) {
      setActiveKey(item.key);
    }
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Anchor
          direction="horizontal"
          affix={false}
          items={items}
          onClick={handleClick}
        />
      </div>
      <div>
        {items?.map((item) =>
          item.key === activeKey ? (
            <div key={item.key} id={item.key}>
              {item.element}
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

export default AnchorCustom;
