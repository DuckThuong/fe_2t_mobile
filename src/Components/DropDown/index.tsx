import React, { ReactNode } from 'react';
import { DropDownProps, Dropdown } from 'antd';
import { DropdownButtonProps } from 'antd/es/dropdown';
import { MenuProps } from 'antd/lib';
type Props = {
  dropDownProps?: DropDownProps | DropdownButtonProps | undefined;
  content: ReactNode;
  items: MenuProps['items'];
};

const DropDown: React.FC<Props> = ({ ...props }) => {
  const { dropDownProps, content, items } = props;
  return (
    <Dropdown.Button {...dropDownProps} menu={{ ...dropDownProps?.menu, items }}>
      {content}
    </Dropdown.Button>
  );
};

export default DropDown;
