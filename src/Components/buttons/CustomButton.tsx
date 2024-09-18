import { Button, ButtonProps } from 'antd';
import React, { ReactNode } from 'react';
import './CustomButton.scss';

type Props = {
  buttonProps?: ButtonProps;
  isUnderline?: boolean;
  isCancelButton?: boolean;
  content: ReactNode | string;
};

export const CustomButton: React.FC<Props> = ({ ...props }) => {
  const { buttonProps, content, isUnderline, isCancelButton } = props;

  return (
    <Button
      {...buttonProps}
      className={`custom-button__default ${buttonProps?.className ?? ''} ${
        buttonProps?.type === 'link' ? `custom-button__link ${isUnderline ? 'custom-button__link-underline' : ''}` : ''
      }  ${buttonProps?.disabled ? 'custom-button__styled-disable' : ''} ${
        isCancelButton ? 'custom-button__cancel' : ''
      } ${buttonProps?.type === 'primary' ? 'custom-button__primary' : ''} ${
        buttonProps?.type === 'text' ? 'custom-button__text' : ''
      }`}
    >
      {content}
    </Button>
  );
};
