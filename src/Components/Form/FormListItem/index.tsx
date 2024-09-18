import { Form, FormItemProps, Radio, RadioChangeEvent } from 'antd';
import React, { ReactNode, useState } from 'react';
import { NamePath } from 'antd/es/form/interface';
import { FormInput } from '../FormInput';
import { CustomButton } from '../../buttons/CustomButton';
import './formListItem.scss';
import { FormInputNumberFormat } from '../FormInputNumberFormat';
import { ValidateLibrary } from '../../../validate';

interface IFormListItemsProps {
  name: NamePath;
  nameFormItem: NamePath;
  buttonContent: ReactNode;
  formItemProps?: FormItemProps;
  isPhoneInput?: boolean;
}

type Option = {
  value: any;
  label: React.ReactNode;
  disabled?: boolean;
};

function FormListItem(props: IFormListItemsProps) {
  const { name, buttonContent, nameFormItem, formItemProps, isPhoneInput } = props;
  const [value, setValue] = useState(0);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            <Radio.Group onChange={onChange} value={value} className="w-100">
              {fields.map(({ key, name, ...restField }) => (
                <div className="d-flex gap-1 align-items-center m-b-20">
                  <Radio key={key} value={key} className="form-list-item__radio" />
                  <div className="w-100">
                    {isPhoneInput ? (
                      <FormInputNumberFormat
                        name={[name, nameFormItem]}
                        formItemProps={{ ...formItemProps, className: 'm-b-0 w-100 form-list-item__input-number' }}
                        patternFormat={{
                          format: '+## ##-####-####',
                          onBlur: (e) => {
                            const value = e.target.value.replace(/[-\s]/g, '');
                          },
                          onChange: (e) => {
                            const v = e.target.value.replace(/[-\s]/g, '');
                            console.log(v);
                          },
                        }}
                      />
                    ) : (
                      <FormInput
                        name={[name, nameFormItem]}
                        inputProps={{}}
                        formItemProps={{ ...formItemProps, className: 'm-b-0 w-100 form-list-item__input' }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </Radio.Group>
            <Form.Item className="">
              <CustomButton
                buttonProps={{
                  className: 'form-list-item__btn-add',
                  type: 'link',
                  onClick: () => add(),
                  block: true,
                }}
                content={buttonContent}
              />
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
}

export default FormListItem;
