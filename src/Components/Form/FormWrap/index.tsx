import { Form, FormProps } from 'antd';
import React from 'react';
import { ReactNode } from 'react';

function FormWrap(props: FormProps & { children: ReactNode }) {
  const formItemLayout =
    props.layout === 'horizontal' || !props.layout ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  return (
    <Form
      {...formItemLayout}
      layout={props.layout || 'horizontal'}
      form={props.form}
      {...props}
      initialValues={props.initialValues}
      scrollToFirstError={true}
    >
      {props.children}
    </Form>
  );
}

export default FormWrap;
