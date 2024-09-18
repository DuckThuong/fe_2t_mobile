import { Modal, ModalProps } from 'antd';
import React, { ReactNode } from 'react';
import './modalStyled.scss';
import { SvgClose } from '../@svg/SvgClose';

type Props = {
  label?: string;
  modalProps?: ModalProps;
  children: ReactNode | string;
  isOpen: boolean;
  onCancel: () => void;
};
export const StyledModal: React.FC<Props> = ({ modalProps, children, isOpen, onCancel, ...rest }) => {
  return (
    <>
      <Modal
        open={isOpen}
        maskClosable={false}
        keyboard={false}
        closable={true}
        destroyOnClose={true}
        onCancel={onCancel}
        closeIcon={<SvgClose />}
        footer={modalProps?.footer}
        centered={true}
        title={modalProps?.title}
        {...modalProps}
        className={`styled-modal__popup ${modalProps?.className ?? ''}`}
      >
        {children}
      </Modal>
    </>
  );
};
