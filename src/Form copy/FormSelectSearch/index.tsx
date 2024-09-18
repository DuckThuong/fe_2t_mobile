import { Form, FormItemProps, Select, SelectProps } from 'antd';
import React, { useState } from 'react';
import './formSelectSearch.scss';
import { NamePath } from 'antd/es/form/interface';
import { SvgSelectSearch } from '../../@svg/SvgSelectSearch';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { SvgDrop } from '../../@svg/SvgDrop';
import { SvgDrag } from '../../@svg/SvgDrag';

type Props = {
  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: FormItemProps | any;
  selectProps?: SelectProps;
  className?: string;
};

export const FormSelectSearch: React.FC<Props> = ({ ...props }) => {
  const { name, label, formItemProps, selectProps, className } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`form__select-search ${className ?? ''}`}>
      <Form.Item name={name} label={label} {...formItemProps} className={`${formItemProps?.className ?? ''}`}>
        <Select
          allowClear
          {...selectProps}
          showSearch={false}
          suffixIcon={isOpen ? <SvgDrag /> : <SvgDrop />}
          onDropdownVisibleChange={(open) => setIsOpen(open)}
          popupClassName={`form__select-search-popup-select ${selectProps?.popupClassName ?? ''}`}
          className={`${selectProps?.className ?? ''} ${selectProps?.disabled ? 'form__select-search-disabled' : ''}`}
        />
      </Form.Item>
    </div>
  );
};
