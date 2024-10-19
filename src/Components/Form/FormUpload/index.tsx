import { Form, Upload } from 'antd';
import { UploadListType } from 'antd/es/upload/interface';
import { FormItemProps, UploadProps } from 'antd/lib';
import React, { ReactNode } from 'react';
import './formUpload.scss';
import { NamePath } from 'antd/es/form/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
type Props = {
  name: NamePath;
  uploadProps?: UploadProps;
  children: ReactNode | string;
  listType: UploadListType;
  formItemProps?: FormItemProps;
};
export const FormUpload: React.FC<Props> = ({ ...props }) => {
  const { name, listType, uploadProps, formItemProps, children } = props;
  return (
    <Form.Item
      name={name}
      {...formItemProps}
      className={`upload__form-container w-100 ${formItemProps?.className ?? ''}`}
    >
      <Upload
        listType={listType}
        {...uploadProps}
        showUploadList={{
          removeIcon: <FontAwesomeIcon icon={faTrash} />,
          previewIcon: <></>,
        }}
        className={`upload__form-styled ${uploadProps?.className ?? ''}`}
      >
        {children}
      </Upload>
    </Form.Item>
  );
};
